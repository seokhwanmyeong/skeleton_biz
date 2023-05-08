//  Lib
import { Fragment, forwardRef, useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  IconButton,
  Tooltip,
  useDisclosure,
  ListItem,
  List,
  Button,
  Input,
} from "@chakra-ui/react";
//  Component
import { SelectBsDisLayer } from "@components/common/Select";
//  API
import { apiCommon } from "@api/biz/config";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Util
import {
  validateChkCode,
  validateNeedStr,
  validateRank,
} from "@util/valid/validation";
//  Icon
import { IcoClose, IcoSearch } from "@assets/icons/icon";

const FormBsnsD = forwardRef(
  (
    props: {
      initVal: any;
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, update = false, fixMode = false, setValues } = props;
    const { pathType, path, center } = useRecoilValue(atomCreateArea);
    const { checkCode, getAvailableStoreLink } = apiCommon;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchText, setSearchText] = useState<string>("");
    const [searchLi, setSearchLi] = useState<any[]>([]);
    const [isChckId, setIsChKId] = useState<{
      text: string;
      chk: boolean;
      state: "duple" | "pass" | "notWork" | "ready";
    }>({
      text: "",
      chk: false,
      state: "ready",
    });

    const updateTypeHandler = (
      setFieldValue: any,
      setFieldTouched: any,
      type: string
    ) => {
      setFieldValue("bsDisType", type);
      setTimeout(() => setFieldTouched("bsDisType", true));
    };

    useEffect(() => {
      if (searchLi && searchLi.length > 0) onOpen();
    }, [searchLi]);

    return (
      <Flex
        h="100%"
        direction="column"
        overflowY="scroll"
        __css={{
          "::-webkit-scrollbar": {
            w: "3px",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "5",
            bg: `bg.primary`,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          isOpen && onClose();
        }}
      >
        <Formik
          key="bsnsDisEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values);
            setValues(values);
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Form
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmit();
                }}
                style={{ width: "100%" }}
              >
                <Flex
                  position="relative"
                  mb="1.25rem"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                  gap="1.875rem"
                >
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="상권명" need={true} />
                    <Field name="bsDisName" validate={validateNeedStr}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.bsDisName && form.touched.bsDisName
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="상권 명을 입력하세요."
                            isRequired={true}
                            {...field}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    direction="column"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <Flex w="100%">
                      <EditorLabel text="상권코드" need={true} />
                      <Flex gap="0.5rem">
                        <Field
                          name="bsDisCode"
                          validate={(val: any) =>
                            validateChkCode(val, isChckId.chk)
                          }
                        >
                          {({ field, form }: any) => (
                            <Fragment>
                              <FormControl
                                isInvalid={
                                  form.errors.bsDisCode &&
                                  form.touched.bsDisCode
                                }
                              >
                                <Input
                                  variant="modalEditor"
                                  placeholder="코드를 입력하세요."
                                  isRequired={true}
                                  color={
                                    isChckId.state === "duple"
                                      ? "system.default.red"
                                      : "font.mrimary"
                                  }
                                  {...field}
                                  value={field.value}
                                  onChange={(e) => {
                                    if (
                                      isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "pass" &&
                                      isChckId.text !== e.target.value
                                    ) {
                                      setIsChKId({
                                        ...isChckId,
                                        chk: false,
                                        state: "notWork",
                                      });
                                    } else if (
                                      !isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "notWork" &&
                                      isChckId.text === e.target.value
                                    ) {
                                      setIsChKId({
                                        ...isChckId,
                                        chk: true,
                                        state: "pass",
                                      });
                                    } else if (
                                      !isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "duple" &&
                                      isChckId.text !== e.target.value
                                    ) {
                                      setIsChKId({
                                        text: "",
                                        chk: false,
                                        state: "notWork",
                                      });
                                    }
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <Button
                                variant="filterSearch"
                                onClick={() => {
                                  const code = getFieldProps("bsDisCode").value;
                                  checkCode({
                                    type: "bsDis",
                                    code: code,
                                  }).then((res: any) => {
                                    console.log(res);
                                    if (res?.result === false) {
                                      setIsChKId({
                                        text: code,
                                        chk: true,
                                        state: "pass",
                                      });
                                      form.setFieldValue(code);
                                      setTimeout(() =>
                                        form.setFieldTouched("bsDisCode", true)
                                      );
                                    } else {
                                      !isChckId.chk &&
                                        setIsChKId({
                                          text: getFieldProps("bsDisCode")
                                            .value,
                                          chk: false,
                                          state: "duple",
                                        });
                                    }
                                  });
                                }}
                              >
                                중복확인
                              </Button>
                            </Fragment>
                          )}
                        </Field>
                      </Flex>
                    </Flex>
                    <Text
                      w="100%"
                      textStyle="base"
                      fontSize="xs"
                      textAlign="right"
                      lineHeight="1.5rem"
                      fontWeight={
                        isChckId.state === "duple"
                          ? "strong"
                          : isChckId.state === "pass"
                          ? "strong"
                          : "regular"
                      }
                      color={
                        isChckId.state === "duple"
                          ? "system.accessible.red"
                          : isChckId.state === "pass"
                          ? "font.primary"
                          : "font.secondary"
                      }
                    >
                      {isChckId.state === "duple"
                        ? "중복된 상권코드입니다."
                        : isChckId.state === "pass"
                        ? "사용 가능한 코드입니다."
                        : "상권코드 중복 확인을 진행해주세요."}
                    </Text>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="left"
                    direction="column"
                    gap="1rem"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="상권레이어 선택" need={true} />
                    <Field name="bsDisType" validate={validateRank}>
                      {({ form }: any) => {
                        return (
                          <FormControl
                            isInvalid={
                              form.errors.bsDisType && form.touched.bsDisType
                            }
                          >
                            <SelectBsDisLayer
                              value={form.getFieldProps("bsDisType").value}
                              onClick={(type: any) => {
                                updateTypeHandler(
                                  setFieldValue,
                                  setFieldTouched,
                                  type
                                );
                              }}
                            />
                          </FormControl>
                        );
                      }}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="연동매장" />
                    <Field name="linkStore">
                      {({ field, form }: any) => (
                        <FormControl display="flex" flexDirection="row">
                          <Flex
                            position="relative"
                            w="100%"
                            direction="column"
                            gap="0.25rem"
                            wrap="nowrap"
                          >
                            <Tooltip
                              hasArrow
                              isOpen={isOpen}
                              isDisabled={false}
                              placement="bottom"
                              label={TooltipContent(
                                searchLi,
                                field,
                                form,
                                onClose
                              )}
                              bottom="0rem"
                              p="0.5rem 1rem"
                              width="100%"
                              bgColor="conditional.popOver"
                              borderRadius="2px"
                              boxShadow="none"
                              filter="drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))"
                              textStyle="base"
                              fontWeight="regular"
                              fontSize="xs"
                              lineHeight="1.375rem"
                              color="font.primary"
                              pointerEvents="all"
                            >
                              <Flex gap="0.5rem">
                                <Input
                                  variant="modalEditor"
                                  w="100%"
                                  zIndex="2"
                                  background="#ffffff"
                                  _focus={{ background: "#ffffff" }}
                                  value={searchText}
                                  onChange={(e: any) =>
                                    setSearchText(e.target.value)
                                  }
                                  placeholder="매장을 검색하세요"
                                />
                                <Button
                                  variant="filterSearch"
                                  onClick={() =>
                                    getAvailableStoreLink({
                                      type: "store",
                                      text: searchText,
                                    }).then((res: any) => {
                                      if (res.data && res.data.length > 0) {
                                        setSearchLi(res.data);
                                      }
                                    })
                                  }
                                >
                                  <IcoSearch />
                                </Button>
                              </Flex>
                            </Tooltip>
                            {getFieldProps("linkStore").value &&
                              getFieldProps("linkStore").value.length > 0 && (
                                <Flex w="100%" gap="0.5rem" wrap="wrap">
                                  {getFieldProps("linkStore").value?.map(
                                    (link: any, idx: number) => {
                                      const { storeCode, storeName } = link;

                                      return (
                                        <Flex
                                          position="relative"
                                          p="0 0.5rem 0"
                                          h="1.375rem"
                                          display="flex"
                                          align="center"
                                          gap="0.25rem"
                                          bgColor={
                                            idx % 2 === 0
                                              ? "#FFFBE6"
                                              : "#E6FFFB"
                                          }
                                          border="1px solid"
                                          borderRadius="2px"
                                          borderColor={
                                            idx % 2 === 0
                                              ? "#FFE58F"
                                              : "#87E8DE"
                                          }
                                          fontFamily="main"
                                          fontSize="xs"
                                          lineHeight="1.5rem"
                                          color={
                                            idx % 2 === 0
                                              ? "#FAAD14"
                                              : "#13C2C2"
                                          }
                                        >
                                          {storeName}
                                          <IconButton
                                            bgColor="inherit"
                                            color="font.secondary"
                                            _hover={{
                                              bgColor: "primary.type6",
                                            }}
                                            icon={
                                              <IcoClose
                                                width="0.75rem"
                                                height="0.75rem"
                                                color="inherit"
                                              />
                                            }
                                            aria-label="삭제버튼"
                                            onClick={() => {
                                              storeCode;
                                              const origin =
                                                form.getFieldProps(
                                                  "linkStore"
                                                ).value;

                                              if (origin && origin.length > 0) {
                                                const filter = origin.filter(
                                                  (li: any) =>
                                                    li.storeCode !== storeCode
                                                );

                                                form.setFieldTouched(
                                                  "linkStore",
                                                  true
                                                );
                                                form.setFieldValue(
                                                  "linkStore",
                                                  filter
                                                );
                                              }
                                            }}
                                          />
                                        </Flex>
                                      );
                                    }
                                  )}
                                </Flex>
                              )}
                          </Flex>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Flex>
    );
  }
);

const EditorLabel = ({
  text,
  need = false,
}: {
  text: string;
  need?: boolean;
}) => {
  return (
    <FormLabel
      display="flex"
      alignItems="flex-start"
      m="0"
      minW="4.4rem"
      w="40%"
      flex="none"
      textStyle="base"
      fontSize="sm"
      fontWeight="strong"
    >
      {text}
      {need && (
        <Text
          as={"span"}
          pos="relative"
          top="0.25rem"
          left="0.1rem"
          lineHeight={1}
          color="primary.type8"
        >
          *
        </Text>
      )}
    </FormLabel>
  );
};

const TooltipContent = (
  searchLi: any[],
  field: any,
  form: any,
  onClose: any
) => {
  return (
    <Flex w="100%" overflow="hidden" align="center">
      {searchLi && searchLi.length > 0 ? (
        <List
          w="10rem"
          h="5rem"
          overflowY="scroll"
          __css={{
            "::-webkit-scrollbar": {
              w: "3px",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "5",
              bg: `bg.primary`,
            },
          }}
        >
          {searchLi.map((li: any, idx: number) => {
            const { storeCode, storeName } = li;
            return (
              <ListItem
                key={`searchList-${idx}`}
                cursor="pointer"
                _hover={{
                  color: "primary.type8",
                  fontWeight: "strong",
                }}
                onClick={() => {
                  const origin = form.getFieldProps("linkStore").value;

                  if (origin && origin.length > 0) {
                    const isAlready = origin.filter(
                      (li: any) => li.storeCode === storeCode
                    );

                    if (isAlready.length > 0) {
                      onClose();
                    } else {
                      origin.push({
                        storeCode: storeCode,
                        storeName: storeName,
                      });
                      form.setFieldTouched("linkStore", true);
                      form.setFieldValue("linkStore", origin);
                      onClose();
                    }
                  } else {
                    origin.push({
                      storeCode: storeCode,
                      storeName: storeName,
                    });
                    form.setFieldTouched("linkStore", true);
                    form.setFieldValue("linkStore", origin);
                    onClose();
                  }
                }}
              >
                {storeName}
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Text>"검색결과가 없습니다."</Text>
      )}
    </Flex>
  );
};

export default FormBsnsD;
