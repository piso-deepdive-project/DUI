import axios from 'axios';

import { Component } from '../common';

import { MainNav, Posts } from '../components';

class Main extends Component {
  pageSize = 8;

  async render() {
    const { data: accessUser } = await axios.get('/api/accessUser');

    const mainNav = new MainNav({ accessUser }).render();

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
    const { data: posts } = await axios.post('/api/posts', { id: 0, pageSize: this.pageSize });

    return posts;
  }

  setPostType(e) {
    this.setState({ currentPostType: e.target.closest('li').dataset.type });
  }

  scrollEvent(e) {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;

    if (clientHeight + scrollTop >= scrollHeight - 1) {
      this.pageSize += 6;
      this.setState();
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
