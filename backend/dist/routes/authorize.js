"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const client_1 = require("../db/client");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
function generateSHA256(input) {
    return (0, crypto_1.createHash)('sha256').update(input).digest('hex');
}
const router = (0, express_1.Router)();
const user = zod_1.z.object({
    username: zod_1.z.string().min(3).nonempty(),
    password: zod_1.z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać co najmniej jedną dużą literę" })
        .regex(/[a-z]/, { message: "Hasło musi zawierać co najmniej jedną małą literę" })
        .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę" })
});
router.post('/login', async (req, res) => {
    const parsed = user.safeParse(req.body);
    if (!parsed.success) {
        return res.status(402).json({
            errorMessage: 'invalid data format'
        });
    }
    let userData = [];
    try {
        userData = await client_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, parsed.data.username));
    }
    catch (error) {
        return res.status(500).json({
            error: 'internal server error'
        });
    }
    if (userData.length === 0) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    else {
        const pass = generateSHA256(parsed.data.password);
        if (userData[0].password !== pass) {
            return res.status(401).json({
                error: 'invalid username or password'
            });
        }
        else {
            const SECRET_KEY = process.env.SECRET_KEY;
            if (!SECRET_KEY) {
                return res.status(500).json({
                    error: 'server misconfiguration'
                });
            }
            const jwt_token = jsonwebtoken_1.default.sign({ _id: userData[0].id, username: userData[0].username }, SECRET_KEY, { expiresIn: '1h' });
            const refresh_token = jsonwebtoken_1.default.sign({ _id: userData[0].id, username: userData[0].username }, SECRET_KEY, { expiresIn: '3d' });
            try {
                const result_of_insertion = await client_1.db.transaction(async (tx) => {
                    const insertResult = await tx.insert(schema_1.refresh_tokens).values({
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
            catch (error) {
                return res.status(500).json({
                    error: 'internal server error'
                });
            }
            return res.status(200).json({
                message: 'login succesfull',
                jwt_token: jwt_token,
                refresh_token: refresh_token
            });
        }
    }
});
const refreshParser = zod_1.z.object({
    refresh_token: zod_1.z.string().nonempty(),
    username: zod_1.z.string().min(3).nonempty(),
});
router.post('/refresh', async (req, res) => {
    const parsed = refreshParser.safeParse(req.body);
    if (!parsed.success) {
        return res.status(402).json({
            error: 'token in invalid format'
        });
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
        return res.status(500).json({
            error: 'server misconfiguration'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(parsed.data.refresh_token, SECRET_KEY);
    }
    catch (err) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'invalid or expired refresh token'
        });
    }
    let resp_db = [];
    try {
        resp_db = await client_1.db.select().from(schema_1.refresh_tokens).where((0, drizzle_orm_1.eq)(schema_1.refresh_tokens.token, parsed.data.refresh_token));
    }
    catch (error) {
        return res.status(500).json({
            error: 'internal server error'
        });
    }
    if (resp_db.length === 0) {
        return res.status(401).json({
            error: 'refresh token not found'
        });
    }
    if (resp_db[0].is_revoked === 1) {
        return res.status(401).json({
            error: 'refresh token revoked'
        });
    }
    const refresh_token = jsonwebtoken_1.default.sign({ _id: resp_db[0].user_id, username: parsed.data.username }, SECRET_KEY, { expiresIn: '3d' });
    const token = jsonwebtoken_1.default.sign({ _id: resp_db[0].user_id, username: parsed.data.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({
        message: 'token refreshed succesfully',
        refresh_token: refresh_token,
        jwt_token: token
    });
});
exports.default = router;
