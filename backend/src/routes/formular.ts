import { Router } from "express";
import { z } from "zod";
import { db } from "../db/client";
import { eq } from "drizzle-orm";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { ca } from "zod/v4/locales";
import { categories, subcategories, items } from "../db/schema";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

const form = z.object({
  category_id: z.number().int(),
  subcategory_id: z.number().int(),
  where_found: z.string().min(0).max(255),
  found_date: z.string().min(0).max(13),
  description: z.string()
});

router.post("/submit", async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY as Secret);
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(req.body);
  const parsed = form.safeParse(req.body);
  if (!parsed.success){
    return res.status(400).json({
      error: "Invalid form data",
    });
  }

  try {
    await db.insert(items).values({
      category_id: parsed.data.category_id,
      subcategory_id: parsed.data.subcategory_id,
      where_found: parsed.data.where_found,
      found_date: parsed.data.found_date,
      register_date: new Date().toISOString(),
      description: parsed.data.description,
    });
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const resCategories = await db.select().from(categories);
    console.log(resCategories);
    return res.status(200).json(resCategories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/subcategories/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    // const rz = await db.select().from(subcategories);
    // console.log(rz);

    const result = await db
      .select({ name: subcategories.name, id: subcategories.id })
      .from(subcategories)
      .where(eq(subcategories.category_id, idNum));
      console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
