import axios from 'axios';
import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  async render() {
    const pathId = +window.location.pathname.split('/')[2];

    const { isUser: isValidUser, canEdit, post } = await this.getPost(pathId);

    const mainNav = new MainNav({ isValidUser }).render();
    const postDetail = new PostDetail({ post, deletePost: this.deletePost, canEdit }).render();

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
