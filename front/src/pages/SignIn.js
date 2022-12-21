import axios from 'axios';

import { Component } from '../common';

import userSchema from '../lib/userSchema';

class SignIn extends Component {
  // prettier-ignore
  async render() {
    const { data: accessUser } = await axios.get('/api/accessUser');

    if (accessUser) {
      window.history.pushState(null, null, '/');
      this.setState();
    }

    const errMsg = this.state?.errMsg ?? '';
    const email = this.state?.email ?? '';

    return `
      <header class="user-header">
        <div class='logo route' data-route="/"></div>
      </header>
      <form class="signin-form">
        <h1 class="title">SIGNIN</h1>
        <span class="errorMsg">${errMsg}</span>
        <div class="signin-container">
          <input
            type="email"
            name="email"
            class="signin-userid"
            minlength="8"
            placeholder="이메일"
            value="${email}"
            required
          />
          <i class='signin-email-icon icon ${email !== '' ? '' : 'hidden'} bx bx-x'></i>
          <input
            type="password"
            name="pwd"
            class="signin-pwd"
            minlength="5"
            placeholder="비밀번호"
            required
          />
          <i class='signin-pwd-icon icon hidden bx bx-x'></i>
          <button type="submit"class="signin-btn">로그인</button>
          <button type="button" class="route" data-route="/signup">회원가입</button>
        </div>
      </form>
    `;
  }

  // validation이 true라면 서버에 해당 아이디 요청
  async getUser(id, pwd) {
    try {
      await axios.post('/api/signin', { id, pwd });
      window.history.pushState(null, null, '/');
      this.setState();
    } catch (error) {
      this.setState({ errMsg: error.response.data.err });
    }
  }

  validationUser(e) {
    e.preventDefault();

    const signinForm = e.target;

    const email = userSchema.email.valid(signinForm.email.value);
    if (!email.isErr) {
      this.setState({ email: email.value, errMsg: email.errMsg });
      return;
    }

    const pwd = userSchema.pwd.valid(signinForm.pwd.value);
    if (!pwd.isErr) {
      this.setState({ email: email.value, errMsg: pwd.errMsg });
      return;
    }

    this.getUser(userSchema.email.value, userSchema.pwd.value);
  }

  resetInput(e) {
    // e.target === x 아이콘
    // previousElementSibling input
    e.target.previousElementSibling.value = '';
    e.target.classList.add('hidden');
  }

  toggleIcon(e) {
    e.target.nextElementSibling.classList.toggle('hidden', e.target.value === '');
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signin-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.signin-form .icon', handler: this.resetInput },
      { type: 'input', selector: '.signin-form input', handler: this.toggleIcon },
    ];
  }
}

export default SignIn;
