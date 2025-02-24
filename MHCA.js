const crypto = require("crypto");

app.post("/webhook", express.json(), (req, res) => {
    const signature = req.headers["x-signature"];
    const body = JSON.stringify(req.body);
    
    const expectedSignature = crypto.createHmac("sha256", process.env.SECRET_KEY)
                                   .update(body)
                                   .digest("hex");

    if (signature !== expectedSignature) {
        return res.status(403).json({ error: "Invalid signature" });
    }

    console.log("Valid webhook request:", req.body);
    res.status(200).send("OK");
});