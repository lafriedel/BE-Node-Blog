const express = require("express");
const server = express();

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

server.use(express.json());

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
