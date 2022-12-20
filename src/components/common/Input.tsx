//  LIB
import { Fragment, useState, useRef, useMemo } from "react";
import {
  chakra,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
//  Util
import { fileXlsxHandler } from "@util/file/manageFile";
import { importDateConverter, exportDateConverter } from "@src/util/time/date";

interface InpProps {
  fieldKey?: string;
  type?: string;
  value?: any;
  _onChange: any;
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

interface InpPwdProps extends InpProps {
  type?: "single" | "chk";
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
  autoComplete?: "on" | "off";
}

interface InpAddonProps extends InpProps {
  groupProps?: {};
  addonText?: string;
  addonType?: string;
  addonProps?: Object;
}

interface InpDateProps extends InpProps {
  type?: "single" | "double";
  value?: { start: string; end: string } | string | undefined;
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
}

interface InpFileProps extends InpProps {
  accept: ".xlsx";
  type: "file";
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
}

const Input = ({
  fieldKey,
  type = "text",
  value,
  _onChange,
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
}: InpProps) => {
  return (
    <ChakraInput
      id={fieldKey}
      type={type}
      value={value}
      onChange={(e: any) => _onChange(e.target.value)}
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
  _onChange,
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
}: InpPwdProps) => {
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
          onChange={(e: any) => _onChange(e.target.value)}
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

const InputDate = ({
  fieldKey,
  type = "single",
  value: date,
  _onChange,
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
}: InpDateProps) => {
  const validate = (startD: any, endD: any) =>
    new Date(startD).getTime() > new Date(endD).getTime();

  const dateHandler = (dateVal: string, both: "start" | "end") => {
    if (typeof date === ("string" || undefined) && type === "single") {
      _onChange(dateVal);
    } else if (typeof date === "object") {
      if (both === "start") {
        _onChange({ start: dateVal, end: date.end });
      } else if (both === "end") {
        _onChange({ start: date.start, end: dateVal });
      }
    }
  };

  return (
    <>
      <ChakraInput
        id={fieldKey}
        type="date"
        value={
          date === undefined
            ? String(new Date())
            : typeof date === "string"
            ? date
            : date.start
        }
        onChange={(e: any) => dateHandler(e.target.value, "start")}
        variant={variant}
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={
          typeof date === "object" && date
            ? validate(date.start, date.end)
            : isInvalid
        }
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        {...rest}
      />
      {type === "double" && typeof date === "object" && (
        <ChakraInput
          id={`${fieldKey}-end`}
          type="date"
          value={date.end === undefined ? String(new Date()) : date.end}
          onChange={(e: any) => dateHandler(e.target.value, "end")}
          variant={variant}
          placeholder={placeholder}
          _placeholder={_placeholder}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          isDisabled={isDisabled}
          isInvalid={validate(date.start, date.end)}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          {...rest}
        />
      )}
    </>
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
}: InpAddonProps) => {
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

const InputFile = ({
  fieldKey,
  accept,
  value,
  _onChange,
  variant,
  inputProps,
  groupProps,
  addonProps,
  btnProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  ...rest
}: InpFileProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadBtnHandler = (e: any) => {
    fileRef.current?.click();
  };

  return (
    <InputGroup {...groupProps} variant={variant}>
      <ChakraInput
        id={fieldKey}
        type="file"
        value={value}
        onChange={(e: any) => fileXlsxHandler(e)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        aria-hidden="true"
        accept={`${accept}`}
        ref={fileRef}
        position="absolute"
        top="50%"
        left={0}
        transform={"translateY(-50%)"}
        p={0}
        pl="100%"
        w="100%"
        opacity={0}
        zIndex={1}
        cursor="pointer"
      />
      <ChakraInput
        id={`${fieldKey}-hidden`}
        type="text"
        value={value}
        placeholder={placeholder}
        _placeholder={_placeholder}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={true}
        isRequired={isRequired}
        aria-hidden="true"
        {...inputProps}
      />
      <InputRightElement {...addonProps}>
        <Button {...btnProps} onClick={uploadBtnHandler}>
          File Upload
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export { Input, InputBtn, InputAddon, InputPwd, InputFile, InputDate };
