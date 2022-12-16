import { Component } from '../common';
import PostCard from './PostCard';

class PostGrid extends Component {
  async render() {
    const { fetchPosts, currentPostType } = this.props;
    const posts = await fetchPosts();

    const postCard = posts?.map(post => new PostCard({ post, currentPostType }).render()).join('');

    return `
    <div class="post-grid">
      ${postCard}
    </div>
`;
  }
}

export default PostGrid;
