const express = require("express");
const helmet = require("helmet");
const server = express();

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

function errorHandler(err,req,res,next) {
    res.status(400).json({message: "Error", err});
}

server.use(express.json());
server.use(helmet());

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.use(errorHandler);

module.exports = server;
