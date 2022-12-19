import axios from 'axios';

import { Component } from '../common';

import { MainNav, Posts } from '../components';

class Main extends Component {
  async render() {
    const { data: isValidUser } = await axios.get('/validUser');

    const mainNav = new MainNav({ isValidUser }).render();

    const posts = await new Posts({
      fetchPosts: this.fetchPosts,
      setPostType: this.setPostType.bind(this),
      currentPostType: this.state?.currentPostType ?? 'list',
    }).render();

    return `
      ${mainNav}
      ${posts}
    `;
  }

  async fetchPosts() {
    const { data: posts } = await axios.get('/posts');
    return posts;
  }

  setPostType(e) {
    this.setState({ currentPostType: e.target.closest('li').dataset.type });
  }
}

export default Main;
