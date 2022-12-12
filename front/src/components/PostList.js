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
}

export default PostList;
