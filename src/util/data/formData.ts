/*
List : Form
1. Login
2. Member
3. Brand
4. Erp
5. Map
*/
/* Common Component for Field */

/* 1. Login */
const FormLogin = {};

/* 2. Member */
const FormMember = {};

/* 4. Erp */
const formTest = {
  initialValues: {
    date: "2022-12-15",
    name: "",
    nickname: "",
    age: 0,
    email: "",
    phone: "",
    gender: "man",
    password: "",
    pwdChk: "",
  },
  config: {
    formKey: "test",
    fields: [
      [
        [
          {
            labelText: "Name",
            type: "text",
            key: "name",
            variant: "filled",
            validate: "",
          },
          {
            labelText: "Nick-Name",
            type: "text",
            key: "nickname",
            variant: "filled",
            validate: "",
          },
        ],
        {
          labelText: "Age",
          type: "number",
          key: "age",
          variant: "filled",
          validate: "",
        },
        {
          labelText: "PWD",
          type: "pwd",
          key: "password",
          variant: "filled",
          validate: "",
        },
        {
          labelText: "PWD-Chk",
          type: "pwdChk",
          key: "pwdChk",
          variant: "filled",
          validate: "",
        },
        {
          labelText: "Radio",
          type: "radio",
          key: "gender",
          variant: "filled",
          values: [
            { text: "남성", value: "man" },
            { text: "여성", value: "woman" },
          ],
        },
        {
          labelText: "Date",
          type: "date",
          key: "date",
          variant: "filled",
        },
        {
          labelText: "E-Mail",
          type: "email",
          key: "email",
          variant: "filled",
        },
        {
          labelText: "Phone",
          type: "phone",
          key: "phone",
          variant: "filled",
        },
      ],
      [
        {
          labelText: "Select",
          type: "slct",
          key: "slct",
          variant: "filled",
        },
        {
          labelText: "File",
          type: "file",
          key: "file",
          variant: "filled",
        },
        {
          labelText: "File-CSV",
          type: "fileCsv",
          key: "csv",
          variant: "filled",
        },
        {
          labelText: "IMG",
          type: "fileImg",
          key: "img",
          variant: "filled",
        },
        {
          labelText: "CheckBox",
          type: "chkBox",
          key: "chkBox",
          variant: "filled",
          values: [
            { text: "남성", value: "man" },
            { text: "여성", value: "woman" },
          ],
        },
      ],
    ],
  },
};

export { formTest };
