import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  async render() {
    const { fetchPosts, currentPostType } = this.props;
    const posts = await fetchPosts();

    const postCards = posts?.map(post => new PostCard({ post, currentPostType }).render()).join('');

    return `
      <div class="post-list">
        ${postCards}      
      </div>
    `;
  }
}

export default PostList;
