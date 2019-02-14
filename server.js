const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const server = express();

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

function errorHandler(err,req,res,next) {
    res.status(400).json({message: "Error", err});
}

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
    res.status(200).send("Welcome to the Node-Blog API. Please use /api/posts or /api/users to access information.")
})

server.use(errorHandler);

module.exports = server;
