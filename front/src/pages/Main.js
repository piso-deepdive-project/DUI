import axios from 'axios';
import Component from '../common/Component';
import { MainNav, Posts } from '../components';

class Main extends Component {
  state = {
    posts: [],

    // list인지 grid인지 판별
    postForm: 'list',
  };

  render() {
    const { posts } = this.props;
    const nav = new MainNav().render();
    const postsString = new Posts({ posts }).render();
    return `
      ${nav}
      ${postsString}
    `;
  }

  // async fetchPosts() {
  //   const posts = await axios.get('/posts');
  // }

  // 해딩 li 클릭시 post의 형식이 list,grid로 바뀐다.
  togglePostForm(e) {
    const { postForm } = this.props;
    this.setState({ postForm });
  }
}
export default Main;
