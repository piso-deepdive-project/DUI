import { Component } from '../common';
import PostCard from './PostCard';

class PostGrid extends Component {
  async render() {
    const posts = await this.props.fetchPosts();

    const postCard = posts?.map(post => new PostCard({ post }).render()).join('');

    return `
    <div class="post-grid">
      ${postCard}
    </div>
`;
  }
}

export default PostGrid;
