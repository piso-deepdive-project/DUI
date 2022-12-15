import PostType from './PostType';
import PostList from './PostList';
import PostGrid from './PostGrid';

import { Component } from '../common';

class Posts extends Component {
  async render() {
    const { fetchPosts, setPostType, currentPostType } = this.props;
    const postType = new PostType({ setPostType }).render();
    const postList = await new PostList({ fetchPosts }).render();
    const postGrid = await new PostGrid({ fetchPosts }).render();

    return `
      ${postType}
      ${currentPostType === 'grid' ? postGrid : postList}
    `;
  }
}

export default Posts;
