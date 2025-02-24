const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("private-key.pem"),
    cert: fs.readFileSync("certificate.pem")
};

https.createServer(options, app).listen(443, () => {
    console.log("Server berjalan di HTTPS");
});