import { Component } from '../common';

class NavMenu extends Component {
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
      <ul class="nav-menu shadow-md">
        <h1>DUI</h1>
        <img class="" src="./test.svg" alt="" />
        <h2>사용자</h2>
        <li class="text-base">메뉴 1</li>
        <li class="text-base">메뉴 2</li>
        <li class="text-base">메뉴 3</li>
      </ul>
`;
  }
}

export default NavMenu;
