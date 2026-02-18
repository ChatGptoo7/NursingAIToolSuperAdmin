import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import https from "https";

import fs from 'fs'
const app = express();
const port = process.env.PORT || 8111;

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const options = {
        key: fs.readFileSync("/home/ubuntu/ssl/privkey.pem"),
        cert: fs.readFileSync("/home/ubuntu/ssl/fullchain.pem"),
    };
// Serve static build folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve assets folder
app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

// Catch-all route (NO WILDCARD)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
const server = https.createServer(options,app);
// const server = http.createServer(app);
console.log("USING build SERVER.JS");
server.listen(port, () => {
  console.log("Server running on port " + port);
});
