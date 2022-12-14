import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  render() {
    const postCard = new PostCard().render();
    const pagination = new Pagination().render();
    return `
      <div class="post-list">
        ${postCard}
        ${postCard}
        ${postCard}
        ${pagination}
      </div>
    `;
  }

  // 포스트 카드 이벤트 위임
  // addEventListener() {
  //   return [{ type: 'submit', selector: '.post-card', handler: this.validationUser.bind(this) }];
  // }
}

export default PostList;
