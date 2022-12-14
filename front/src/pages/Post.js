import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  render() {
    const { posts, deletePost } = this.props;
    const pathId = +window.location.pathname.split('/')[2];

    const post = posts.find(({ id }) => id === pathId);

    const mainNav = new MainNav().render();
    const postDetail = new PostDetail({ post, deletePost }).render(); // 수정하기 버튼에 대한 editPost함수 만들어서 전달해주어야 함
    return `
      ${mainNav}
      ${postDetail}
    `;
  }
}

export default Post;
