import timeForToday from '../lib/formatTime';

import { Component } from '../common';

class PostCard extends Component {
  render() {
    const { post } = this.props;
    const {
      id, //
      content,
      title,
      author,
      tags,
      thumbnail,
    } = post;

    // prettier-ignore
    return `
      <div class="post-card route" data-route="/post/${id}">
        <h3 class="card-author">${author.name}</h3>
        <span class="card-date">${timeForToday(new Date(post.date))}</span>
        <div class="card-description">
          <h2 class="card-title">${title}</h2>
          <ul class="card-tags">${tags.map(tag => `<li class="tag-span">#${tag}</li>`).join(' ')}</ul>
          <span class="card-content">${content}</span>
        </div>
        <div class="thumbnail">
          ${thumbnail ? `
          <img src="/assets/${thumbnail}" alt="" />` : `
          <img src="/assets/thumbnail0.svg" alt="" />`}
        </div>
      </div>
    `;
  }
}

export default PostCard;
