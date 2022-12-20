import timeForToday from '../lib/formatTime';

import { Component } from '../common';

class Comment extends Component {
  render() {
    const { post, accessUser } = this.props;
    const { comments } = post;

    // prettier-ignore
    return `<div class="comment">
    <h2>${comments.length}개의 댓글</h2>
    <div>
      ${accessUser ? `
        <div class="comment-write">
          <textarea placeholder="댓글을 작성하세요" class="write-area"></textarea>
          <div class="wrapper">
            <button class="write-btn">댓글 작성</button>
          </div>
        </div>` : ''}      
      <section class="comments">
        ${comments.map(({ author, comment, date }) => `
        <div class="comment-ones">
          <div class="comment-title">
            <div class="comment-profile">
              <img src="/assets/profile.png">
              <div class="comment-info">
                <div class="username">${author.name}</div>
                <div class="date">${timeForToday(new Date(date))}</div>
              </div>
            </div>          
          </div>
          <span class="comment-content">${comment}</span>
        </div>`).join('<hr class=comment-divider>')}               
      </section>
    </div>
  </div>    
    `;
  }

  addEventListener() {
    return [{ type: 'click', selector: '.write-btn', handler: this.props.addComment }];
  }
}

export default Comment;
