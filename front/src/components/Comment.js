import Component from '../common/Component';

class Comment extends Component {
  render() {
    return `<div class="comment">
    <h2>6개의 댓글</h2>
    <div>
      <div class="comment-write">
        <textarea placeholder="댓글을 작성하세요" class="write-area"></textarea>
        <div class="wrapper">
          <button class="write-btn">댓글 작성</button>
        </div>
      </div>
      <section class="comments">
        <div class="comment-ones">
          <div class="comment-title">
            <div class="profile">
              <img src="/assets/profile.png">
              <div class="comment-info">
                <div class="username">알 수 없음</div>
                <div class="date">2022년 12월 11일</div>
              </div>
            </div>          
          </div>
          <span class="comment-content"
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident tenetur omnis recusandae ullam facilis aut expedita ipsam quasi, enim fuga tempore officia eius laudantium rerum ut impedit illo velit dolor?</span
            >
        </div>
      </section>
    </div>
  </div>    
    `;
  }
}

export default Comment;
