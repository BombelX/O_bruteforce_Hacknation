import { Router } from "express";
import { z } from "zod";
import { db } from "../db/client";
import { users } from "../db/schema";
import {sql} from "drizzle-orm";
import { error } from "node:console";


const router = Router();

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