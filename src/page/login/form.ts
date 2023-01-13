const formLogin = {
  initVal: {
    username: "",
    password: "",
  },
  formKey: "test",
  fields: [
    [
      {
        labelText: "ID",
        type: "text",
        key: "username",
        isRequired: true,
      },
      {
        labelText: "Password",
        type: "pwd",
        key: "password",
        isRequired: true,
      },
    ],
  ],
};

export { formLogin };
