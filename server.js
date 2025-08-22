import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const COC_API = "https://api.clashofclans.com/v1";
const TOKEN = process.env.COC_TOKEN;

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "✅ CoC Dashboard Backend is running!" });
});

// Clan Info
app.get("/clan/:tag", async (req, res) => {
  const tag = encodeURIComponent("#" + req.params.tag);
  try {
    const response = await fetch(`${COC_API}/clans/${tag}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Player Info
app.get("/player/:tag", async (req, res) => {
  const tag = encodeURIComponent("#" + req.params.tag);
  try {
    const response = await fetch(`${COC_API}/players/${tag}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
