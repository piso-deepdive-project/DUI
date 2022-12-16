import Component from '../common/Component';

class PostCard extends Component {
  render() {
    const { post, currentPostType } = this.props;
    const { id, date, title, author } = post;

    return `
      <div class="post-${currentPostType}-card route" data-route="/post/${id}">
        <h3 class="card-author">${author.author}</h3>
        <span class="card-date">${date}</span>
        <span class="card-description">${title}</span>
        <div class="thumbnail">
          <img src="/assets/thumbnail.svg" alt="" />
        </div>
      </div>
    `;
  }
}

export default PostCard;
