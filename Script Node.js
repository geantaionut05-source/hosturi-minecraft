import fetch from "node-fetch";

// CONFIG
const ZONE_ID = "ZONE_ID_DE_LA_TINE";
const API_TOKEN = "TOKEN_API_DE_LA_TINE";
const DOMENIU = "minehant.gq";
const IP_SERVER = "127.0.0.1"; // IP-ul real al serverului

// Generează subdomeniu random
const prefixe = ["mc", "sv", "play", "node", "srv"];
const prefix = prefixe[Math.floor(Math.random() * prefixe.length)];
const numar = Math.floor(Math.random() * 900) + 100;
const subdomeniu = `${prefix}${numar}`;

// Trimite cererea către Cloudflare
async function creeazaDNS() {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "A",
            name: `${subdomeniu}.${DOMENIU}`,
            content: IP_SERVER,
            ttl: 120,
            proxied: false
        })
    });

    const data = await response.json();

    if (data.success) {
        console.log(`✅ IP creat: ${subdomeniu}.${DOMENIU}:25565`);
    } else {
        console.error("❌ Eroare:", data.errors);
    }
}

creeazaDNS();
