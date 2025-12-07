import { Router } from "express";
import { number, z } from "zod";
import { db } from "../db/client";
import { users,refresh_tokens, items ,subcategories, categories, region, old_items } from "../db/schema";
import {eq, sql} from "drizzle-orm";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { error } from "node:console";
import { createHash } from 'crypto';




const router = Router();



router.get('/v1/old_data/', async (req, res) => {
    try {
        const items_response = await db
            .select()
            .from(old_items);

        if (items_response.length === 0) {
            return res.status(404).json({ error: "No items found" });
        }
        return res.status(200).json(items_response);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});




router.get('/v1/raport/', async (req, res) => {
    try {
        const items_response = await db
            .select({
                id: items.id,
                category: categories.name,
                found_date: items.found_date,
                where_found: items.where_found,
                register_date: items.register_date,
                description: items.description,
                voivodeship: region.voivodeship,
                region: region.region,
            })
            .from(items)
            .innerJoin(subcategories, eq(items.subcategory_id, subcategories.id))
            .innerJoin(categories, eq(items.category_id, categories.id))
            .innerJoin(users, eq(items.user_id, users.id))
            .innerJoin(region, eq(users.id, region.user_id));

        if (items_response.length === 0) {
            return res.status(404).json({ error: "No items found" });
        }

        return res.status(200).json(items_response);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});





export default router;