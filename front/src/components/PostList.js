import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  async render() {
    const posts = await this.props.fetchPosts();

    const postCard = posts?.map(post => new PostCard({ post }).render()).join('');

    const pagination = new Pagination().render();
    return `
      <div class="post-list">
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
