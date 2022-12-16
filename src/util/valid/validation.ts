const formValidateDate = (startD: any, endD: any, key: string | number) => {
  const errors = <{ [key: string | number]: string }>{};

  if (new Date(startD).getTime() > new Date(endD).getTime()) {
    errors[key] = "Required";
  } else {
    errors.email = "Invalid Date";
  }

  return errors;
};

export { formValidateDate };
