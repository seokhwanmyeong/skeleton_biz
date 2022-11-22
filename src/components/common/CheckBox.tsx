//  Lib
import React from "react";
import {
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";

type PropsChekbox = {
  title: string;
  isChecked?: boolean;
  onChange?: any;
  value?: any;
};

const CheckBox = (props: PropsChekbox) => {
  const { title, isChecked, onChange, value } = props;
  return (
    <ChakraCheckbox isChecked={isChecked} onChange={onChange} value={value}>
      {title}
    </ChakraCheckbox>
  );
};

const CheckboxGroup = (props: any) => {
  const { checkboxData } = props;
  return (
    <ChakraCheckboxGroup>
      {checkboxData.map((title: string) => {
        console.log(title);
        return <ChakraCheckbox key={`check-${title}`}>{title}</ChakraCheckbox>;
      })}
    </ChakraCheckboxGroup>
  );
};

export { CheckBox, CheckboxGroup };
