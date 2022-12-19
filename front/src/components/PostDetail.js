import { Component } from '../common';
import timeForToday from '../lib/formatTime';

class PostDetail extends Component {
  // prettier-ignore
  render() {
    const {
      post, canEdit, likes, isValidUser
    } = this.props;

    const {
      id, title, author, tags, date, content
    } = post; // author.author는 좀 이상한데 ?, post안에 content property 필요, tags는 나중에 해보기로

    const liked = likes === null ? false : likes.includes(id);
    console.log(likes, liked, id);

    return `
      <article class="post" id="${id}">
        <h1 class="post-title">${title}</h1>
        <div class="post-buttons">
        ${canEdit ? `<button class="post-edit route" data-route="/edit/${id}">수정하기</button>
          <button class="post-remove route" data-route="/">삭제하기</button>` : ''}

        ${isValidUser ? `<button class="post-like"><i class='bx ${liked ? 'bxs' : 'bx'}-like'></i></button> ` : ''}
          
        </div>
        <span class="post-description">${author.author} · ${timeForToday(new Date(date))}</span>
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
