import fetch from "node-fetch";

const ZONE_ID = "PUNE_ZONE_ID_AICI";
const API_TOKEN = "PUNE_API_TOKEN_AICI";
const domeniu = "minehant.gq";

function genereazaSubdomeniu() {
    const prefixe = ["mc", "sv", "play", "node", "srv"];
    const randomPrefix = prefixe[Math.floor(Math.random() * prefixe.length)];
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${randomPrefix}${randomNum}`;
}

async function creeazaDNS() {
    const subdomeniu = genereazaSubdomeniu();
    const porturi = [25565, 19132, 25575];
    const randomPort = porturi[Math.floor(Math.random() * porturi.length)];
    const ipServer = "127.0.0.1"; // aici pui IP-ul real al serverului

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "A",
            name: `${subdomeniu}.${domeniu}`,
            content: ipServer,
            ttl: 120
        })
    });

    const data = await response.json();
    if (data.success) {
        console.log(`✅ IP-ul tău: ${subdomeniu}.${domeniu}:${randomPort}`);
    } else {
        console.log("❌ Eroare:", data.errors);
    }
}

creeazaDNS();
