import axios from 'axios';
import { Component } from '../common';

const signupValid = {
  email: {
    value: '',
    get valid() {
      return /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(this.value) && /.{6,12}/.test(this.value);
    },
    error: '이메일은 영문,숫자인 이메일 형식만 가능합니다.',
  },
  author: {
    value: '',
    get valid() {
      return /^[가-힣|a-z|A-Z|0-9|]{2,5}$/i.test(this.value);
    },
    error: '한글,영문,숫자 2~5자로 구성하세요',
  },
  password: {
    value: '',
    get valid() {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/g.test(this.value);
    },
    error: '비밀번호는 영문,숫자,특수문자를 조합하여(하나씩포함) 6~12자로 구성하세요.',
  },
  password2: {
    value: '',
    get valid() {
      return signupValid.password.value === this.value;
    },
    error: '비밀번호가 일치하지 않습니다.',
  },
  get valid() {
    return (
      signupValid.email.valid && signupValid.author.valid && signupValid.password.valid && signupValid.password2.valid
    );
  },
};

class SignUp extends Component {
  state = {
    isValidationUser: false,
    errMsgs: Array(4).fill(''),
    userInputValues: ['', '', ''],
  };

  email = null;

  author = null;

  password = null;

  password2 = null;

  signupInputs = null;

  render() {
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
            value="${this.state.userInputValues[0]}"
          />
          <span class="errorMsg">${this.state.errMsgs[0]}</span>
          <label for="author">이름</label>
          <input
            id="author"
            name="author"
            type="text"
            class="signin-username"
            minlength="2"
            maxlength="5"
            value="${this.state.userInputValues[1]}"
          />
          <button class="uniqueBtn" type="button">중복 확인</button>
          <span class="errorMsg">${this.state.errMsgs[1]}</span>
          <label for="password">비밀번호</label>
          <input
          name="password"
            type="password"
            class="signin-password"
            minlength="6"
            value="${this.state.userInputValues[2]}"
          />
          <span class="errorMsg">${this.state.errMsgs[2]}</span>
          <label for="password2">비밀번호 재확인</label>
          <input
            name="password2"
            type="password"
            class="signin-password2"
            minlength="6"
          />
          <span class="errorMsg">${this.state.errMsgs[3]}</span>
          <button type="submit" class="signup-btn">회원가입</button>
          <div class="user-link">
            <a href="/signin">로그인</a>
          </div>
        </div>
      </form>
    `;
  }

  setSigninValid(e) {
    // sinupInputs 노드가 이미 존재하면 재할당을 막는다.
    if (!this.signupInputs) this.signupInputs = e.target.querySelectorAll('.signup-container input');

    [...this.signupInputs].forEach($input => {
      this[$input.name] = $input;
      signupValid[$input.name].value = $input.value.trim();
    });
  }

  // input의 값이 조건에 맞지 않다면 해당 input로 focus가 이동한다.(위에서부터 차례로)
  moveFocus() {
    if (!signupValid.email.valid) this.email.focus();
    else if (!signupValid.author.valid) this.author.focus();
    else if (!signupValid.password.valid) this.password.focus();
    else if (!signupValid.password2.valid) this.password2.focus();
  }

  editErrorMsg() {
    return [...this.signupInputs].map($input => {
      if ($input.value.trim() === '') return '필수 정보입니다.';
      if (!signupValid[$input.name].valid) return signupValid[$input.name].error;
      return '';
    });
  }

  // 서버로부터 입력한 이메일과 이름이 존재하는지 확인하고 없다면 postUser를 호출한다.
  async getUser(id, author) {
    const { data } = await axios.post('/signup', { id, author });
    if (data === '' && signupValid.valid) this.postUser();
  }

  async isUniqueId(id) {
    const { data } = await axios.post('/isUniqueId', { id });
    if (data === '' && signupValid.valid) this.postUser();
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async postUser() {
    const {
      email, //
      author,
      password,
    } = signupValid;

    await axios.post('/signup', {
      id: email.value,
      author: author.value,
      pwd: password.value,
    });
  }

  validationUser(e) {
    e.preventDefault();

    this.setSigninValid(e);
    this.moveFocus();
    this.getUser(signupValid.email.value, signupValid.author.value);
    this.setState({
      isValidationUser: signupValid.valid,
      errMsgs: this.editErrorMsg(),
      userInputValues: [this.email.value, this.author.value, this.password.value],
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
