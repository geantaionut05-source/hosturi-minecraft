import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 CONFIG
const ZONE_ID = "PUNE_ZONE_ID_AICI";      // ID zona Cloudflare
const API_TOKEN = "PUNE_API_TOKEN_AICI";  // Token API cu permisiuni DNS
const DOMENIU = "minehant.gq";            // Domeniul tău
const IP_SERVER_REAL = "127.0.0.1";       // IP-ul real al serverului Minecraft

// Funcție pentru a genera subdomeniu random
function genereazaSubdomeniu() {
    const prefixe = ["mc", "sv", "play", "node", "srv"];
    const randomPrefix = prefixe[Math.floor(Math.random() * prefixe.length)];
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${randomPrefix}${randomNum}`;
}

app.get("/creeaza", async (req, res) => {
    const subdomeniu = genereazaSubdomeniu();
    const porturi = [25565, 19132, 25575];
    const randomPort = porturi[Math.floor(Math.random() * porturi.length)];

    // Creează înregistrarea DNS în Cloudflare
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "A",
            name: `${subdomeniu}.${DOMENIU}`,
            content: IP_SERVER_REAL,
            ttl: 120
        })
    });

    const data = await response.json();
    if (data.success) {
        res.json({
            success: true,
            ip: `${subdomeniu}.${DOMENIU}:${randomPort}`
        });
    } else {
        res.json({
            success: false,
            errors: data.errors
        });
    }
});

// Pornește serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serverul rulează pe portul ${PORT}`);
});
