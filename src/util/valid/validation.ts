const emailRegExp = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const pwdRegExp = /^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{6,}$/;

const formValidateDate = (startD: any, endD: any, key: string | number) => {
  const errors = <{ [key: string | number]: string }>{};

  if (new Date(startD).getTime() > new Date(endD).getTime()) {
    errors[key] = "Required";
  } else {
    errors.email = "Invalid Date";
  }

  return errors;
};

const validateEmail = (value: any) => {
  let error;
  if (!value) {
    error = "이메일을 입력해주세요";
  } else if (!emailRegExp.test(value)) {
    console.log("test");
    error = "이메일 형식이 맞지 않습니다";
  }
  return error;
};

const validatePwd = (value: any) => {
  let error;
  if (!value) {
    error = "비밀번호를 입력해주세요";
  } else if (!pwdRegExp.test(value)) {
    error = "비밀번호 형식이 맞지 않습니다";
  }
  return error;
};

export { formValidateDate, validateEmail, validatePwd };
