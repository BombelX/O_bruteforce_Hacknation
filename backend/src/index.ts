import "dotenv/config";
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import authorize from "./routes/authorize";
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/authorize", authorize);

app.get("/", (req, res) => {
  res.send("Backend HACKNation działa ✅");
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
