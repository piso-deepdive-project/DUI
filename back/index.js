const express = require('express');
const { getPosts, addPost, getPost, updatePost, deletePost } = require('./data');

// const { Signin } = require('./api/sign/signin');

const server = express();
const PORT = 6000;

server.use(express.static('public'));
server.use(express.json());

// Signin(server);

// POST API
/**
 * 글 목록 가져오기
 */
server.get('/posts', (req, res) => {
  res.send(getPosts());
});

/**
 * 글 가져오기
 */
server.get('/post/:id', (req, res) => {
  res.send(getPost(+req.params.id));
});

/**
 * 글 추가
 */
server.post('/post', (req, res) => {
  const post = req.body;
  addPost(post);
  res.send(post);
});

/**
 * 글 수정하기
 */
server.patch('/post', (req, res) => {
  const post = req.body;
  res.send(updatePost(post));
});

/**
 * 글 삭제하기
 */
server.delete('/post/:id', (req, res) => {
  res.send(deletePost(+req.params.id));
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
