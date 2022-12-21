import timeForToday from '../lib/formatTime';

import { Component } from '../common';

class Comment extends Component {
  render() {
    const { post, accessUser } = this.props;

    const { id, comments } = post;

    // prettier-ignore
    return `
  <section class="comment" data-postId="${id}">
    <h2>${comments.length}개의 댓글</h2>
    <div>
      ${accessUser ? `
        <div class="comment-write">
          <textarea placeholder="댓글을 작성하세요" class="write-area"></textarea>
          <button class="write-btn">댓글 작성</button>
        </div>` : ''}      
      <div class="comments">
        ${comments.map(({ author, comment, date }) => `
        <div class="comment-ones">
          <div class="comment-header">
            <img src="/assets/profile.png">
            <div class="comment-info">
              <span class="username">${author.name}</span>
              <span class="date">${timeForToday(new Date(date))}</span>
            </div>
          </div>          
          <span class="comment-content">${comment}</span>
        </div>`).join('<hr class="comment-divider">')}               
      </div>
    </div>
  </section>    
    `;
  }

  addEventListener() {
    return [{ type: 'click', selector: '.write-btn', handler: this.props.addComment }];
  }
}

export default Comment;
