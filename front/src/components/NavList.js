import { Component } from '../common';

class NavList extends Component {
  render() {
    const { isValidUser } = this.props;

    // prettier-ignore
    return `
      <ul class="main-nav-list">
        <li><i class="bx bx-menu open-menu"></i></li>
        <li class='logo route' data-route="/"></li>
      </ul>
      
      ${isValidUser
    ? `<button class="edit-btn route" data-route="/edit">
            <i class="bx bx-edit-alt"></i>
          </button>`
    : `<button class="edit-btn route" data-route="/signin">
          로그인
        </button>`
}
    `;
  }

  addEventListener() {
    const { openMenu } = this.props;

    return [{ type: 'click', selector: '.open-menu', handler: openMenu }];
  }
}

export default NavList;
