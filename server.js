// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const COC_API = "https://api.clashofclans.com/v1";
const TOKEN = process.env.COC_TOKEN;

// Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Utility fetcher
async function cocFetch(endpoint) {
  const res = await fetch(`${COC_API}${endpoint}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.json();
}

// -------------------- CLANS --------------------
app.get("/clan/:tag", (req, res) =>
  cocFetch(`/clans/${encodeURIComponent("#" + req.params.tag)}`).then((data) =>
    res.json(data)
  )
);

app.get("/clan/:tag/members", (req, res) =>
  cocFetch(`/clans/${encodeURIComponent("#" + req.params.tag)}/members`).then(
    (data) => res.json(data)
  )
);

app.get("/clan/:tag/warlog", (req, res) =>
  cocFetch(`/clans/${encodeURIComponent("#" + req.params.tag)}/warlog`).then(
    (data) => res.json(data)
  )
);

app.get("/clan/:tag/currentwar", (req, res) =>
  cocFetch(
    `/clans/${encodeURIComponent("#" + req.params.tag)}/currentwar`
  ).then((data) => res.json(data))
);

app.get("/clan/:tag/capitalraidseasons", (req, res) =>
  cocFetch(
    `/clans/${encodeURIComponent("#" + req.params.tag)}/capitalraidseasons`
  ).then((data) => res.json(data))
);

// -------------------- PLAYERS --------------------
app.get("/player/:tag", (req, res) =>
  cocFetch(`/players/${encodeURIComponent("#" + req.params.tag)}`).then(
    (data) => res.json(data)
  )
);

// -------------------- LOCATIONS --------------------
app.get("/locations", (req, res) =>
  cocFetch(`/locations`).then((data) => res.json(data))
);

app.get("/locations/:id/rankings/clans", (req, res) =>
  cocFetch(`/locations/${req.params.id}/rankings/clans`).then((data) =>
    res.json(data)
  )
);

app.get("/locations/:id/rankings/players", (req, res) =>
  cocFetch(`/locations/${req.params.id}/rankings/players`).then((data) =>
    res.json(data)
  )
);

// -------------------- LEAGUES --------------------
app.get("/leagues", (req, res) =>
  cocFetch(`/leagues`).then((data) => res.json(data))
);

app.get("/leagues/:id/seasons", (req, res) =>
  cocFetch(`/leagues/${req.params.id}/seasons`).then((data) => res.json(data))
);

// -------------------- LABELS --------------------
app.get("/labels/clans", (req, res) =>
  cocFetch(`/labels/clans`).then((data) => res.json(data))
);

app.get("/labels/players", (req, res) =>
  cocFetch(`/labels/players`).then((data) => res.json(data))
);

// -------------------- START --------------------
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
