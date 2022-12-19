const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const { SignInAPI } = require('./signin');
// dotenv는 process.env에 키 값 형태로 환경변수를 설정하기 위해 사용하는 라이브러리
require('dotenv').config();

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

const server = express();
const PORT = 3000;

server.use(express.static('public'));
server.use(express.json());
server.use(cookieParser());

const auth = (req, res, next) => {
  // cookie나 헤더 auth로 들어오는지 확인 jwt.rest 참조
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log('😀 사용자 인증 성공', decoded);
    // 다음 웨어나 마지막 함수를 실행
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    return res.redirect('/signin');
  }
};

const isUser = (req, res, next) => {
  // cookie나 헤더 auth로 들어오는지 확인 jwt.rest 참조
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log('😀 사용자 인증 성공', decoded);
    // 다음 웨어나 마지막 함수를 실행
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    return res.send(false);
  }
};

const canEdit = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log('😀 사용자 인증 성공', decoded);

    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    return res.send({ isUser: false, canEdit: false });
  }
};

server.get('/validUser', isUser, (req, res) => {
  res.send(true);
});

// USER API
/**
 * signin
 */
// signin post 요청
SignInAPI(server, jwt, getUser);

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
server.get('/post/:id', canEdit, (req, res) => {
  res.send({
    isUser: false,
    canEdit: false,
    post: getPost(+req.params.id),
  });
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
server.patch('/post', canEdit, (req, res) => {
  const post = req.body;
  res.send(updatePost(post));
});

/**
 * 글 삭제하기
 */
server.delete('/post/:id', (req, res) => {
  res.send(deletePost(+req.params.id));
});

// server.post('/jwt', (req, res) => {
//   const accessToken = req.headers.authorization || req.cookies.accessToken;
//   try {
//     console.log(process.env.JWT_SECRET_KEY);
//     // const decode = jwt.verify(accessToken, process.env);
//   } catch (e) {
//     console.log(e);
//   }
// });

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
