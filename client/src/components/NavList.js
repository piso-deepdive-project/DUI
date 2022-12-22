import { Component } from '../common';

class NavList extends Component {
  render() {
    const { accessUser } = this.props;

    // prettier-ignore
    return `
      <ul class="main-nav-list ml-24">
        <li><i class="bx bx-menu open-menu"></i></li>
        <li class='logo route' data-route="/"></li>
      </ul>
      
      ${accessUser
    ? `<button class="edit-btn route mr-24" data-route="/edit">
            <i class="bx bx-edit-alt"></i>
          </button>`
    : `<button class="edit-btn route mr-24" data-route="/signin">
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
