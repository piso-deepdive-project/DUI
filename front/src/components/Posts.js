import PostType from './PostType';
import PostList from './PostList';
import { Component } from '../common';

class Posts extends Component {
  render() {
    const { posts } = this.props;

    // state에서 postFrom와 postFrom을 조작할 handler를 전달한다.
    const postType = new PostType().render();

    // state에서 grid인지 list인지 판별한다.
    // const postGrid
    const postList = new PostList({ posts }).render();

    return `
      ${postType}
      ${postList}
    `;
  }
}

export default Posts;
