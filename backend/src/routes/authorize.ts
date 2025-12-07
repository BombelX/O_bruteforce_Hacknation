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
const cookieParser = require('cookie-parser');

const user = z.object( 
    {
        username : z.string().min(3).nonempty(),
        password : z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać co najmniej jedną dużą literę" })
        .regex(/[a-z]/, { message: "Hasło musi zawierać co najmniej jedną małą literę" })
        .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę" })
    }
); 

router.post('/login',  async (req,res) => {
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

            try {
            db.transaction((tx) => {
                tx.insert(refresh_tokens).values({
                    user_id: userData[0].id,
                    token: refresh_token,
                    expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    is_revoked: 0,
                }).run(); 
            });
            } catch (dbError) {
                console.error('Error saving refresh token inside transaction:', dbError);
                return res.status(500).json({
                    error: 'problem with saving refresh token'
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

router.post('/auth', async (req,res) => {

    const token = req.cookies.token;
    if (!token){
        return res.status(402).json({
            error: 'cookie in invalid format'
        })
    }

    const SECRET_KEY = process.env.SECRET_KEY as Secret;
    if (!SECRET_KEY) {
        return res.status(500).json({
            error: 'server misconfiguration'
        });
    }
    try {
        jwt.verify(token, SECRET_KEY);
        return res.status(200).json({
            message : 'authorized'
        });
    } catch (err) {
        return res.status(401).json({
            message : 'Unauthorized',
            error: 'invalid or expired token'
        });
    
    }}
);

router.post('/logout',async(req,res) => {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token){
        return res.sendStatus(402);
    }
    try{
        await db.update(refresh_tokens).set({
            is_revoked: 1
        }).where(eq(refresh_tokens.token, refresh_token));
    }
    catch (error){
        return res.sendStatus(500);
    }
    res.clearCookie('token', { 
        httpOnly: true, 
        sameSite: 'lax', 
        secure: process.env.NODE_ENV === 'production' 
    });
    return res.status(200).json({
        message : 'logout succesfully'
    });
});


router.post('/refresh', async (req,res) => {
    const old_refresh_token = req.cookies.token;
    if (!old_refresh_token){
        return res.status(402).json({
            error: 'cookie in invalid format'
        })
    }
    const SECRET_KEY = process.env.SECRET_KEY as Secret;
    if (!SECRET_KEY) {
        return res.status(500).json({
            error: 'server misconfiguration'
        });
    }
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(old_refresh_token, SECRET_KEY) as JwtPayload;
    } catch (err) {
        return res.status(401).json({
            message : 'Unauthorized',
            error: 'invalid or expired refresh token'
        });
    }   
    const username = decoded.username;
    
    let resp_db: any[] = [];
    try{
        resp_db = await db.select().from(refresh_tokens).where(eq(refresh_tokens.token, old_refresh_token));
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
        { _id: resp_db[0].user_id, username: username },
        SECRET_KEY,
        { expiresIn: '3d' }
    );

    try{
        await db.update(refresh_tokens).set({
            token: refresh_token,
            expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        }).where(eq(refresh_tokens.id, resp_db[0].id));
    }
    catch (error){
        return res.status(500).json({
            error: 'internal server error'
        });
    }
    const token = jwt.sign(
        { _id: resp_db[0].user_id, username:username},
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