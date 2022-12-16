import PostType from './PostType';
import PostList from './PostList';
import PostGrid from './PostGrid';

import { Component } from '../common';

class Posts extends Component {
  async render() {
    const { fetchPosts, setPostType, currentPostType } = this.props;
    const postType = new PostType({ setPostType, currentPostType }).render();

    const postForm =
      currentPostType === 'list'
        ? await new PostList({ fetchPosts }).render()
        : await new PostGrid({ fetchPosts }).render();

    return `
      ${postType}
      ${postForm}
    `;
  }
}

export default Posts;
