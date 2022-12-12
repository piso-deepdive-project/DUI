import Component from '../common/Component';
import { MainNav, Posts } from '../components';

class Main extends Component {
  render() {
    const nav = new MainNav().render();
    const posts = new Posts().render();
    return `
      ${nav}
      ${posts}
    `;
  }
}
export default Main;
