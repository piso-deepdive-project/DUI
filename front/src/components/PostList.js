import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  async render() {
    const { fetchPosts } = this.props;
    const posts = await fetchPosts();

    const postCards = posts?.map(post => new PostCard({ post }).render()).join('');

    const pagination = new Pagination().render();

    return `
      <div class="post-list">
        ${postCards}      
      </div>
    `;
  }
}

export default PostList;
