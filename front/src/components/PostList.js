import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    const postCard = posts?.map(post => new PostCard({ post }).render()).join('');

    const pagination = new Pagination().render();
    return `
      <div class="post-list">
        ${postCard}        
        ${pagination}
      </div>
    `;
  }
}

export default PostList;
