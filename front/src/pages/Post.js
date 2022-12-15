import axios from 'axios';
import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  async render() {
    const pathId = +window.location.pathname.split('/')[2];

    const post = await this.getPost(pathId);
    const { data: isValidUser } = await axios.get('/validUser');

    const mainNav = new MainNav({ isValidUser }).render();
    const postDetail = new PostDetail({ post, deletePost: this.deletePost }).render();

    return `
      ${mainNav}
      ${postDetail}
    `;
  }

  async getPost(id) {
    const { data: post } = await axios.get(`/post/${id}`);

    return post;
  }

  deletePost(e) {
    const id = +e.target.closest('article').id;
    axios.delete(`/post/${id}`);
  }
}

export default Post;
