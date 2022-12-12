import { Component } from '../common';

class NavList extends Component {
  render() {
    return `
      <ul class="main-nav-list">
        <li><i class="bx bx-menu"></i></li>
        <li>DUI</li>
        <li>Posts</li>
      </ul>
      <button class="hover:bg-primary" onclick="location.href='/edit.html'">
        <i class="bx bx-edit-alt"></i>
      </button>
    `;
  }
}

export default NavList;
