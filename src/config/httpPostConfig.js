const express = require("express");

const httpPostConfig = (app) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};

module.exports = httpPostConfig;
