import axios from 'axios';

import { Component } from '../common';

import userValidation from '../lib/userValidation';

class SignIn extends Component {
  email = null;

  pwd = null;

  userValidation = userValidation();

  // prettier-ignore
  render() {
    return `
      <header class="user-header">
        <div class='logo route' data-route="/"></div>
      </header>
      <form class="signin-form">
        <h1 class="title">SIGNIN</h1>
        <span class="errorMsg">${this.state?.email?.errMsg || this.state?.pwd?.errMsg || ''}</span>
        <div class="signin-container">
          <input
            type="email"
            name="email"
            class="signin-userid"
            minlength="8"
            placeholder="이메일"
            value="${this.state?.email?.value ?? ''}"
            required
          />
          <i class='signin-email-icon icon hidden bx bx-x'></i>
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
      const signinUser = await axios.post('/signin', { id, pwd });
      if (signinUser !== '') console.log('로그인 성공');

      window.history.pushState(null, null, '/');
      this.setState();
    } catch (error) {
      console.log(error);
      this.setState({ errMsg: error.response.data.err });
    }
  }

  validationUser(e) {
    e.preventDefault();

    if (this.userValidation.signinValid) {
      this.getUser(this.userValidation.email.value, this.userValidation.pwd.value);
    }

    const signinForm = e.target;
    this.setState({
      email: this.userValidation.email.valid(signinForm.email.value),
      pwd: this.userValidation.pwd.valid(signinForm.pwd.value),
    });
  }

  deleteInputValue(e) {
    e.target.previousElementSibling.value = '';
    e.target.classList.add('hidden');
  }

  showDeleteIcon(e) {
    e.target.nextElementSibling.classList.toggle('hidden', e.target.value === '');
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signin-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.signin-form .icon', handler: this.deleteInputValue },
      { type: 'input', selector: '.signin-form input', handler: this.showDeleteIcon },
    ];
  }
}

export default SignIn;
