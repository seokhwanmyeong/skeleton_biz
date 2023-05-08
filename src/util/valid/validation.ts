const emailRegExp = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const pwdRegExp = /^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{6,}$/;
const phoneRegExp = /^[0-9]{0,13}$/;
const numRegExp = /^[0-9]*$/;
const intRegExp = /^$|^(?=.*[1-9])\d+$/;

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
    error = "이메일을 입력해주세요.";
  } else if (!emailRegExp.test(value)) {
    error = "이메일을 다시 확인해주세요.";
  }
  return error;
};

const validatePwd = (value: any) => {
  let error;
  if (!value) {
    error = "비밀번호를 입력해주세요.";
  }
  // else if (!pwdRegExp.test(value)) {
  //   error = "비밀번호 형식을 확인해주세요.";
  // }
  return error;
};

const validateChkCode = (value: any, isChk: boolean) => {
  let error;

  if (!value) {
    error = "입력이 필요합니다";
  } else if (!isChk) {
    error = "중복확인이 필요합니다";
  }

  return error;
};

const validateNeedStr = (value: any) => {
  let error;

  if (!value) {
    error = "입력이 필요합니다";
  }

  return error;
};

const validateRank = (value: "A" | "B" | "C" | "D" | "E", text: string) => {
  let error;

  if (
    !value &&
    (value === "A" ||
      value === "B" ||
      value === "C" ||
      value === "D" ||
      value === "E")
  ) {
    error = "타입을 선택해주세요";
  }

  return error;
};

const validateStoreStatus = (
  value: "open" | "close" | "ready" | "rest" | "etc"
) => {
  let error;

  if (
    !value &&
    (value !== "open" ||
      value !== "close" ||
      value !== "ready" ||
      value !== "rest" ||
      value !== "etc")
  ) {
    error = "상태를 선택해주세요";
  }

  return error;
};

const validatePhone = (value: string) => {
  let error;
  if (!phoneRegExp.test(value)) {
    error = "번호를 확인해주세요";
  }

  return error;
};

const validateNumber = (value: string) => {
  let error;
  if (value && !numRegExp.test(value)) {
    error = "숫자를 확인해주세요";
  }

  return error;
};

const validateInt = (value: string) => {
  let error;
  if (value && !intRegExp.test(value)) {
    error = "숫자를 확인해주세요";
  }

  return error;
};

export {
  phoneRegExp,
  numRegExp,
  intRegExp,
  formValidateDate,
  validateEmail,
  validatePwd,
  validateNeedStr,
  validateRank,
  validateStoreStatus,
  validatePhone,
  validateChkCode,
  validateNumber,
  validateInt,
};
