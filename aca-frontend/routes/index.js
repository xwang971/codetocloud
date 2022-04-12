var express = require("express");
var router = express.Router();
require("dotenv").config();
const axios = require("axios");
const background = process.env.BACKGROUND_COLOR;

const api = axios.create({
  baseURL: "https://album-api." + process.env.CONTAINER_APP_ENV_DNS_SUFFIX,
  params: {},
  timeout: process.env.TIMEOUT || 5000,
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Sending request to backend albums api");
    var data = await api.get("/albums");
    console.log("Response from backend albums api: ", data.data);
    res.render("index", {
      albums: data.data,
      background_color: background,
    });
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
});

module.exports = router;
