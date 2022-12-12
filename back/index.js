const { getPosts } = require("./data.js");

const express = require("express");

// const { Signin } = require('./api/sign/signin');

const server = express();
const PORT = 6000;

server.use(express.static("public"));
server.use(express.json());

// Signin(server);

// POST API
server.get("/posts", (req, res) => {
  res.send(getPosts());
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
