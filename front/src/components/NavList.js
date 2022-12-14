import { Component } from '../common';

class NavList extends Component {
  render() {
    return `
      <ul class="main-nav-list">
        <li><i class="bx bx-menu"></i></li>
        <li class='logo'>DUI</li>
      </ul>
      <!-- 로그인안한 유저 -->
      <button class="edit-btn route" data-route="/signin">
        Signin
      </button>
      <!-- 로그인한 유저 -->
      <button class="edit-btn route" data-route="/edit">
      <i class="bx bx-edit-alt"></i>
      </button>
    `;
  }
}

export default NavList;
