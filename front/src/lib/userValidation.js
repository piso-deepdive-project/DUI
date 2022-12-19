const userValidation = {
  email: {
    value: '',
    get valid() {
      return /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(this.value) && /.{6,12}/.test(this.value);
    },
    error: '이메일은 영문,숫자인 이메일 형식만 가능합니다.',
  },

  authorname: {
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
      return userValidation.password.value === this.value;
    },
    error: '비밀번호가 일치하지 않습니다.',
  },

  get signupValid() {
    return (
      userValidation.email.valid &&
      userValidation.author.valid &&
      userValidation.password.valid &&
      userValidation.password2.valid
    );
  },

  get signinValid() {
    return userValidation.email.valid && userValidation.password.valid;
  },
};

export default userValidation;
