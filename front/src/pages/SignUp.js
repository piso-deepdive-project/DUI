import axios from 'axios';

import userSchema from '../lib/userSchema';

import { Component } from '../common';

class SignUp extends Component {
  async render() {
    const canSubmit = this.state?.canSubmit ?? false;
    const { data: accessUser } = await axios.get('/api/accessUser');

    if (accessUser) {
      window.history.pushState(null, null, '/');
      this.setState();
    }

    const email = this.state?.email;
    const authorname = this.state?.authorname;
    const pwd = this.state?.pwd;
    const confirmPwd = this.state?.confirmPwd;

    return `
      <header class="user-header">
        <div class='logo route' data-route="/"></div>
      </header>
      <form class="signup-form">
        <h1 class="title">SIGNUP</h1>
        <div class="signup-container">
        <label for="email">이메일</label>
          <input
            name="email"
            type="email"
            class="signup-email"
            minlength="8"
            value="${email?.value ?? ''}"
            required
          />
          <button class="unique-btn" type="button">중복 확인</button>
          <span class="error-msg ${canSubmit ? 'success' : ''}">${email?.errMsg ?? ''}</span>
          <label for="authorname">이름</label>
          <input
            id="authorname"
            name="authorname"
            type="text"
            class="signin-username"
            minlength="2"
            maxlength="5"
            value="${authorname?.value ?? ''}"
            required
          />
          <span class="error-msg">${authorname?.errMsg ?? ''}</span>
          <label for="pwd">비밀번호</label>
          <input
          name="pwd"
            type="password"
            class="signin-pwd"
            minlength="6"
            required
          />
          <span class="error-msg">${pwd?.errMsg ?? ''}</span>
          <label for="confirmPwd">비밀번호 재확인</label>
          <input
            name="confirmPwd"
            type="password"
            class="signin-confirmPwd"
            minlength="6"
            required
          />
          <span class="error-msg">${confirmPwd?.errMsg ?? ''}</span>
          <button type="submit" class="signup-btn" ${canSubmit ? '' : 'disabled="disabled"'}}>회원가입</button>
          <button type="button" class="user-link route" data-route="/signin">로그인</button>
        </div>
      </form>
    `;
  }

  async isUniqueId(e) {
    const emailValid = userSchema.email.valid(e.target.closest('.signup-form').email.value.trim());
    const { value, isErr: isOk } = emailValid;

    if (!isOk) {
      this.setState({
        ...this.state,
        canSubmit: false,
        email: { value, errMsg: emailValid.errMsg },
      });
      return;
    }

    const { data: isUnique } = await axios.post('/api/isUniqueId', { id: emailValid.value });
    const errMsg = isUnique ? '사용가능한 아이디입니다.' : '이미 존재하는 아이디입니다.';

    this.setState({
      ...this.state,
      canSubmit: isUnique,
      email: { value, errMsg },
    });
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async addUser() {
    const {
      email, //
      authorname,
      pwd,
    } = userSchema;

    await axios.post('/api/signup', {
      id: email.value,
      authorname: authorname.value,
      pwd: pwd.value,
    });

    window.history.pushState(null, null, '/signin');
    this.setState();
  }

  validationUser(e) {
    e.preventDefault();

    const signupForm = e.target;
    this.setState({
      email: userSchema.email.valid(signupForm.email.value),
      authorname: userSchema.authorname.valid(signupForm.authorname.value),
      pwd: userSchema.pwd.valid(signupForm.pwd.value),
      confirmPwd: userSchema.confirmPwd.valid(signupForm.pwd.value, signupForm.confirmPwd.value),
    });

    if (userSchema.signupValid) this.addUser();
  }

  emailHandler() {
    if (!this.state?.canSubmit) return;
    this.setState({ email: { value: userSchema.email.value, errMsg: userSchema.email.errMsg }, canSubmit: false });
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signup-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.unique-btn', handler: this.isUniqueId.bind(this) },
      { type: 'input', selector: '.signup-email', handler: this.emailHandler.bind(this) },
    ];
  }
}

export default SignUp;
