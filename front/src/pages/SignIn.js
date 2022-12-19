import axios from 'axios';

import { Component } from '../common';

import userValidation from '../lib/userValidation';

class SignIn extends Component {
  state = {
    isValidationUser: false,
    errMsg: '',
    emailValue: '',
  };

  email = null;

  password = null;

  // prettier-ignore
  render() {
    return `
      <nav class="user-nav">
        <a href="/">DUI POST</a>
      </nav>
      <form class="signin-form">
        <h1 class="title">SIGNIN</h1>
        <span class="errorMsg">${this.state.errMsg}</span>
        <div class="signin-container">
          <input
            type="email"
            name="email"
            class="signin-userid"
            minlength="8"
            placeholder="이메일"
            value="${this.state.emailValue}"
          />
          <i class='signin-email-icon icon hidden bx bx-x'></i>
          <input
            type="password"
            name="password"
            class="signin-password"
            minlength="5"
            placeholder="비밀번호"
          />
          <i class='signin-password-icon icon hidden bx bx-x'></i>
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
      // 로그인 성공하고 뒤로가기 클릭시 로그인페이지로 이동 불가
      window.location.replace('/');
    } catch (error) {
      console.log(error);
      this.setState({ errMsg: error.response.data.err });
    }
  }

  setuserValidation(e) {
    // input값을 입력하고 submit 하면 해당 값이 조건에 맞는지 검사해야한다.
    [...e.target.querySelectorAll('.signin-container input')].forEach($input => {
      this[$input.name] = $input;

      userValidation[$input.name].value = $input.value;
    });
  }

  // 제대로 입력하지 않은 값이 존재하면 email부터 차례대로 focus가 이동한다.
  moveFocus() {
    if (!userValidation.email.valid) this.email.focus();
    else if (!userValidation.password.valid) this.password.focus();
  }

  // 제대로 입력하지 않은 값이 존재하면 errorMsg가 출력된다.
  editErrorMsg() {
    if (!userValidation.email.valid) return userValidation.email.error;
    if (!userValidation.password.valid && userValidation.password.value !== '') return userValidation.password.error;
    return '';
  }

  validationUser(e) {
    e.preventDefault();

    this.setuserValidation(e);
    this.setState({
      isValidationUser: userValidation.signinValid,
      errMsg: this.editErrorMsg(),
      emailValue: this.email.value,
    });
    this.moveFocus();

    if (this.state.isValidationUser) {
      this.getUser(userValidation.email.value, userValidation.password.value);
    }
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
