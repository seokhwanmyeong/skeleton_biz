import React from "react";
import FormSample from "@components/form/FormSample";
import { Flex } from "@chakra-ui/react";

type Props = {};

const formTest = {
  initVal: {
    date: "2022-12-14",
    dateDbl: {
      start: "2022-12-14",
      end: "2022-12-16",
    },
    name: "",
    nickname: "",
    age: 0,
    email: "",
    phone: "",
    gender: "man",
    password: "",
    pwdChk: "",
  },
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
        labelText: "DateDBL",
        type: "dateDbl",
        key: "dateDbl",
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
        labelText: "File-Xlsx",
        type: "fileXlsx",
        key: "fileXlsx",
        variant: "filled",
      },
      {
        labelText: "File-IMG",
        type: "fileImg",
        key: "fileImg",
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
};

const ErpForm = (props: Props) => {
  const onSubmitTest = (val: any) => {
    console.log("Result Form", val);
  };

  return (
    <Flex>
      <FormSample form={formTest} onSubmit={onSubmitTest} />
    </Flex>
  );
};

export default ErpForm;
