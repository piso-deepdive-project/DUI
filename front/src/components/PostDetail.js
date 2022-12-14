import { Component } from '../common';

class PostDetail extends Component {
  render() {
    const { post } = this.props;
    const { id, title, author, tags, date, content } = post; // author.author는 좀 이상한데 ?, post안에 content property 필요, tags는 나중에 해보기로

    return `
      <article class="post" id="${id}">
        <h1 class="post-title">${title}</h1>
        <div class="post-buttons">
          <button class="post-edit route" data-route="/edit/${id}">수정하기</button>
          <button class="post-remove route" data-route="/">삭제하기</button>
        </div>
        <span class="post-description">${author.author} · ${date}</span>
        <p class="post-content">
          ${content}
        </p>
      </article>
    `;
  }

  addEventListener() {
    const { deletePost } = this.props;

    return [{ type: 'click', selector: '.post-remove', handler: deletePost }];
  }
}

export default PostDetail;
