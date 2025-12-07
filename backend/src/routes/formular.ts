import { Router } from "express";
import { z } from "zod";
import { db } from "../db/client";
import { eq } from "drizzle-orm";
import { ca } from "zod/v4/locales";
import { categories } from "../db/schema";

const router = Router();

const form = z.object({
  categoryId: z.number().int().positive(),
  subcategoryId: z.number().int().positive(),
  description: z.string().min(10).max(1000),
  whereFouned: z.string().min(5).max(255),
});

router.post("/submit", async (req, res) => {
  const parsed = form.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid form data",
    });
  }
  try {
    await db.insert("items" as any).values({
      categoryId: parsed.data.categoryId,
      subcategoryId: parsed.data.subcategoryId,
      description: parsed.data.description,
      whereFouned: parsed.data.whereFouned,
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
  return res.status(200).json({
    category: `category with id ${id}`,
  });
});

export default router;
