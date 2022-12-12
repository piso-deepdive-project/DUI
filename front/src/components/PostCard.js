import Component from '../common/Component';

class PostCard extends Component {
  render() {
    return `
      <div class="post-card hover:bg-primary" onclick="location.href='/view.html'">
        <h3 class="text-2 xl">작성자</h3>
        <span class="text-desc text-sm">날짜 | 시간</span>
        <span class="text-base">Description dwouhbwoefgnwongOJWDBNOWGWJBG</span>
        <img class="thumbnail" src="./test2.svg" alt="" />
      </div>
    `;
  }
}

export default PostCard;
