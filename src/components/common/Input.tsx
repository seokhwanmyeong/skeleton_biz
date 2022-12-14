//  LIB
import {
  Fragment,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
//  Components
import { Select } from "@components/common/Select";
//  Util
import { importFileXlsx, importFileSave } from "@util/file/manageFile";
import { importDateConverter, exportDateConverter } from "@util/time/date";
//  Services
import { getAddressList } from "@services/address/autoAddressCreator";
//  Type
import { TypeFormCsv } from "@util/data/fileCSV";

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
  accept: ".xlsx, .csv" | ".xlsx";
  form?: TypeFormCsv;
  groupProps?: {};
  addonProps?: {};
  btnProps?: {};
}

interface InpAddressProps extends InpProps {
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
      {...inputProps}
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
}: InpDateProps) => {
  const validate = (startD: any, endD: any) =>
    new Date(startD).getTime() > new Date(endD).getTime();

  const dateHandler = (dateVal: string, both: "start" | "end") => {
    console.log(typeof dateVal);
    console.log(dateVal);
    console.log(typeof date);
    console.log(date);
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
    <Flex gap={2} w="100%">
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
        {...inputProps}
      />
      {type === "double" && typeof date === "object" && (
        <>
          <Flex h="100%" alignItems="center">
            ~
          </Flex>
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
            {...inputProps}
          />
        </>
      )}
    </Flex>
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
  form,
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
  const [fileName, setFileName] = useState("");

  const uploadBtnHandler = (e: any) => {
    fileRef.current?.click();
  };

  return (
    <InputGroup {...groupProps} variant={variant}>
      <ChakraInput
        variant={"fileHidden"}
        id={fieldKey}
        type="file"
        value={value}
        onChange={(e: any) => {
          form
            ? importFileXlsx(e, form)
                .then((res) => {
                  if (res) {
                    const { data, fileName } = res;

                    _onChange(data);
                    setFileName(fileName);
                  }
                })
                .catch((e) => {
                  e.length > 0
                    ? alert(e)
                    : alert(
                        "????????? ????????? ????????????. ???/???/???????????? ??????????????????"
                      );
                })
            : importFileSave(e)
                .then((res) => {
                  if (res) {
                    const { data, fileName } = res;

                    _onChange(data);
                    setFileName(fileName);
                  }
                })
                .catch((e) => {
                  e.length > 0
                    ? alert(e)
                    : alert(
                        "????????? ????????? ????????????. ???/???/???????????? ??????????????????"
                      );
                });
        }}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        aria-hidden="true"
        accept={accept}
        ref={fileRef}
      />
      <ChakraInput
        id={`${fieldKey}-hidden`}
        type="text"
        value={fileName}
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
        <Button variant="inputElement" {...btnProps} onClick={uploadBtnHandler}>
          File Upload
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const InputAddress = ({
  fieldKey,
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
}: InpAddressProps) => {
  const [address, setAddress] = useState("");
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getAddressList(address)
        .then((result: any) => {
          if (Array.isArray(result) && result.length > 0) {
            setList(result);
          }
        })
        .catch((e) => console.log(e));
    }, 500);
    return () => clearTimeout(debounce);
  }, [address]);

  return (
    <InputGroup {...groupProps} variant={variant}>
      <ChakraInput
        id={fieldKey}
        type="text"
        value={value}
        onChange={(e) => setAddress(e.target.value)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      />
      {list?.length > 0 && (
        <Select
          // selectProps={{ position: "absolute" }}
          opBaseTxt="addressName"
          opBaseId="bCode"
          opBaseKey="bCode"
          _onChange={(e: any) => console.log(e.target.value)}
          data={list}
        />
      )}
    </InputGroup>
  );
};

export {
  Input,
  InputBtn,
  InputAddon,
  InputPwd,
  InputFile,
  InputDate,
  InputAddress,
};
