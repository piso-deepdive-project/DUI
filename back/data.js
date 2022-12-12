const users = [
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
  console.log(posts);
  return getPost(id);
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};
