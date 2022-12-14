import Component from '../common/Component';

class PostCard extends Component {
  render() {
    return `
      <div class="post-card">
        <h3 class="card-author">작성자</h3>
        <span class="card-date">날짜 | 시간</span>
        <span class="card-description">Description dwouhbwoefgnwongOJWDBNOWGWJBG</span>
        <img class="thumbnail" src="./thumbnail.svg" alt="" />
      </div>
    `;
  }
}

export default PostCard;
