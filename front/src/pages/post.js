import { Component } from '../common';
import { MainNav, PostDetail } from '../components/index';

class Post extends Component {
  render() {
    const mainNav = new MainNav().render();
    const postDetail = new PostDetail().render();
    return `
  ${mainNav}
  ${postDetail}
  `;
  }
}

export default Post;
