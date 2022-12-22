const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const { SignAPI } = require('./SignAPI');

const {
  getUser,
  addUser,
  isUniqueId,
  addLike,
  getLikes,
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  addComment,
} = require('./dataHandler');

// dotenv는 process.env에 키 값 형태로 환경변수를 설정하기 위해 사용하는 라이브러리
require('dotenv').config();

const server = express();
server.use(express.static('public'));
server.use(express.json());
server.use(cookieParser());

const middleware = {
  isUser: (req, res, next) => {
    // cookie나 헤더 auth로 들어오는지 확인 jwt.rest 참조
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      next();
    } catch (e) {
      // console.error('😱 사용자 인증 실패..', e);
      return res.send(false);
    }
  },
  canEdit: (req, res, next) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      next();
    } catch (e) {
      // console.error('😱 사용자 인증 실패..', e);
      return res.send({ isUser: false, canEdit: false });
    }
  },
};

const { isUser, canEdit } = middleware;

server.get('/api/accessUser', isUser, (req, res) => {
  res.send(true);
});

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

// USER API
/**
 * signin
 */
// signin post 요청
SignAPI({
  server,
  jwt,
  getUser,
  addUser,
  isUniqueId,
});

// posts api
server // API 마크다운 참조
  .route('/api/posts')
  .get((req, res) => {
    res.send(getPosts({ id: 0, pageSize: 5 }));
  })
  .post((req, res) => {
    const { id, pageSize } = req.body;
    res.send(getPosts({ id, pageSize }));
  });

// post/:id api
server
  .route('/api/post/:id')
  .get((req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      const post = Number.isNaN(+req.params.id) ? { author: { id: '' } } : getPost(+req.params.id);

      res.send({
        accessUser: true,
        canEdit: post.author.id === decoded.id,
        post,
      });
    } catch (e) {
      res.send({
        accessUser: false,
        canEdit: false,
        post: getPost(+req.params.id),
      });
    }
  })
  .delete((req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      res.send(deletePost(+req.params.id));
    } catch (e) {
      res.send('삭제할 권한이 없습니다.');
    }
  });

// post api
server
  .route('/api/post')
  .post((req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      const post = req.body;
      res.send(addPost({ ...post, author: { ...decoded } }));
    } catch (e) {
      res.send(false);
    }
  })
  .patch(canEdit, (req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      const post = req.body;
      res.send(updatePost({ ...post, author: { ...decoded } }));
    } catch (e) {
      res.send(false);
    }
  });

// like api
server
  .route('/api/like')
  .get((req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      res.send(getLikes(decoded.id));
    } catch (e) {
      res.status(401).send({ err: '등록되지 않은 사용자입니다.' });
    }
  })
  .post((req, res) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      const { id: postId } = req.body;
      addLike(decoded.id, postId);
    } catch (e) {
      res.status(401).send({ err: '등록되지 않은 사용자입니다.' });
    }
  });

server.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const { PORT } = process.env;

server.listen(PORT, () => {
  // console.log(`Server listening on http://localhost:${PORT}`);
});
