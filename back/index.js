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
  isUniqueId,
  addLike,
  getLikes,
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  addComment,
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

server.get('/api/validUser', isUser, (req, res) => {
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
server.post('/api/signup', (req, res) => {
  res.send(addUser(req.body));
});

server.post('/api/isUniqueId', (req, res) => {
  const { id } = req.body;
  res.send(!isUniqueId(id));
});

/**
 * 회원 수정
 */
server.patch('/api/user', (req, res) => {
  res.send(updateUser(req.body));
});

/**
 * 회원 삭제
 */
server.delete('/api/user/', (req, res) => {
  res.send(deleteUser(req.body.id));
});

// POST API
/**
 * 글 목록 가져오기
 */
server.get('/api/posts', (req, res) => {
  res.send(getPosts({ id: 0, pageSize: 5 }));
});

server.post('/api/posts', (req, res) => {
  const { id, pageSize } = req.body;
  res.send(getPosts({ id, pageSize }));
});

server.post('/api/like', (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const { id: postId } = req.body;
    addLike(decoded.id, postId);
  } catch (e) {
    res.status(401).send({ err: '등록되지 않은 사용자입니다.' });
  }
});

server.get('/api/like', (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    res.send(getLikes(decoded.id));
  } catch (e) {
    res.status(401).send({ err: '등록되지 않은 사용자입니다.' });
  }
});

/**
 * 글 가져오기
 */
server.get('/api/post/:id', (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const post = getPost(+req.params.id);
    res.send({
      isUser: true,
      canEdit: post.author.id === decoded.id,
      post,
    });
  } catch (e) {
    res.send({
      isUser: false,
      canEdit: false,
      post: getPost(+req.params.id),
    });
  }
});

/**
 * 글 추가
 */
server.post('/api/post', (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const post = req.body;
    res.send(addPost({ ...post, author: { ...decoded } }));
  } catch (e) {
    res.send(false);
  }
});

/**
 * 글 수정하기
 */
server.patch('/api/post', canEdit, (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const post = req.body;
    res.send(updatePost({ ...post, author: { ...decoded } }));
  } catch (e) {
    res.send(false);
  }
});

/**
 * 글 삭제하기
 */
server.delete('/api/post/:id', (req, res) => {
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

server.post('/api/comment', (req, res) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    let newComment = req.body;
    newComment = { ...newComment, author: decoded };
    addComment(newComment);
  } catch (e) {
    res.status(401).send({ err: '등록되지 않은 사용자입니다.' });
  }
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
