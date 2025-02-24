const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Simpan token terenkripsi di variabel lingkungan
let token = process.env.BOT_TOKEN || "default_token";

// Fungsi untuk mengenkripsi token
function encryptToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

// API untuk mengambil token terenkripsi
app.get("/get-token", (req, res) => {
    res.json({ token: encryptToken(token) });
});

// API untuk memperbarui token (jika diperlukan)
app.post("/update-token", (req, res) => {
    if (req.query.newToken) {
        token = req.query.newToken;
        res.json({ message: "Token updated successfully!" });
    } else {
        res.status(400).json({ error: "New token is required" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});