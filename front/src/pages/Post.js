import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  render() {
    const { posts } = this.props;
    const post = posts.find(({ id }) => id === 0); // location.pathname을 통해 posts 배열에서 post 찾아서 PostDetail에 전달

    const mainNav = new MainNav().render();
    const postDetail = new PostDetail({ post }).render();
    return `
      ${mainNav}
      ${postDetail}
    `;
  }
}

export default Post;
