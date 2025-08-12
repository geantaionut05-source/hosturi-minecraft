import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

function genereazaIP() {
    const prefixe = ["mc", "sv", "play", "node", "srv"];
    const randomPrefix = prefixe[Math.floor(Math.random() * prefixe.length)];
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const domeniu = "minehant.net";
    const porturi = [25565, 19132, 25575];
    const randomPort = porturi[Math.floor(Math.random() * porturi.length)];
    return `${randomPrefix}${randomNum}.${domeniu}:${randomPort}`;
}

app.get("/gen-ip", (req, res) => {
    const ip = genereazaIP();
    res.json({ ip });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serverul rulează pe portul ${PORT}`);
});
