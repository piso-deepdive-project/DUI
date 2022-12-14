const express = require('express');
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} = require('./data');

// const { Signin } = require('./api/sign/signin');

const server = express();
const PORT = 3000;

server.use(express.static('public'));
server.use(express.json());

// USER API
/**
 * signin
 */
server.post('/signin', (req, res) => {
  res.send(getUser(req.body));
});

/**
 * signup
 */
server.post('/signup', (req, res) => {
  res.send(addUser(req.body));
});

/**
 * 회원 수정
 */
server.patch('/user', (req, res) => {
  res.send(updateUser(req.body));
});

/**
 * 회원 삭제
 */
server.delete('/user/', (req, res) => {
  res.send(deleteUser(req.body.id));
});

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
