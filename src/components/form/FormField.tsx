//  LIB
import { memo } from "react";
import { Flex, FormControl, FormLabel, Text } from "@chakra-ui/react";
//  Components
import {
  Input,
  InputPwd,
  InputDate,
  InputTotalDate,
  InputFile,
  InputImg,
  InputAddr,
  InputAddon,
  InputBtn,
} from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { CheckboxGroup } from "@components/common/CheckBox";
import { Select, SelectAddr } from "@components/common/Select";

type TypeFieldCate =
  | "text"
  | "number"
  | "date"
  | "dateDbl"
  | "email"
  | "tel"
  | "pwd"
  | "pwdChk"
  | "addr"
  | "chkbox"
  | "radio"
  | "chkbox"
  | "chkTotalbox"
  | "fileXlsx"
  | "img"
  | "slct"
  | "slctAddr"
  | "custom";

type TypeField = {
  type: TypeFieldCate | "bind";
  key: string;
  labelText?: string;
  variant?: string;
  validate?: any;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  values?: {
    text: string;
    value: string | number;
  }[];
  component?: any;
  width?: string;
  element?: {
    type: TypeFieldCate;
    key: string;
    variant?: string;
    validate?: any;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    values?: {
      text: string;
      value: string | number;
    }[];
    component?: any;
    width?: string;
  }[];
};

const FormField = ({
  formType = "submit",
  field,
  setFieldValue,
  _value,
  fieldW = `100%`,
}: {
  formType: "search" | "submit";
  field: TypeField;
  setFieldValue: any;
  _value: any;
  fieldW?: string;
}) => {
  const {
    type: fieldType,
    labelText,
    key: _fieldKey,
    values: _values,
    component,
    variant: variant,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    width,
    element,
  } = field;

  const fieldStyle = {
    w: width ? width : "100%",
    h: "3.6rem",
  };

  const fieldElement = {
    text: (
      <Input
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: string | number) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        inputProps={fieldStyle}
      />
    ),
    number: (
      <Input
        type="number"
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: number) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        inputProps={fieldStyle}
      />
    ),
    date: (
      <InputDate
        type="single"
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: string) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        inputProps={fieldStyle}
      />
    ),
    dateDbl: (
      <InputDate
        type="double"
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: string) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        inputProps={fieldStyle}
      />
    ),
    dateTotalDbl: (
      <InputTotalDate
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: string) => setFieldValue(_fieldKey, val)}
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        inputProps={fieldStyle}
      />
    ),
    email: <></>,
    tel: <></>,
    pwd: (
      <InputPwd
        type="single"
        fieldKey={_fieldKey}
        value={_value}
        onChange={(val: string) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        inputProps={fieldStyle}
      />
    ),
    pwdChk: (
      <InputPwd
        type="chk"
        fieldKey={_fieldKey}
        value={_value}
        onChange={(e: string) => setFieldValue(_fieldKey, e)}
        groupProps={{ size: "md" }}
        addonProps={{ width: "4.5rem" }}
        btnProps={{ h: "1.75rem", size: "sm" }}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
    ),
    addr: (
      <InputAddr
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        fieldKey={_fieldKey}
        value={_value}
        variant="filled"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
    ),
    radio: _values && (
      <RadioBox
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        fieldKey={_fieldKey}
        value={_value}
        values={_values}
        variant={variant}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        radioProps={fieldStyle}
      />
    ),
    chkbox: _values && (
      <CheckboxGroup
        chkboxData={_values}
        chkValue={_value}
        variant={variant}
        defaultValue={[_values[0].value]}
        isDisabled={isDisabled}
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
      />
    ),
    chkTotalbox: _values && (
      <CheckboxGroup
        chkboxData={_values}
        chkValue={_value}
        variant={variant}
        defaultValue={[_values[0].value]}
        isDisabled={isDisabled}
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        activeTotal={true}
      />
    ),
    fileXlsx: (
      <InputFile
        accept=".xlsx, .csv"
        fieldKey={_fieldKey}
        value={_value}
        addonProps={{ width: "auto" }}
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
      />
    ),
    img: (
      <InputImg
        accept=".xlsx, .csv"
        fieldKey={_fieldKey}
        value={_value}
        addonProps={{ width: "auto" }}
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        placeholder="placeHolder"
        _placeholder={{ color: "gray.500" }}
        focusBorderColor="black.100"
        errorBorderColor="red.300"
      />
    ),
    slct: _values && (
      <Select
        selectProps={fieldStyle}
        data={_values}
        opBaseTxt="text"
        opBaseId="value"
        opBaseKey="value"
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        defaultText={_values[0].text}
        defalutValue={_values[0].value}
      />
    ),
    slctAddr: (
      <SelectAddr
        selectProps={fieldStyle}
        value={_value}
        onChange={(val: any) => setFieldValue(_fieldKey, val)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
    ),
    custom: <></>,
    // custom: () => {
    //   return component({
    //     setFieldValue: setFieldValue,
    //     value: value,
    //     key: key,
    //   });
    // },
  };

  return fieldType === "bind" ? null : (
    <FormControl
      as={Flex}
      variant={variant}
      w={fieldW}
      h={"auto"}
      flexDirection="row"
    >
      {labelText && (
        <FormLabel
          minW={formType === "submit" ? "12.5rem" : "8rem"}
          display="flex"
          alignItems="center"
          marginBottom={0}
          htmlFor={_fieldKey}
          gap="0.5rem"
        >
          {formType === "submit" && isRequired && (
            <Text color="red.500">*</Text>
          )}
          {labelText}
        </FormLabel>
      )}
      {fieldElement[fieldType]}
    </FormControl>
  );
};

export default memo(FormField);
export type { TypeField };
