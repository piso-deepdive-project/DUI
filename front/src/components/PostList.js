import Component from '../common/Component';
import PostCard from './PostCard';
import Pagination from './Pagination';

class PostList extends Component {
  async render() {
    const { fetchPosts, currentPostType } = this.props;
    const posts = await fetchPosts();

    const postCard = posts?.map(post => new PostCard({ post, currentPostType }).render()).join('');

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
