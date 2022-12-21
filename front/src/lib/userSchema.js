const userSchema = {
  requireMsg: '이메일을 입력하세요..',

  email: {
    value: '',
    isValid: email => /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(email) && /.{6,12}/.test(email),
    _valid: false,

    valid(email) {
      this.value = email;
      this._valid = this.isValid(this.value);

      return {
        value: this.value,
        isErr: this._valid,
        errMsg: email === '' ? userSchema.requireMsg : this._valid ? '' : this.error,
      };
    },
    error: '이메일은 영문,숫자인 이메일 형식만 가능합니다.',
  },

  authorname: {
    value: '',
    isValid: authorname => /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,5}$/i.test(authorname),

    _valid: false,
    valid(authorname) {
      this.value = authorname;
      this._valid = this.isValid(this.value);

      return {
        value: this.value,
        errMsg: authorname === '' ? userSchema.requireMsg : this._valid ? '' : this.error,
      };
    },

    error: '한글,영문,숫자 2~5자로 구성하세요',
  },

  pwd: {
    isValid: pwd => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/g.test(pwd),
    _valid: false,

    valid(pwd) {
      this._valid = this.isValid(pwd);

      return {
        isErr: this._valid,
        errMsg: this._valid ? '' : this.error,
      };
    },

    error: '비밀번호는 영문,숫자,특수문자를 조합하여(하나씩포함) 6~12자로 구성하세요.',
  },

  confirmPwd: {
    isValid: (pwd, confirmPwd) => pwd === confirmPwd,
    _valid: false,

    valid(pwd, confirmPwd) {
      this._valid = this.isValid(pwd, confirmPwd);
      return {
        errMsg: confirmPwd === '' ? userSchema.requireMsg : this._valid ? '' : this.error,
      };
    },

    error: '비밀번호가 일치하지 않습니다.',
  },

  get signupValid() {
    return (
      userSchema.email._valid && userSchema.authorname._valid && userSchema.pwd._valid && userSchema.confirmPwd._valid
    );
  },

  get signinValid() {
    return userSchema.email._valid && userSchema.pwd._valid;
  },
};

export default userSchema;
