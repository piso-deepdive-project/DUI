export default () => {
  const userValidation = {
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
          errMsg: email === '' ? userValidation.requireMsg : this._valid ? '' : this.error,
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
        console.log(authorname);
        console.log(this.isValid(this.value));
        return {
          value: this.value,
          errMsg: authorname === '' ? userValidation.requireMsg : this._valid ? '' : this.error,
        };
      },

      error: '한글,영문,숫자 2~5자로 구성하세요',
    },

    pwd: {
      value: '',
      isValid: pwd => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/g.test(pwd),
      _valid: false,
      valid(pwd) {
        this.value = pwd;
        this._valid = this.isValid(pwd);

        return {
          errMsg: this._valid ? '' : this.error,
        };
      },

      error: '비밀번호는 영문,숫자,특수문자를 조합하여(하나씩포함) 6~12자로 구성하세요.',
    },

    pwd2: {
      isValid: pwd2 => userValidation.pwd.value === pwd2,
      _valid: false,
      valid(pwd2) {
        this._valid = this.isValid(pwd2);
        return {
          errMsg: pwd2 === '' ? userValidation.requireMsg : this._valid ? '' : this.error,
        };
      },

      error: '비밀번호가 일치하지 않습니다.',
    },

    get signupValid() {
      return (
        userValidation.email._valid &&
        userValidation.authorname._valid &&
        userValidation.pwd._valid &&
        userValidation.pwd2._valid
      );
    },

    get signinValid() {
      return userValidation.email._valid && userValidation.pwd._valid;
    },
  };
  return userValidation;
};
