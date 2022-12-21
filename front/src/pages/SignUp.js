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
    const pwd2 = this.state?.pwd2;

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
          <label for="pwd2">비밀번호 재확인</label>
          <input
            name="pwd2"
            type="password"
            class="signin-pwd2"
            minlength="6"
            required
          />
          <span class="error-msg">${pwd2?.errMsg ?? ''}</span>
          <button type="submit" class="signup-btn" ${canSubmit ? '' : 'disabled="disabled"'}}>회원가입</button>
          <div class="user-link">
            <a href="/signin">로그인</a>
          </div>
        </div>
      </form>
    `;
  }

  async isUniqueId(e) {
    const email = e.target.previousElementSibling.value.trim();
    const emailVald = userSchema.email.valid(email);
    const { data } = await axios.post('/api/isUniqueId', { id: email });
    const errMsg = !emailVald.isErr
      ? emailVald.errMsg
      : data
      ? '사용가능한 아이디입니다.'
      : '이미 존재하는 아이디입니다.';

    this.setState({
      ...this.state,
      canSubmit: emailVald.isErr ? data : false,
      email: { value: email, errMsg },
    });
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async postUser() {
    const {
      email, //
      authorname,
      pwd,
    } = this.userSchema;

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
      pwd2: userSchema.pwd2.valid(signupForm.pwd2.value),
    });

    if (userSchema.signupValid) this.postUser();
  }

  emailInput(e) {
    if (!this.state?.canSubmit) return;
    this.setState({ email: { value: e.target.value, errMsg: this.state.email.errMsg }, canSubmit: false });
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signup-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.unique-btn', handler: this.isUniqueId.bind(this) },
      { type: 'input', selector: '.signup-email', handler: this.emailInput.bind(this) },
    ];
  }
}

export default SignUp;
