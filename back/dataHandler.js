let { users } = require('./datas/users');
let { posts } = require('./datas/posts');

// USER
const getUser = user => users.find(_usr => _usr.id === user.id && _usr.pwd === user.pwd);

const addUser = user => {
  users = [...users, user];
};

const isUniqueId = id => {
  if (users.length === 0) return true;
  return users.some(user => user.id === id);
};

// prettier-ignore
const addLike = (userId, postId) => {
  users = users.map(user => (user.id === userId
    ? {
      ...user,
      likes: user.likes.includes(postId)
        ? user.likes.filter(like => like !== +postId) : [postId, ...user.likes]
    }
    : user));
};

const getLikes = userId => users.find(user => user.id === userId).likes;

// POST
const getPosts = ({ id, pageSize }) => {
  const _posts = [];
  let i = id;
  let cnt = pageSize;

  while (posts[i] && cnt >= 0) {
    _posts.push(posts[i]);
    i += 1;
    cnt -= 1;
  }

  return _posts;
};

// const getPost = id => posts.filter(post => post.id === id);
const getPost = id => posts.find(post => post.id === id);

const getNextId = () => Math.max(...posts.map(post => post.id), 0) + 1;

const addPost = post => {
  const newPost = { ...post, id: getNextId() };
  posts = [...posts, newPost];
};

const updatePost = post => {
  posts = posts.map(_post => (_post.id === +post.id ? { ..._post, ...post } : _post));
  return getPost(+post.id);
};

const deletePost = id => {
  posts = posts.filter(post => post.id !== id);
  return getPost(id);
};

const addComment = ({ postId, comment, author }) => {
  const newComment = { comment, author, date: new Date() };
  posts = posts.map(_post => (_post.id === postId ? { ..._post, comments: [..._post.comments, newComment] } : _post));
};

module.exports = {
  getUser,
  addUser,
  isUniqueId,
  addLike,
  getLikes,
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  addComment,
};
