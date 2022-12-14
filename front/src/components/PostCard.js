import Component from '../common/Component';

class PostCard extends Component {
  render() {
    const { post } = this.props;
    const { id, date, title, author, tags } = post;

    return `
      <div class="post-card route" data-route="/post/${id}">
        <h3 class="card-author">${author.author}</h3>
        <span class="card-date">${date}</span>
        <span class="card-description">${title}</span>
        <img class="thumbnail" src="./thumbnail.svg" alt="" />
      </div>
    `;
  }
}

export default PostCard;
