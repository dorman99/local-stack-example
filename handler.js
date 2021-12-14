"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const AwsService = require("./service/aws.service");
const awsService = new AwsService(
  process.env.AWS_ACCESS_KEY,
  process.env.AWS_SECRET_KEY
);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/check-health", (req, res) => {
  res.json({ status: true });
});

app.post("/generate-upload-image-url", async (req, res) => {
  const request = await awsService.presignedS3ImageUrl();
  res.json({ body: request });
});

app.post("/upload-static", async (req, res, next) => {
  try {
    await awsService.upload(
      "fc-banner.jpg",
      process.env.AWS_BUCKET_TARGET || "my-bucket"
    );
    res.json({ status: "Ok" });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
