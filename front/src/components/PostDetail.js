import { Component } from '../common';
import timeForToday from '../lib/formatTime';

class PostDetail extends Component {
  // prettier-ignore
  render() {
    const {
      post, canEdit, likes, accessUser
    } = this.props;

    const {
      id, title, author, tags, date, content
    } = post;

    const liked = likes === null ? false : likes.includes(id);

    return `
      <article class="post" id="${id}">
        <h1 class="post-title">${title}</h1>
        <div class="post-buttons">
        ${canEdit ? `<button class="post-edit route" data-route="/edit/${id}">수정하기</button>
          <button class="post-remove route" data-route="/">삭제하기</button>` : ''}

        ${accessUser ? `<button class="post-like"><i class='bx ${liked ? 'bxs' : 'bx'}-like'></i></button> ` : ''}
          
        </div>
        <span class="post-description">${author.name} · ${timeForToday(new Date(date))}</span>
        <p class="post-content">
          ${content}
        </p>
      </article>
    `;
  }

  addEventListener() {
    const { deletePost, addLike } = this.props;

    return [
      { type: 'click', selector: '.post-remove', handler: deletePost },
      { type: 'click', selector: '.post-like', handler: addLike },
    ];
  }
}

export default PostDetail;
