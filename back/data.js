const users = [
  {
    id: "test123@gmail.com",
    pwd: "utzazz12!!",
    author: "Uta",
  },
];

const getUsers = () => users;

const posts = [
  {
    id: 0,
    title: "TEST POST TITLE",
    author: { id: "test123@gmail.com", pwd: "utzazz12!!", author: "Uta" },
    tags: [],
    date: new Date("2022-10-08"),
  },
];

const getPosts = () => posts;

module.exports = {
  getPosts,
};
