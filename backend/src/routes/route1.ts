import { Router } from "express";
import { z } from "zod";
import { db } from "../db/client";
import { users } from "../db/schema";
import {sql} from "drizzle-orm";
import { error } from "node:console";


const router = Router();

const dataSchema = z.object({
    testvalue: z.string().min(1),
});

router.post('/data',async(req, res) => {
    const parsed  = dataSchema.safeParse(req.body);
    if (parsed.success){
        const resp = await db.insert(users).values({
            testvalue: parsed.data.testvalue,
        });
        if (resp.changes > 0){
            return res.status(200).json({
                message: 'data inserted successfully'
            });
        }
        else{
            return res.status(501).json({
                errorMessage: 'data insertion failed'
            });
        }
    }
    else{
        res.status(402).json({
            errorMessage: 'invalid data format'
        });
    }
});
router.get('/test',async(req, res) => {
    
    
    const users_data = await db.select().from(users)
    if (users_data.length > 0){
        return res.status(200).json(users_data)
    }
    else{
        return res.status(502).json(
            {
                errorMessage: 'problem with db connection'
            }
        )
    }
}
);

export default router;