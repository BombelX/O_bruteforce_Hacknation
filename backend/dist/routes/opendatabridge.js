"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/report', async (req, res) => {
    return res.status(200).json({
        message: 'report received'
    });
});
exports.default = router;
