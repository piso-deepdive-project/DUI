import axios from 'axios';

import { Component } from '../common';

import { MainNav, PostDetail, Comment } from '../components';

class Post extends Component {
  async render() {
    const postpath = window.location.pathname;
    const postId = +postpath.split('/')[2];

    const { accessUser, canEdit, post } = await this.getPost(postId);

    if (!post) {
      window.history.pushState(null, null, '/wrongpost');
      this.setState();
      window.history.pushState(null, null, postpath);
    }

    const likes = accessUser ? (await axios.get('/api/like')).data : null;

    const mainNav = new MainNav({ accessUser }).render();
    const postDetail = new PostDetail({
      accessUser,
      canEdit,
      post,
      likes,
      addLike: this.addLike.bind(this),
      deletePost: this.deletePost,
    }).render();
    const comment = new Comment({
      accessUser, //
      post,
      addComment: this.addComment.bind(this),
    }).render();

    return `
      ${mainNav}
      ${postDetail}
      ${comment}
    `;
  }

  addComment(e) {
    const textarea = e.target.previousElementSibling;

    const comment = textarea.value;
    const postId = +e.target.closest('.comment').dataset.postid;

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
    this.setState();
  }
}

export default Post;
