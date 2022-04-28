const express = require("express");
const { postWebhook, getWebhook } = require("../controllers/webhookController");

const router = express.Router();

const webhookRoute = (app) => {
  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  return app.use("/", router);
};

module.exports = webhookRoute;
