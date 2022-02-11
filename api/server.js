const express = require("express");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const server = express();
const ProjectRouter = require("./projects/projects-router");
server.use(express.json());

server.use("/api/projects", ProjectRouter);
module.exports = server;
