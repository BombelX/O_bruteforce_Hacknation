"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authorize_1 = __importDefault(require("./routes/authorize"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, _res, next) => {
    console.log(`[REQ] ${req.method} ${req.originalUrl}`);
    next();
});
app.use(express_1.default.json());
app.use("/authorize", authorize_1.default);
app.get('/', (req, res) => {
    res.send('Backend HACKNation działa ✅');
});
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
