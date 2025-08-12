const fetch = require("node-fetch");

// CONFIGURARE
const CLOUDFLARE_API_TOKEN = "TOKENUL_TAU_AICI";
const ZONE_ID = "ZONE_ID_AICI";
const DOMENIU = "minehant.gq";
const SERVER_IP = "127.0.0.1"; // IP-ul real al serverului tău

// Functie pentru generare random IP Minecraft
function genereazaSubdomeniu() {
    const prefixe = ["mc", "sv", "play", "node", "srv"];
    const randomPrefix = prefixe[Math.floor(Math.random() * prefixe.length)];
    const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999
    return `${randomPrefix}${randomNum}`;
}

async function creeazaDNS() {
    const subdomeniu = genereazaSubdomeniu();
    const numeComplet = `${subdomeniu}.${DOMENIU}`;

    const raspuns = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "A",
            name: numeComplet,
            content: SERVER_IP,
            ttl: 120
        })
    });

    const date = await raspuns.json();
    if (date.success) {
        console.log(`✅ Subdomeniu creat: ${numeComplet}`);
    } else {
        console.error("❌ Eroare la crearea DNS:", date.errors);
    }
}

creeazaDNS();
