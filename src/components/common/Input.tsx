import { useState } from "react";
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

type Props = {
  base: {
    placeholder?: string;
    _placeholder?: Object;
    focusBorderColor?: string;
    errorBorderColor?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    [x: string]: any;
  };
  transType: {
    placeholder?: string;
    _placeholder?: Object;
    focusBorderColor?: string;
    errorBorderColor?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    [x: string]: any;
  };
  addon: {
    placeholder?: string;
    _placeholder?: Object;
    focusBorderColor?: string;
    errorBorderColor?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    addonType?: string;
    addonProps?: Object;
    [x: string]: any;
  };
};

const Input = (props: Props["base"]) => {
  const {
    placeholder,
    _placeholder,
    focusBorderColor,
    errorBorderColor,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    ...rest
  } = props;

  return (
    <ChakraInput
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

const InputPwd = (props: any) => {
  const {
    groupProps,
    addonProps,
    btnProps,
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
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
        type={show ? "text" : "password"}
      />
      <InputRightElement {...addonProps}>
        <Button {...btnProps} onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const InputAddon = (props: Props["addon"]) => {
  const {
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
  } = props;

  return (
    <InputGroup {...groupProps}>
      {addonType === "left" && (
        <InputLeftAddon children={addonText} {...addonProps} />
      )}
      <Input
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
