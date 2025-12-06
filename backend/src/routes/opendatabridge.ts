import { Router } from "express";
import { number, z } from "zod";
import { db } from "../db/client";
import { users,refresh_tokens } from "../db/schema";
import {eq, sql} from "drizzle-orm";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { error } from "node:console";
import { createHash } from 'crypto';




const router = Router();



router.post('/report',async (req,res) => {
    return res.status(200).json({
        message : 'report received'
    });
}
)


export default router;