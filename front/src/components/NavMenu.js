import { Component } from '../common';

class NavMenu extends Component {
  render() {
    const { isValidUser } = this.props;

    // prettier-ignore
    return `
      <div class="overlay"></div>
      <div class="side-menu">    
    ${isValidUser
    ? `<div class="login">
            <img class="profile" src="/assets/profile.png">
            <span class="username">UserName</span>
            <button class="start-btn route" data-route="/edit">새 글 작성하기</button>
          </div>`

    : `<div class="logout">
            <h1 class="side-title">DUI</h1>
            <p class="slogan">You can make anything<br />by writing</p>
            <p class="slogan_writer">- C.S.Lewis -</p>
            <button class="start-btn route" data-route="/signin">DUI 시작하기</button>
          </div>`}`;
  }

  addEventListener() {
    const { closeMenu } = this.props;

    return [{ type: 'click', selector: '.overlay', handler: closeMenu }];
  }
}

export default NavMenu;
