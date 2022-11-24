//  Lib
import React from "react";
import {
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";
import Tag from "@components/common/Tag";

type PropsChekbox = {
  title: string;
  isChecked?: boolean;
  onChange?: any;
  value?: any;
};

type PropsChekboxTag = {
  title: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isCustom?: boolean;
  onChange?: any;
  value?: any;
  children?: any;
};

const CheckBox = (props: PropsChekbox) => {
  const { title, isChecked, onChange, value } = props;
  return (
    <ChakraCheckbox isChecked={isChecked} onChange={onChange} value={value}>
      {title}
    </ChakraCheckbox>
  );
};

const CheckBoxTag = (props: PropsChekboxTag) => {
  const { title, isChecked, isDisabled = false, onChange, value } = props;
  return (
    <ChakraCheckbox
      variant="withTag"
      isChecked={isChecked}
      onChange={onChange}
      value={value}
      isDisabled={isDisabled}
    >
      <Tag
        variant="checkbox"
        key={`tag-${title}`}
        text={title}
        hasBtn={false}
        tagBtn={true}
        isChecked={isChecked}
      />
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

export { CheckBox, CheckBoxTag, CheckboxGroup };
