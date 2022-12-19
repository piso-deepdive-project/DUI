import axios from 'axios';

import { Component } from '../common';

import userValidation from '../lib/userValidation';

class SignUp extends Component {
  email = null;

  authorname = null;

  password = null;

  password2 = null;

  signupInputs = null;

  render() {
    const canSubmit = this.state?.canSubmit ?? false;
    return `
      <nav class="user-nav">
        <a href="/">DUI POST</a>
      </nav>
      <form class="signup-form">
        <h1 class="title">SIGNUP</h1>
        <div class="signup-container">
        <label for="email">이메일</label>
          <input
            name="email"
            type="email"
            class="signin-userid"
            minlength="8"
            value="${this.state?.email.value ?? ''}"
          />
          <span class="errorMsg">${this.state?.email.errMsg ?? ''}</span>
          <label for="authorname">이름</label>
          <input
            id="authorname"
            name="authorname"
            type="text"
            class="signin-username"
            minlength="2"
            maxlength="5"
            value="${this.state?.authorname.value ?? ''}"
          />
          <button class="uniqueBtn" type="button">${canSubmit ? '사용 가능한 이메일' : '중복 확인'}</button>
          <span class="errorMsg">${this.state?.authorname.errMsg ?? ''}</span>
          <label for="password">비밀번호</label>
          <input
          name="password"
            type="password"
            class="signin-password"
            minlength="6"
          />
          <span class="errorMsg">${this.state?.password.errMsg ?? ''}</span>
          <label for="password2">비밀번호 재확인</label>
          <input
            name="password2"
            type="password"
            class="signin-password2"
            minlength="6"
          />
          <span class="errorMsg">${this.state?.password2.errMsg ?? ''}</span>
          <button type="submit" class="signup-btn" ${canSubmit ? '' : ''}}>회원가입</button>
          <div class="user-link">
            <a href="/signin">로그인</a>
          </div>
        </div>
      </form>
    `;
  }

  // input의 값이 조건에 맞지 않다면 해당 input로 focus가 이동한다.(위에서부터 차례로)
  moveFocus() {
    if (!userValidation.email.valid) this.email.focus();
    else if (!userValidation.authorname.valid) this.authorname.focus();
    else if (!userValidation.password.valid) this.password.focus();
    else if (!userValidation.password2.valid) this.password2.focus();
  }

  editErrorMsg() {
    return [...this.signupInputs].map($input => {
      if ($input.value.trim() === '') return '필수 정보입니다.';
      if (!userValidation[$input.name].valid) return userValidation[$input.name].error;
      return '';
    });
  }

  // 서버로부터 입력한 이메일과 이름이 존재하는지 확인하고 없다면 postUser를 호출한다.
  async getUser(id, authorname) {
    const { data } = await axios.post('/signup', { id, authorname });
    if (data === '' && userValidation.signupValid) this.postUser();
  }

  async isUniqueId(e) {
    const { data } = await axios.post('/isUniqueId', { id: e.target.closest('form').email.value.trim() });
    if (data) this.setState({ canSubmit: data });
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async postUser() {
    const {
      email, //
      authorname,
      password,
    } = userValidation;

    await axios.post('/signup', {
      id: email.value,
      authorname: authorname.value,
      pwd: password.value,
    });
  }

  validationUser(e) {
    e.preventDefault();

    // 노드객체를 기억, uservalidation에 값을 넣어준다.
    [...e.target.querySelectorAll('.signup-container input')].forEach($input => {
      this[$input.name] = $input;
      userValidation[$input.name].value = $input.value.trim();
    });

    // this.moveFocus();

    // this.getUser(userValidation.email.value, userValidation.authorname.value);
    // 이메일 중복을 확인하고, 중복이면
    const signupForm = e.target;
    this.setState({
      // errMsgs: this.editErrorMsg(),
      email: {
        value: signupForm.email.value,
        errMsg: userValidation.email.error,
      },
      authorname: {
        value: signupForm.authorname.value,
        errMsg: userValidation.authorname.error,
      },
      password: {
        errMsg: userValidation.password.error,
      },
      password2: {
        errMsg: userValidation.password2.error,
      },
    });
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signup-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.uniqueBtn', handler: this.isUniqueId.bind(this) },
    ];
  }
}

export default SignUp;
