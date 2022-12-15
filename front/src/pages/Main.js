import axios from 'axios';
import Component from '../common/Component';
import { MainNav, Posts } from '../components';

class Main extends Component {
  /**
   * render가 호출될때 마다 서버로부터 필요한 상태를 받아와서 하위 컴포넌트로 전달
   * 이를 위해 비동기처리가 필요한 render에 async-await 사용
   */

  async render() {
    const posts = await this.fetchPosts();

    const { data: isValidUser } = await axios.get('/validUser');
    const nav = new MainNav({ isValidUser }).render();

    const postsString = new Posts({ posts }).render();

    return `
      ${nav}
      ${postsString}
    `;
  }

  async fetchPosts() {
    const { data: posts } = await axios.get('/posts');

    return posts;
  }
}
export default Main;
