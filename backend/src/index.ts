import "dotenv/config";
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import authorize from "./routes/authorize";
import formular from "./routes/formular";
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/authorize", authorize);
app.use("/formular", formular);

app.get("/", (req, res) => {
  res.send("Backend HACKNation działa ✅");
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
