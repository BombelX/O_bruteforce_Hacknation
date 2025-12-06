import { Router } from "express";
import { number, z } from "zod";
import { db } from "../db/client";
import { users } from "../db/schema";
import {eq, sql} from "drizzle-orm";
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
            const jwt_token = "testtoken";
            const refresh_token = "testrefreshtoken";
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



export default router;