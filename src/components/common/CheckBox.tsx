//  Lib
import { useState, useCallback } from "react";
import {
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
} from "@chakra-ui/react";
//  Components
import Tag from "@components/common/Tag";

type ChekboxProps = {
  title: string;
  isChecked?: boolean;
  onChange?: any;
  value?: any;
};

interface ChekboxTagProps extends ChekboxProps {
  isDisabled?: boolean;
  isCustom?: boolean;
  children?: any;
}

const CheckBox = ({ title, isChecked, onChange, value }: ChekboxProps) => {
  return (
    <ChakraCheckbox isChecked={isChecked} onChange={onChange} value={value}>
      {title}
    </ChakraCheckbox>
  );
};

const CheckBoxTag = ({
  title,
  isChecked,
  isDisabled = false,
  onChange,
  value,
}: ChekboxTagProps) => {
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

const CheckboxGroup = ({
  chkboxData,
  chkValue,
  defaultValue = [],
  isDisabled = false,
  onChange,
  variant,
  activeTotal = false,
  parseTotalTxt = "전체",
}: {
  chkboxData: { text: string; value: string | number }[];
  chkValue: (string | number)[];
  defaultValue?: (string | number)[];
  isDisabled?: boolean;
  onChange: (value: (string | number)[]) => void;
  variant?: string;
  activeTotal?: boolean;
  parseTotalTxt?: string;
}) => {
  const total = chkboxData.map((data) => data.value);
  const originLength = chkboxData.length;

  const totalChkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? onChange(total) : onChange([]);
  };

  const chkHandler = (val: (string | number)[]) => {
    const exceptTotal = val.filter((l: string | number) => l !== "total");

    if (
      activeTotal &&
      ((val.length === 1 && val[0] === "total") ||
        exceptTotal.length === originLength)
    ) {
      onChange(total);
    } else {
      onChange(exceptTotal);
    }
  };

  return (
    <ChakraCheckboxGroup
      defaultValue={activeTotal ? ["total"] : defaultValue}
      value={
        activeTotal
          ? chkValue.length === originLength
            ? ["total"]
            : chkValue
          : chkValue
      }
      isDisabled={isDisabled}
      onChange={chkHandler}
      variant={variant}
    >
      {activeTotal && (
        <ChakraCheckbox
          onChange={totalChkHandler}
          key={`check-total`}
          value={"total"}
        >
          {parseTotalTxt}
        </ChakraCheckbox>
      )}
      {chkboxData.map((data: { text: string; value: string | number }) => (
        <ChakraCheckbox key={`check-${data.value}`} value={data.value}>
          {data.text}
        </ChakraCheckbox>
      ))}
    </ChakraCheckboxGroup>
  );
};

export { CheckBox, CheckBoxTag, CheckboxGroup };
