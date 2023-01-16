//  LIB
import { useState, useRef, useEffect } from "react";
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Button,
  Flex,
  Radio,
  Text,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import DaumPostcode from "react-daum-postcode";
//  Components
import { Select } from "@components/common/Select";
//  Icons
import { IconDownload, IconFileAdd } from "@assets/icons/icon";
//  Util
import { importFileXlsx, importFileSave } from "@util/file/manageFile";
import { importDateConverter, exportDateConverter } from "@util/time/date";
//  Services
import { getAddressList } from "@services/address/autoAddressCreator";
//  Type
import { TypeFormCsv } from "@util/data/fileCSV";
import dayjs from "dayjs";

interface InpProps {
  fieldKey?: string;
  type?: string;
  value?: any;
  onChange: any;
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
  onChange,
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
      onChange={(e: any) => onChange(e.target.value)}
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
  onChange,
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
  variant,
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
          value={value}
          variant={variant}
          onChange={(e: any) => onChange(e.target.value)}
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
          {...inputProps}
        />
        <InputRightElement
          right="-1px"
          borderRadius="md"
          w="6rem"
          h="100%"
          {...addonProps}
        >
          <Button
            w="100%"
            h="100%"
            borderLeftRadius="0"
            borderRightRadius="md"
            {...btnProps}
            onClick={handleClick}
          >
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
  onChange,
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
    if (typeof date === ("string" || undefined) && type === "single") {
      onChange(dateVal);
    } else if (typeof date === "object") {
      if (both === "start") {
        onChange({ start: dateVal, end: date.end });
      } else if (both === "end") {
        onChange({ start: date.start, end: dateVal });
      }
    }
  };

  return (
    <Flex gap={2} w="100%" alignItems="center">
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
          <Flex>~</Flex>
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

const InputTotalDate = ({
  fieldKey,
  value,
  onChange,
  inputProps,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: any) => {
  return (
    <Flex gap="1rem">
      <Radio
        key={`radio-date-total`}
        value={"total"}
        isChecked={value === "total"}
        onChange={() => {
          onChange("total");
        }}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        w="max-content"
      >
        전체기간
      </Radio>
      <Radio
        key={`radio-date-duration`}
        onChange={() => {
          onChange(
            value !== "total"
              ? value
              : {
                  start: dayjs().format("YYYY-MM-DD"),
                  end: dayjs().format("YYYY-MM-DD"),
                }
          );
        }}
        isChecked={value !== "total"}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        <InputDate
          type="double"
          fieldKey={fieldKey}
          value={
            value !== "total"
              ? value
              : {
                  start: dayjs().format("YYYY-MM-DD"),
                  end: dayjs().format("YYYY-MM-DD"),
                }
          }
          onChange={onChange}
          placeholder=""
          _placeholder={_placeholder}
          inputProps={inputProps}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
        />
      </Radio>
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
  onChange,
  groupProps,
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

  return (
    <Flex
      {...groupProps}
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="0"
      w="100%"
      h="30rem"
      bgColor="primary.main.bg"
      border="1px dashed"
      borderColor="primary.main.bdColor"
      borderRadius="base"
    >
      <ChakraInput
        variant="fileHidden"
        id={`${fieldKey}-hidden`}
        type="file"
        value={value}
        onChange={(e: any) => {
          form
            ? importFileXlsx(e, form)
                .then((res) => {
                  if (res) {
                    const { data, fileName } = res;

                    onChange(data);
                    setFileName(fileName);
                  }
                })
                .catch((e) => {
                  e.length > 0
                    ? alert(e)
                    : alert(
                        "파일에 오류가 있습니다. 행/열/필수값을 확인해주세요"
                      );
                })
            : importFileSave(e)
                .then((res) => {
                  if (res) {
                    const { data, fileName } = res;

                    onChange(data);
                    setFileName(fileName);
                  }
                })
                .catch((e) => {
                  e.length > 0
                    ? alert(e)
                    : alert(
                        "파일에 오류가 있습니다. 행/열/필수값을 확인해주세요"
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
      <IconDownload boxSize="4rem" mb="1rem" />
      {fileName ? (
        <Text mb="0.5rem">{fileName}</Text>
      ) : (
        <Text mb="0.5rem">파일을 드래그 해보세요.</Text>
      )}
      <Text mb="2rem">파일 형식 제한없음 (최대 40MB)</Text>
      <Button
        variant="reverse"
        onClick={(e) => {
          e.stopPropagation();
          fileRef.current?.click();
        }}
        zIndex="2"
        gap="0.5rem"
      >
        <IconFileAdd />
        파일 등록하기
      </Button>
    </Flex>
  );
};

const InputImg = ({
  fieldKey,
  form,
  value,
  onChange,
  groupProps,
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

  const uploadBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    fileRef.current?.click();
  };

  return (
    <Flex
      {...groupProps}
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="0"
      w="100%"
      h="30rem"
      bgColor="primary.main.bg"
      border="1px dashed"
      borderColor="primary.main.bdColor"
      borderRadius="base"
    >
      <ChakraInput
        variant="fileHidden"
        id={`${fieldKey}-hidden`}
        type="file"
        value={value}
        onChange={(e: any) => {}}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        aria-hidden="true"
        accept={".jpg, .png"}
        ref={fileRef}
      />
      <IconDownload boxSize="4rem" mb="1rem" />
      {fileName ? (
        <Text mb="0.5rem">{fileName}</Text>
      ) : (
        <Text mb="0.5rem">이미지를 드래그 해보세요.</Text>
      )}
      <Text mb="2rem">이미지 형식: jpg/png (최대 500kb)</Text>
      <Button
        variant="reverse"
        onClick={uploadBtnHandler}
        zIndex="2"
        gap="0.5rem"
      >
        <IconFileAdd />
        이미지 등록하기
      </Button>
    </Flex>
  );
};

const InputAddr = ({
  fieldKey,
  value,
  onChange,
  variant,
  inputProps,
  groupProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
}: InpAddressProps) => {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addressHandler = () => {
    onChange();
  };
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onChange(fullAddress);
    onClose();
  };

  // const handleSearch = (data) => {
  //   console.log(data);
  // };

  return (
    <Flex w="100%" h="100%">
      <Button w="100%" h="3.6rem" onClick={onOpen}>
        {value}
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="auto" maxW="auto">
          <ModalBody p="0" borderRadius="base" overflow="hidden">
            <DaumPostcode onComplete={handleComplete} />
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </Flex>
  );
};

export {
  Input,
  InputBtn,
  InputAddon,
  InputPwd,
  InputDate,
  InputTotalDate,
  InputFile,
  InputImg,
  InputAddr,
};
