import { Component } from '../common';

class NavList extends Component {
  render() {
    const { isValidUser } = this.props;

    // prettier-ignore
    return `
      <ul class="main-nav-list">
        <li><i class="bx bx-menu"></i></li>
        <li class='logo'>DUI</li>
      </ul>
      
      ${
  isValidUser
    ? `<button class="edit-btn route" data-route="/edit">
          <i class="bx bx-edit-alt"></i>
        </button>`
    : `<button class="edit-btn route" data-route="/signin">
          Signin
        </button>`
}
    `;
  }
}

export default NavList;
