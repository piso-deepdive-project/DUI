import { Component } from '../common';

import PostCard from './PostCard';

class Posts extends Component {
  async render() {
    const { fetchPosts, currentPostType } = this.props;

    const posts = await fetchPosts();

    const postCards = posts?.map(post => new PostCard({ post }).render()).join('');

    return `
      <ul class="post-type">
        <li data-type="list">
          <i class="bx bx-list-ul  bx-lg bg-txt text-main ${currentPostType === 'list' ? 'select' : ''}"></i>
        </li>
        <li data-type="grid">
          <i class="bx bx-grid-alt bx-lg ${currentPostType === 'grid' ? 'select' : ''}"></i>
        </li>
      </ul>
      <div class="post-${currentPostType}">
        ${postCards}
      </div>
    `;
  }

  addEventListener() {
    return [{ type: 'click', selector: '.post-type li', handler: this.props.setPostType }];
  }
}

export default Posts;
