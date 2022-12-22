let { users } = require('./datas/users');
let { posts } = require('./datas/posts');

posts = posts.sort((postA, postB) => postB.date - postA.date);

// USER

const user = {
  getUser: user => users.find(_usr => _usr.id === user.id && _usr.pwd === user.pwd),
  addUser: user => {
    users = [...users, user];
  },
};

const like = {
  // prettier-ignore
  addLike: (userId, postId) => {
    users = users.map(user => (user.id === userId
      ? {
        ...user,
        likes: user.likes.includes(postId)
          ? user.likes.filter(like => like !== +postId) : [postId, ...user.likes]
      }
      : user));
  },
  getLikes: userId => users.find(user => user.id === userId).likes,
};

const etc = {
  isUniqueId: id => {
    if (users.length === 0) return true;
    return users.some(user => user.id === id);
  },
  addComment: ({ postId, comment, author }) => {
    const newComment = { comment, author, date: new Date() };
    posts = posts.map(_post => (_post.id === postId ? { ..._post, comments: [..._post.comments, newComment] } : _post));
  },
};

const getNextId = () => Math.max(...posts.map(post => post.id), 0) + 1;
const post = {
  getPosts: ({ id, pageSize }) => {
    const _posts = [];
    let i = id;
    let cnt = pageSize;

    while (posts[i] && cnt >= 0) {
      _posts.push(posts[i]);
      i += 1;
      cnt -= 1;
    }

    return _posts;
  },
  getPost: id => posts.find(post => post.id === id),
  addPost: post => {
    const newPost = { ...post, id: getNextId() };
    posts = [newPost, ...posts];
  },
  updatePost: post => {
    posts = posts.map(_post => (_post.id === +post.id ? { ..._post, ...post } : _post));
    return this.getPost(+post.id);
  },
  deletePost: id => {
    posts = posts.filter(post => post.id !== id);
    return this.getPost(id);
  },
};

module.exports = {
  ...user,
  ...like,
  ...etc,
  ...post,
};
