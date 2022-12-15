import { Fragment, useState } from "react";
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

interface InputProps {
  fieldKey?: string;
  type?: string;
  value?: any;
  setFieldValue: any;
  variant?: string;
  inputProps?: {};
  placeholder?: string;
  _placeholder?: Object;
  focusBorderColor?: string;
  errorBorderColor?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

interface PropsPwd extends InputProps {
  type?: "single" | "chk";
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
  autoComplete?: "on" | "off";
}

interface PropsAddon extends InputProps {
  groupProps?: {};
  addonText?: string;
  addonType?: string;
  addonProps?: Object;
}

interface PropsNum extends InputProps {
  value: number;
}

const Input = ({
  fieldKey,
  type = "text",
  value,
  setFieldValue,
  variant,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...rest
}: InputProps) => {
  return (
    <ChakraInput
      id={fieldKey}
      type={type}
      value={value}
      onChange={(e: any) => setFieldValue(fieldKey, e.target.value)}
      variant={variant}
      placeholder={placeholder}
      _placeholder={_placeholder}
      focusBorderColor={focusBorderColor}
      errorBorderColor={errorBorderColor}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      {...rest}
    />
  );
};

const InputPwd = ({
  fieldKey,
  type = "single",
  value,
  setFieldValue,
  groupProps,
  addonProps,
  btnProps,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  variant = "filled",
  autoComplete = "off",
}: PropsPwd) => {
  const [show, setShow] = useState(false);
  const [chkVal, setChkVal] = useState(undefined);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup {...groupProps} variant={variant}>
        <ChakraInput
          id={fieldKey}
          {...inputProps}
          value={value}
          onChange={(e: any) => setFieldValue(fieldKey, e.target.value)}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
        />
        <InputRightElement {...addonProps}>
          <Button {...btnProps} onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {type === "chk" && (
        <ChakraInput
          {...inputProps}
          id={`${fieldKey}-chk`}
          onChange={(e: any) => setChkVal(e.target.value)}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={chkVal === undefined ? false : chkVal !== value}
          isReadOnly={isReadOnly}
          isRequired={true}
          autoComplete="off"
        />
      )}
    </>
  );
};

const InputPhone = () => {};

const InputEmail = () => {};

const InputDate = () => {};

const InputBtn = (props: any) => {
  const {
    groupProps,
    addonProps,
    btnProps,
    btnText,
    event,
    inputProps,
    placeholder,
    _placeholder,
    focusBorderColor,
    errorBorderColor,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
  } = props;

  return (
    <InputGroup {...groupProps}>
      <Input
        {...inputProps}
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
      <InputRightElement {...addonProps}>
        <Button {...btnProps} onClick={event}>
          {btnText}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const InputAddon = ({
  groupProps,
  addonProps,
  addonType = "left", // left, right
  addonText,
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
}: PropsAddon) => {
  return (
    <InputGroup {...groupProps}>
      {addonType === "left" && (
        <InputLeftAddon children={addonText} {...addonProps} />
      )}
      <ChakraInput
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        {...inputProps}
      />
      {addonType === "right" && (
        <InputRightAddon children={addonText} {...addonProps} />
      )}
    </InputGroup>
  );
};

export { Input, InputBtn, InputAddon, InputPwd };
