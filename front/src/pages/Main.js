import Component from '../common/Component';
import { MainNav, Posts } from '../components';

class Main extends Component {
  render() {
    const { posts } = this.props;

    const nav = new MainNav().render();
    const postsString = new Posts({ posts }).render();
    return `
      ${nav}
      ${postsString}
    `;
  }
}
export default Main;
