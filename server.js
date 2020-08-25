/* eslint-disable no-console */
const path = require("path");
const express = require("express");

const app = express();
const DIST_DIR = path.join(__dirname, "/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.static(DIST_DIR));
app.get("*", (_req, res) => {
  res.sendFile(HTML_FILE);
});

// app.get("*", (_req, res) => {
//   const index = path.join(__dirname, "dist", "index.html");
//   res.sendFile(index);
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});