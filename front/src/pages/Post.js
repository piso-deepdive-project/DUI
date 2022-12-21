import axios from 'axios';

import { Component } from '../common';
import { MainNav, PostDetail, Comment } from '../components';

class Post extends Component {
  async render() {
    const pathId = +window.location.pathname.split('/')[2];

    const { accessUser, canEdit, post } = await this.getPost(pathId);

    const likes = accessUser ? (await axios.get('/api/like')).data : null;

    const mainNav = new MainNav({ accessUser }).render();
    const postDetail = new PostDetail({
      post,
      deletePost: this.deletePost,
      accessUser,
      canEdit,
      addLike: this.addLike.bind(this),
      likes,
    }).render();
    const comment = new Comment({ accessUser, post, addComment: this.addComment.bind(this) }).render();

    return `
      ${mainNav}
      ${postDetail}
      ${comment}
    `;
  }

  addComment() {
    const textarea = document.body.querySelector('textarea');
    const comment = textarea.value;
    const postId = +window.location.pathname.split('/')[2];

    if (comment.trim() === '') return;

    axios.post('/api/comment', { postId, comment });

    textarea.value = '';
    this.setState();
  }

  async getPost(id) {
    const { data: post } = await axios.get(`/api/post/${id}`);

    return post;
  }

  deletePost(e) {
    const id = +e.target.closest('article').id;
    axios.delete(`/api/post/${id}`);
  }

  addLike(e) {
    const id = +e.target.closest('article').id;
    axios.post('/api/like', { id });
    this.setState({ temp: 'ss' });
  }
}

export default Post;
