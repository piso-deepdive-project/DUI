let users = [
  {
    id: 'test123@gmail.com',
    pwd: 'utzazz12!!',
    author: 'Uta',
  },
];

let posts = [
  {
    id: 0,
    title: 'TEST POST TITLE',
    author: { id: 'test123@gmail.com', pwd: 'utzazz12!!', author: 'Uta' },
    tags: [],
    date: new Date('2022-10-08'),
  },
];

// USER
const getUser = user => users.find(_usr => _usr.id === user.id && _usr.pwd === user.pwd);

const addUser = user => {
  users = [...users, user];
};

const updateUser = user => {
  users = users.map(_usr => (_usr.id === user.id ? user : _usr));
};

const deleteUser = id => {
  users = users.filter(_usr => _usr.id !== id);
  console.log(users);
};

// POST
const getPosts = () => posts;

const getPost = id => posts.filter(post => post.id === id);

const addPost = post => {
  posts = [...posts, post];
};

const updatePost = post => {
  posts = posts.map(_post => (_post.id === +post.id ? post : _post));
  return getPost(+post.id);
};

const deletePost = id => {
  posts = posts.filter(post => post.id !== id);
  return getPost(id);
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};
