import { Component } from '../common';

class Signin extends Component {
  render() {
    return `
      <nav class="p-8 text-center text-3xl flex flex-row justify-between items-center">
        <ul class="flex flex-row gap-4 text-main p-4">
          <li><a href="/index.html">DUI Post</a></li>
        </ul>
      </nav>
      <article class="signin-container">
        <h1 class="title">SIGNIN</h1>
        <form class="signin-form">
          <input
            type="email"
            class="signin-userid"
            minlength="8"
            placeholder="이메일"
          />
          <input
            type="password"
            class="signin-password"
            minlength="5"
            placeholder="비밀번호"
          />
          <a href="/index.html" class="signin-link">로그인</a>
          <div class="user-link">
            <a href="/signup.html">회원가입</a>
          </div>
        </form>
      </article>
    `;
  }
}

export default Signin;
