import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  render() {
    const { posts, deletePost } = this.props;
    const pathId = +window.location.pathname.split('/')[2];

    const post = posts.find(({ id }) => id === pathId);

    const mainNav = new MainNav().render();
    const postDetail = new PostDetail({ post, deletePost }).render();
    return `
      ${mainNav}
      ${postDetail}
    `;
  }
}

export default Post;
