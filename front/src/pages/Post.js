import { Component } from '../common';
import { MainNav, PostDetail } from '../components';

class Post extends Component {
  render() {
    const { posts, deletePost } = this.props;

    const post = posts.find(({ id }) => id === 1) || {
      id: 0,
      title: 'TEST',
      author: { id: 'test123@gmail.com', pwd: 'utzazz12!!', author: 'Uta' },
      tags: [],
      date: new Date('2022-10-08'),
    }; // location.pathname을 통해 posts 배열에서 post 찾아서 PostDetail에 전달

    const mainNav = new MainNav().render();
    const postDetail = new PostDetail({ post, deletePost }).render(); // 수정하기 버튼에 대한 editPost함수 만들어서 전달해주어야 함
    return `
      ${mainNav}
      ${postDetail}
    `;
  }
}

export default Post;
