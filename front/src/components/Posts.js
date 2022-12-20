import { Component } from '../common';

import PostType from './PostType';
import PostList from './PostList';
import PostGrid from './PostGrid';

class Posts extends Component {
  async render() {
    const { fetchPosts, setPostType, currentPostType } = this.props;

    const postType = new PostType({ setPostType, currentPostType }).render();
    const postList =
      currentPostType === 'grid'
        ? await new PostGrid({ fetchPosts }).render()
        : await new PostList({ fetchPosts }).render();

    return `
      ${postType}
      ${postList}
    `;
  }
}

export default Posts;
