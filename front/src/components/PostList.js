import Component from '../common/Component';
import PostCard from './PostCard';

class PostList extends Component {
  async render() {
    const { fetchPosts } = this.props;
    const posts = await fetchPosts();

    const postCards = posts?.map(post => new PostCard({ post }).render()).join('');

    return `
      <div class="post-list">
        ${postCards}      
      </div>
    `;
  }
}

export default PostList;
