//  LIB
import { useState, useRef } from "react";
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
  ModalBody,
  useDisclosure,
  List,
  ListItem,
  Image,
} from "@chakra-ui/react";
import DaumPostcode from "react-daum-postcode";
//  Icons
import { IconDownload, IconFileAdd, IcoSearch } from "@assets/icons/icon";
//  Util
import {
  importFileXlsx,
  importFileSave,
  importFileImg,
} from "@util/file/manageFile";
import { importDateConverter, exportDateConverter } from "@util/time/date";
import resizer from "@util/file/resizer";
import dayjs from "dayjs";
//  Services
import { getAddressList } from "@services/address/autoAddressCreator";
//  Type
import { TypeFormCsv } from "@util/data/fileCSV";
//  Components
import { IcoBtnEye } from "@components/common/Btn";

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
  variant = "base",
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
  inputProps,
  placeholder,
  _placeholder,
  focusBorderColor,
  errorBorderColor,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  variant = "pwd",
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
        <InputRightElement w="2.5rem" h="100%" {...addonProps}>
          <IcoBtnEye isShow={show} onClick={handleClick} />
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
      <Flex w="100%">
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
      </Flex>
      {type === "double" && typeof date === "object" && (
        <>
          <Flex>~</Flex>
          <Flex w="100%">
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
          </Flex>
        </>
      )}
    </Flex>
  );
};

const InputTotalDate = ({
  fieldKey,
  variant = "search",
  value,
  onChange,
  groupProps,
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
    <Flex gap="1rem" {...groupProps}>
      <Radio
        key={`radio-date-total`}
        variant={variant}
        value={"total"}
        isChecked={value === "total"}
        onChange={() => {
          onChange("total");
        }}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        전체기간
      </Radio>
      <Radio
        key={`radio-date-duration`}
        variant={variant}
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
          variant={variant}
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
          isDisabled={value === "total"}
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
    <>
      <Flex
        {...groupProps}
        position="relative"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb="0.5rem"
        p="0"
        w="24.375rem"
        h="9.375rem"
        bgColor="#FAFAFA"
        border="1px dashed"
        borderColor="primary.main.bdColor"
        borderRadius="8px"
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
        <IconDownload
          w="3rem"
          h="3rem"
          boxSize="4rem"
          mb="1rem"
          color="primary.type7"
        />
        <Text
          mb="0.5rem"
          textStyle="base"
          fontWeight="strong"
          fontSize="md"
          lineHeight="1.5rem"
          color="font.secondary"
        >
          클릭 또는 드래그하여 파일을 업로드하세요.
        </Text>
        <Text
          textStyle="base"
          fontWeight="regular"
          fontSize="xs"
          lineHeight="1.375rem"
          color="font.secondary"
        >
          파일 형식 제한없음 (최대 40MB)
        </Text>
        {/* <Button
          onClick={(e) => {
            e.stopPropagation();
            fileRef.current?.click();
          }}
          zIndex="2"
          gap="0.5rem"
        >
          <IconFileAdd />
          파일 등록하기
        </Button> */}
      </Flex>
      {fileName && (
        <Text
          mb="0.5rem"
          fontSize="sm"
          lineHeight="1.375rem"
          color="primary.type7"
        >
          {fileName}
        </Text>
      )}
    </>
  );
};

const InputImg = ({
  isSimple = false,
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
}: any) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectImg, setSelectImg] = useState<number>(0);
  const [imgList, setImgList] = useState<any[] | never[]>([]);
  console.log(value);
  const uploadBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    fileRef.current?.click();
  };

  return (
    <Flex
      flexDirection="column"
      gap="1rem"
      w={isSimple ? "85px" : "100%"}
      h={isSimple ? "85px" : "100%"}
      borderRadius="base"
      border="1px dashed #D9D9D9"
      bgColor="#FAFAFA"
    >
      <Flex
        {...groupProps}
        position="relative"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="0"
        w="100%"
        h={isSimple ? "100%" : "auto"}
        minH={isSimple ? "30%" : "13rem"}
        border="0"
      >
        {imgList.length > 0 && (
          <Image
            src={imgList[selectImg]}
            alt=""
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="100%"
            h="100%"
            opacity={1}
            borderRadius="base"
            border="none"
            transition="0.3s"
          />
        )}
        <ChakraInput
          variant="fileHidden"
          id={`${fieldKey}-hidden`}
          type="file"
          value={value}
          multiple
          onChange={async (e: any) => {
            const fileList = [...e.target.files];

            if (imgList?.length + fileList.length < 4) {
              const list = await importFileImg([...e.target.files]);
              setSelectImg(0);
              setImgList([...imgList, ...list]);
              // onChange([...imgList, ...list]);
            } else {
              alert("이미지는 최대 3개까지 가능합니다");
            }
          }}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          aria-hidden="true"
          accept={".jpg, .png"}
          ref={fileRef}
        />
        <IconDownload
          pt="1rem"
          width={isSimple ? "1rem" : "50%"}
          height={isSimple ? "1rem" : "50%"}
          mb={isSimple ? "0" : "1rem"}
          color="font.title"
          boxSize="4rem"
        />
        <Text mb="0.5rem" color="font.primary">
          {isSimple ? "Upload" : "이미지를 드래그 해보세요."}
        </Text>
        {!isSimple && (
          <Text color="font.primary">이미지 형식: jpg/png (최대 500kb)</Text>
        )}
        {/* <Button onClick={uploadBtnHandler} zIndex="2" gap="0.5rem">
          <IconFileAdd />
          이미지 등록하기
        </Button> */}
      </Flex>
      {imgList.length > 0 && (
        <List display="flex" w="100%" justifyContent="center" gap="3rem">
          {imgList.map((img: any, idx: number) => (
            <ListItem
              key={`img-${idx}`}
              onClick={() => setSelectImg(idx)}
              position="relative"
              outline={idx === selectImg ? "1px solid" : "none"}
              p="0.5rem"
              cursor="pointer"
              transition="0.3s"
              _hover={{
                outline: "1px solid",
              }}
            >
              <Image
                src={img}
                w="5rem"
                h="4rem"
                transition="0.3s"
                borderRadius="base"
              />
              <Button
                position="absolute"
                top={0}
                right={0}
                w="2rem"
                h="2rem"
                p="0"
                onClick={(e) => {
                  e.stopPropagation();
                  const newArr = [...imgList];
                  newArr.splice(idx, 1);
                  setSelectImg(0);
                  setImgList(newArr);
                  // onChange(newArr);
                }}
              >
                X
              </Button>
              {/* <a href={img} download>
                이미지 {idx}
              </a> */}
            </ListItem>
          ))}
        </List>
      )}
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
    <Flex minW={0} w="100%" h="100%" gap="0.25rem">
      <Input
        variant={variant}
        isDisabled={true}
        value={value}
        onChange={() => {}}
      />
      <Button isDisabled={isDisabled} variant="search" onClick={onOpen}>
        <IcoSearch w="0.875rem" h="0.875rem" />
        검색
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="auto" maxW="auto">
          <ModalBody
            p="0"
            w="30vw"
            h="40vh"
            borderRadius="base"
            overflow="hidden"
          >
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
