import axios from 'axios';
import { Component } from '../common';

import NavList from './NavList';
import NavMenu from './NavMenu';

class MainNav extends Component {
  render() {
    const { accessUser } = this.props;

    const navList = new NavList({ accessUser, openMenu: this.openMenu }).render();
    const navMenu = new NavMenu({ accessUser, closeMenu: this.closeMenu, signout: this.signout.bind(this) }).render();

    return `
      <nav class="main-nav">
        ${navList}       
        ${navMenu}
      </nav>
    `;
  }

  openMenu() {
    document.querySelector('.main-nav').classList.add('open');
  }

  closeMenu() {
    document.querySelector('.main-nav').classList.remove('open');
  }

  signout() {
    axios.get('/api/signout/');
    window.history.pushState(null, null, '/');
    this.setState();
  }
}

export default MainNav;
