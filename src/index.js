require("dotenv").config();
const express = require("express");
const ngrok = require("ngrok");
const httpPostConfig = require("./config/httpPostConfig");
const webhookRoute = require("./routes/webhookRoute");

const app = express();

// Express Config
httpPostConfig(app);

// Imported Routes
webhookRoute(app);

let port = process.env.PORT || 8080;

app.listen(port, async (err) => {
  if (err) return console.log(err);
  console.log(`Listening to port ${port}`);

  const url = await ngrok.connect({
    addr: port,
    authtoken: "1ploGmdNefZ3Fi8BLjQ0gGxNWqt_2B6Ed4K9TdJycjr5hv6Zm",
  });

  console.log(`Ngrok link: ${url}`);
});