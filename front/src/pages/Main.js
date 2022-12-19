import axios from 'axios';

import { Component } from '../common';

import { MainNav, Posts } from '../components';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
    };
    this.addScrollEvent();
  }

  async render() {
    const { data: isValidUser } = await axios.get('/validUser');

    const mainNav = new MainNav({ isValidUser }).render();

    const posts = await new Posts({
      fetchPosts: this.fetchPosts.bind(this),
      setPostType: this.setPostType.bind(this),
      currentPostType: this.state?.currentPostType ?? 'list',
    }).render();

    return `
      ${mainNav}
      ${posts}
    `;
  }

  async fetchPosts() {
    const { data: posts } = await axios.get(`/posts/${this.state.page}`);
    return posts;
  }

  setPostType(e) {
    this.setState({ currentPostType: e.target.closest('li').dataset.type });
  }

  scrollEvent(e) {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

    if (clientHeight + scrollTop >= scrollHeight - 1) {
      const page = (this.state.page += 1);
      this.setState({ page });
    }
  }

  bindScrollEvent = this.scrollEvent.bind(this);

  addScrollEvent() {
    window.addEventListener('scroll', this.bindScrollEvent);
  }

  removeScrollEvent() {
    window.removeEventListener('scroll', this.bindScrollEvent);
  }
}

export default Main;
