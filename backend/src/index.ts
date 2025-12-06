import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import test from './routes/route1';

const app = express();
app.use(cors());
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use("/payments", test);



app.get('/', (req, res) => {
  res.send('Backend HACKNation działa ✅');
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
