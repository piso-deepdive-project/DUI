import Component from '../common/Component';
import timeForToday from '../lib/formatTime';

class PostCard extends Component {
  render() {
    const { post, currentPostType } = this.props;
    const { id, content, title, author, tags } = post;

    return `
      <div class="post-${currentPostType}-card route" data-route="/post/${id}">
        <h3 class="card-author">${author.author}</h3>
        <span class="card-date">${timeForToday(new Date(post.date))}</span>
        <div class="card-description">
          <h2 class="card-title">${title}</h2>
          <div class="card-tags">${tags.map(tag => `<span class="tag-span">#${tag}</span>`).join(' ')}</div>
          <span class="card-content">${content}</span>
        </div>
        
        <div class="thumbnail">
          <img src="/assets/thumbnail.svg" alt="" />
        </div>
      </div>
    `;
  }
}

export default PostCard;
