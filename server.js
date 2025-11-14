// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const COC_API = "https://api.clashofclans.com/v1";
const TOKEN = process.env.COC_TOKEN;

// --------------------------------------------------
// ✅ FIX 1: FULL CORS SUPPORT
// --------------------------------------------------
app.use(
  cors({
    origin: "*", // you can later restrict to Netlify domain
    methods: "GET,HEAD,POST,DELETE,PUT,PATCH",
  })
);

// --------------------------------------------------
// Helper function for API calls (with error handling)
// --------------------------------------------------
async function cocFetch(endpoint, res) {
  try {
    const response = await fetch(`${COC_API}${endpoint}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!response.ok) {
      const errorJson = await response.json();
      return res.status(response.status).json(errorJson);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

// --------------------------------------------------
// 🏰 Clans
// --------------------------------------------------
app.get("/clan/:tag", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}`, res)
);
app.get("/clan/:tag/members", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}/members`, res)
);
app.get("/clan/:tag/warlog", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}/warlog`, res)
);
app.get("/clan/:tag/currentwar", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}/currentwar`, res)
);
app.get("/clan/:tag/leaguegroup", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}/currentwar/leaguegroup`, res)
);
app.get("/clan/:tag/rounds", (req, res) =>
  cocFetch(`/clans/%23${req.params.tag}/currentwar/rounds`, res)
);

// --------------------------------------------------
// 🧑 Players
// --------------------------------------------------
app.get("/player/:tag", (req, res) =>
  cocFetch(`/players/%23${req.params.tag}`, res)
);

// --------------------------------------------------
// 🏆 Leagues
// --------------------------------------------------
app.get("/leagues", (req, res) => cocFetch(`/leagues`, res));
app.get("/leagues/:leagueId", (req, res) =>
  cocFetch(`/leagues/${req.params.leagueId}`, res)
);
app.get("/leagues/:leagueId/seasons", (req, res) =>
  cocFetch(`/leagues/${req.params.leagueId}/seasons`, res)
);
app.get("/leagues/:leagueId/seasons/:seasonId", (req, res) =>
  cocFetch(
    `/leagues/${req.params.leagueId}/seasons/${req.params.seasonId}`,
    res
  )
);

// --------------------------------------------------
// 🌍 Locations
// --------------------------------------------------
app.get("/locations", (req, res) => cocFetch(`/locations`, res));
app.get("/locations/:locationId", (req, res) =>
  cocFetch(`/locations/${req.params.locationId}`, res)
);
app.get("/locations/:locationId/rankings/clans", (req, res) =>
  cocFetch(`/locations/${req.params.locationId}/rankings/clans`, res)
);
app.get("/locations/:locationId/rankings/players", (req, res) =>
  cocFetch(`/locations/${req.params.locationId}/rankings/players`, res)
);
app.get("/locations/:locationId/rankings/clans-versus", (req, res) =>
  cocFetch(`/locations/${req.params.locationId}/rankings/clans-versus`, res)
);
app.get("/locations/:locationId/rankings/players-versus", (req, res) =>
  cocFetch(`/locations/${req.params.locationId}/rankings/players-versus`, res)
);

// --------------------------------------------------
// 🏷️ Labels
// --------------------------------------------------
app.get("/labels/clans", (req, res) => cocFetch(`/labels/clans`, res));
app.get("/labels/players", (req, res) => cocFetch(`/labels/players`, res));

// --------------------------------------------------
// 🪙 Gold Pass
// --------------------------------------------------
app.get("/goldpass/current", (req, res) =>
  cocFetch(`/goldpass/seasons/current`, res)
);

// --------------------------------------------------
// Default Route
// --------------------------------------------------
app.get("/", (req, res) => {
  res.send("✅ Clash of Clans API Proxy is running!");
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------
app.listen(PORT, () =>
  console.log(`✅ Backend running on port ${PORT}`)
);
