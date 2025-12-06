import { Router } from "express";
import { number, z } from "zod";
import { db } from "../db/client";
import { users,refresh_tokens } from "../db/schema";
import {eq, sql} from "drizzle-orm";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { error } from "node:console";
import { createHash } from 'crypto';

function generateSHA256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}
const router = Router();

const user = z.object(
    {
        username : z.string().min(3).nonempty(),
        password : z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać co najmniej jedną dużą literę" })
        .regex(/[a-z]/, { message: "Hasło musi zawierać co najmniej jedną małą literę" })
        .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę" })
    }
); 

router.post('/login', async (req,res) => {
    const parsed = user.safeParse(req.body);

    if (!parsed.success){
        return res.status(402).json({
            errorMessage: 'invalid data format'
        });
    }

    let userData: any[] = [];

    try{
        userData = await db.select().from(users).where(eq(users.username, parsed.data.username));
    }
    catch (error){
        return res.status(500).json({
            error: 'internal server error'
        });
    }

    if (userData.length === 0){
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    else{
        const pass = generateSHA256(parsed.data.password);
        if (userData[0].password !== pass){
            return res.status(401).json({
                error: 'invalid username or password'
            });
        }
        else{
            const SECRET_KEY = process.env.SECRET_KEY as Secret;
            if (!SECRET_KEY) {
                return res.status(500).json({
                    error: 'server misconfiguration'
                });
            }
            const jwt_token = jwt.sign(
                { _id: userData[0].id, username: userData[0].username },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            const refresh_token = jwt.sign(
                { _id: userData[0].id, username: userData[0].username },
                SECRET_KEY,
                { expiresIn: '3d' }
            );
            try{
                const result_of_insertion = await db.transaction(async (tx) => {
                    const insertResult = await tx.insert(refresh_tokens).values({
                        user_id: userData[0].id,
                        token: refresh_token,
                        expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                        is_revoked: 0,
                    });
                    return insertResult;
                });
                if (!result_of_insertion) {
                    return res.status(500).json({
                        error: 'problem with saving refresh token'
                    });
                }
            }
            catch (error){
                return res.status(500).json({
                    error: 'internal server error'
                });
            }



            return res.status(200).json(
                {
                    message : 'login succesfull',
                    jwt_token: jwt_token,
                    refresh_token: refresh_token
                }
            );
        }
    }

})

const refreshParser  = z.object({
    refresh_token: z.string().nonempty(),
    username: z.string().min(3).nonempty(),
});

router.post('refresh', async (req,res) => {
    const parsed = refreshParser.safeParse(req.body);
    if (!parsed.success){
        return res.status(402).json({
            error: 'token in invalid format'
        })
    }
    const SECRET_KEY = process.env.SECRET_KEY as Secret;
    if (!SECRET_KEY) {
        return res.status(500).json({
            error: 'server misconfiguration'
        });
    }
    try {
        const decoded = jwt.verify(parsed.data.refresh_token, SECRET_KEY) as JwtPayload;
    } catch (err) {
        return res.status(401).json({
            message : 'Unauthorized',
            error: 'invalid or expired refresh token'
        });
    }
    
    let resp_db: any[] = [];
    try{
        resp_db = await db.select().from(refresh_tokens).where(eq(refresh_tokens.token, parsed.data.refresh_token));
    }
    catch (error){
        return res.status(500).json({
            error: 'internal server error'
        });
    }

    if (resp_db.length === 0){
        return res.status(401).json({
            error: 'refresh token not found'
        });
    }
    if (resp_db[0].is_revoked === 1){
        return res.status(401).json({
            error: 'refresh token revoked'
        });
    }
    const refresh_token = jwt.sign(
        { _id: resp_db[0].user_id, username: parsed.data.username },
        SECRET_KEY,
        { expiresIn: '3d' }
    );
    const token = jwt.sign(
        { _id: resp_db[0].user_id, username: parsed.data.username },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
    return res.status(200).json({
        message : 'token refreshed succesfully',
        refresh_token: refresh_token,
        jwt_token: token
    });

});



export default router;