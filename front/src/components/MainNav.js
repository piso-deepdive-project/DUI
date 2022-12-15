import Component from '../common/Component';
import NavList from './NavList';
import NavMenu from './NavMenu';

class MainNav extends Component {
  render() {
    const { isValidUser } = this.props;

    const navList = new NavList({ isValidUser }).render();
    const navMenu = new NavMenu().render();
    return `
      <nav class="main-nav">
       ${navList}
      </nav>
    `;
  }
}

export default MainNav;
