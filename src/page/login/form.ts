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
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "Password",
        type: "pwd",
        key: "password",
        variant: "filled",
        isRequired: true,
      },
    ],
  ],
};

export { formLogin };
