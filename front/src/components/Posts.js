import PostType from './PostType';
import PostList from './PostList';
import { Component } from '../common';

class Posts extends Component {
  render() {
    const postType = new PostType().render();
    const postList = new PostList().render();

    return `
    ${postType}
    ${postList}
    `;
  }
}

export default Posts;
