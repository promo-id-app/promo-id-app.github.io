app.post("/submit", async (req, res) => {
    const response = req.body["g-recaptcha-response"];
    const secretKey = process.env.RECAPTCHA_SECRET;

    const verification = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`, { method: "POST" });
    const data = await verification.json();

    if (!data.success) {
        return res.status(403).json({ error: "reCAPTCHA verification failed" });
    }

    res.json({ message: "Success!" });
});