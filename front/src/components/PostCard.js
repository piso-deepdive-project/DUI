import Component from '../common/Component';

class PostCard extends Component {
  render() {
    const { post } = this.props;
    const { id, date, title, author, tags } = post;

    return `
      <div class="post-card hover:bg-primary route" data-route="/post/${id}">
        <h3 class="text-2 xl">${author.author}</h3>
        <span class="text-desc text-sm">${date}</span>
        <span class="text-base">${title}</span>
        <img class="thumbnail" src="./test2.svg" alt="" />
      </div>
    `;
  }
}

export default PostCard;
