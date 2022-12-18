import axios from 'axios';
import { Component } from '../common';

const signinValid = {
  email: {
    value: '',
    get valid() {
      return /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(this.value) && /.{6,12}/.test(this.value);
    },
    error: '이메일은 영문,숫자인 이메일 형식만 가능합니다.',
  },
  password: {
    value: '',
    get valid() {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/g.test(this.value);
    },
    error: '비밀번호가 다릅니다.',
  },
  get valid() {
    return this.email.valid && this.password.valid;
  },
};

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
          <input
          type="password"
          name="password"
          class="signin-password"
          minlength="5"
          placeholder="비밀번호"
          />
          <button type="submit"class="signin-btn">로그인</button>
          <div class="user-link">
          <a href="/signup">회원가입</a>
        </div>
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

  setSigninValid(e) {
    // input값을 입력하고 submit 하면 해당 값이 조건에 맞는지 검사해야한다.
    [...e.target.querySelectorAll('.signin-container input')].forEach($input => {
      this[$input.name] = $input;

      signinValid[$input.name].value = $input.value;
    });
  }

  // 제대로 입력하지 않은 값이 존재하면 email부터 차례대로 focus가 이동한다.
  moveFocus() {
    if (!signinValid.email.valid) this.email.focus();
    else if (!signinValid.password.valid) this.password.focus();
  }

  // 제대로 입력하지 않은 값이 존재하면 errorMsg가 출력된다.
  editErrorMsg() {
    if (!signinValid.email.valid) return signinValid.email.error;
    if (!signinValid.password.valid) return signinValid.password.error;
    if (signinValid.valid) return '';
  }

  validationUser(e) {
    e.preventDefault();

    this.setSigninValid(e);
    this.setState({
      isValidationUser: signinValid.valid,
      errMsg: this.editErrorMsg(),
      emailValue: this.email.value,
    });
    this.moveFocus();

    if (this.state.isValidationUser) {
      this.getUser(signinValid.email.value, signinValid.password.value);
    }
  }

  addEventListener() {
    return [{ type: 'submit', selector: '.signin-form', handler: this.validationUser.bind(this) }];
  }
}

export default SignIn;
