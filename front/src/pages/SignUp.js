import axios from 'axios';
import userValidation from '../lib/userValidation';

import { Component } from '../common';

class SignUp extends Component {
  userValidation = userValidation();

  render() {
    const canSubmit = this.state?.canSubmit ?? false;

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
            minlength="8"
            value="${this.state?.email?.value ?? ''}"
            required
          />
          <button class="uniqueBtn" type="button">${canSubmit ? '사용 가능한 이메일' : '중복 확인'}</button>
          <span class="errorMsg ${canSubmit ? 'success' : ''}">${this.state?.email?.errMsg ?? ''}</span>
          <label for="authorname">이름</label>
          <input
            id="authorname"
            name="authorname"
            type="text"
            class="signin-username"
            minlength="2"
            maxlength="5"
            value="${this.state?.authorname?.value ?? ''}"
            required
          />
        
          <span class="errorMsg">${this.state?.authorname?.errMsg ?? ''}</span>
          <label for="pwd">비밀번호</label>
          <input
          name="pwd"
            type="password"
            class="signin-pwd"
            minlength="6"
            required?
          />
          <span class="errorMsg">${this.state?.pwd?.errMsg ?? ''}</span>
          <label for="pwd2">비밀번호 재확인</label>
          <input
            name="pwd2"
            type="password"
            class="signin-pwd2"
            minlength="6"
            required
          />
          <span class="errorMsg">${this.state?.pwd2?.errMsg ?? ''}</span>
          <button type="submit" class="signup-btn" ${canSubmit ? '' : 'disabled="disabled"'}}>회원가입</button>
          <div class="user-link">
            <a href="/signin">로그인</a>
          </div>
        </div>
      </form>
    `;
  }

  // input의 값이 조건에 맞지 않다면 해당 input로 focus가 이동한다.(위에서부터 차례로)
  moveFocus() {
    if (!this.userValidation.email.valid) this.email.focus();
    else if (!this.userValidation.authorname.valid) this.authorname.focus();
    else if (!this.userValidation.pwd.valid) this.pwd.focus();
    else if (!this.userValidation.pwd2.valid) this.pwd2.focus();
  }

  async isUniqueId(e) {
    const email = e.target.closest('form').email.value.trim();
    const { data } = await axios.post('/isUniqueId', { id: email });
    this.setState({
      ...this.state,
      canSubmit: data,
      email: { value: email, errMsg: data ? '사용가능한 아이디입니다.' : '이미 존재하는 아이디입니다.' },
    });
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async postUser() {
    const {
      email, //
      authorname,
      pwd,
    } = this.userValidation;

    await axios.post('/signup', {
      id: email.value,
      authorname: authorname.value,
      pwd: pwd.value,
    });

    window.history.pushState(null, null, '/signin');
    this.setState({});
  }

  validationUser(e) {
    e.preventDefault();

    // 노드객체를 기억, this.uservalidation에 값을 넣어준다.
    // [...e.target.querySelectorAll('.signup-container input')].forEach($input => {
    //   this[$input.name] = $input;
    //   this.userValidation[$input.name].value = $input.value.trim();
    // });

    // this.moveFocus();

    // this.getUser(this.userValidation.email.value, this.userValidation.authorname.value);
    // 이메일 중복을 확인하고, 중복이면

    const signupForm = e.target;
    this.setState({
      email: this.userValidation.email.valid(signupForm.email.value),
      authorname: this.userValidation.authorname.valid(signupForm.authorname.value),
      pwd: this.userValidation.pwd.valid(signupForm.pwd.value),
      pwd2: this.userValidation.pwd2.valid(signupForm.pwd2.value),
    });
    if (this.userValidation.signupValid) this.postUser();
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signup-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.uniqueBtn', handler: this.isUniqueId.bind(this) },
    ];
  }
}

export default SignUp;
