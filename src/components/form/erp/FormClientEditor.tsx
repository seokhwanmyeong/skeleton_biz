//  Lib
import { Formik, Form, FormikProps } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Divider,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { Input, InputAddr } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { IcoClose, IcoSearch } from "@assets/icons/icon";
import { forwardRef, useEffect, useState } from "react";

const clientStatusText: any = {
  statusReady: "상담대기",
  statusCur: "상담중",
  statusCom: "상담완료",
  statusEnd: "종료",
};
const clientPathText: any = {
  path1: "지인소개",
  path2: "온라인광고",
  path3: "TV,지면광고",
  path4: "박람회",
  path5: "포털검색",
};

const FormClientEditor = forwardRef(
  (
    props: {
      initVal: any;
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
      children?: any;
    },
    ref: any
  ) => {
    const {
      initVal,
      update = false,
      fixMode = false,
      setValues,
      children,
    } = props;
    const [form, setForm] = useState(initVal);
    console.log(form);
    useEffect(() => {
      setForm(initVal);
    }, [update]);

    return (
      <Flex h="100%">
        <Formik
          key="clientEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={true}
          onSubmit={(values) => {
            if (values && setValues !== undefined) {
              console.log(values);
              setValues(values);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            getFieldProps,
            setFieldValue,
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
                  mb="5rem"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                  gap="0.75rem"
                >
                  {fixMode ? (
                    <Input
                      value={getFieldProps("clientName").value}
                      inputProps={{ w: "10rem" }}
                      onChange={(val: any) => setFieldValue("clientName", val)}
                      placeholder="고객명을 입력하세요."
                    />
                  ) : (
                    <Heading as="h3" mb="2rem" variant="detailTitle">
                      {initVal?.clientName}
                    </Heading>
                  )}
                </Flex>
                {children}
                <Flex>
                  <Flex
                    p="0 1.4rem"
                    w="50%"
                    flexDirection="column"
                    gap="1.625rem"
                  >
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        연락처
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("clientPhone").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("clientPhone", val)
                          }
                          placeholder="연락처를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.clientPhone}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        고객상태
                      </FormLabel>
                      {!update || fixMode ? (
                        <Select
                          data={[
                            { text: "상담대기", value: "statusReady" },
                            { text: "상담중", value: "statusCur" },
                            { text: "상담완료", value: "statusCom" },
                            { text: "종료", value: "statusEnd" },
                          ]}
                          value={getFieldProps("clientStatus").value}
                          opBaseTxt="text"
                          opBaseId="value"
                          opBaseKey="value"
                          onChange={(val: any) =>
                            setFieldValue("clientStatus", val)
                          }
                        />
                      ) : (
                        <Text>{clientStatusText[initVal?.clientStatus]}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        유입경로
                      </FormLabel>
                      {!update || fixMode ? (
                        <Select
                          data={[
                            { text: "지인소개", value: "path1" },
                            { text: "온라인광고", value: "path2" },
                            { text: "TV,지면광고", value: "path3" },
                            { text: "박람회", value: "path4" },
                            { text: "포털검색", value: "path5" },
                          ]}
                          value={getFieldProps("clientPath").value}
                          opBaseTxt="text"
                          opBaseId="value"
                          opBaseKey="value"
                          onChange={(val: any) =>
                            setFieldValue("clientPath", val)
                          }
                        />
                      ) : (
                        <Text>{clientPathText[initVal?.clientPath]}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        나이
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("age").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("age", val)}
                          placeholder="나이를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.age}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        직업
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("job").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("job", val)}
                          placeholder="직업을 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.job}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        창업경혐
                      </FormLabel>
                      {!update || fixMode ? (
                        <Select
                          data={[
                            { text: "예", value: true },
                            { text: "아니오", value: false },
                          ]}
                          value={getFieldProps("storeStatus").value}
                          opBaseTxt="text"
                          opBaseId="value"
                          opBaseKey="value"
                          onChange={(val: any) =>
                            setFieldValue("storeStatus", val)
                          }
                        />
                      ) : (
                        <Text>
                          {getFieldProps("exp").value ? "예" : " 아니오"}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        창업자금
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("startFund").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("startFund", val)
                          }
                          placeholder="창업자금을 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.startFund}</Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Divider
                    orientation="vertical"
                    m="0.5rem 1.4rem"
                    h="auto"
                    borderColor="#D8D8DC"
                    borderLeftWidth="1px"
                  />
                  <Flex
                    p="0 1.4rem"
                    w="50%"
                    flexDirection="column"
                    gap="1.625rem"
                  >
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        거주지
                      </FormLabel>
                      {!update || fixMode ? (
                        <SelectAddr
                          value={getFieldProps("hopeArea").value}
                          onChange={(val: any) =>
                            setFieldValue("hopeArea", val)
                          }
                          selectGroupProps={{
                            flexDirection: "column",
                          }}
                        />
                      ) : (
                        <Text>{initVal?.resident}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        희망지역
                      </FormLabel>
                      {!update || fixMode ? (
                        <SelectAddr
                          value={getFieldProps("hopeArea").value}
                          onChange={(val: any) =>
                            setFieldValue("hopeArea", val)
                          }
                          selectGroupProps={{
                            flexDirection: "column",
                          }}
                        />
                      ) : (
                        <Text>{initVal?.hopeArea}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        관심매물
                      </FormLabel>
                      {!update || fixMode ? (
                        <Flex position="relative" w="100%" direction="column">
                          <Input
                            inputProps={{
                              w: "100%",
                              zIndex: 2,
                              background: "#ffffff",
                              _focus: {
                                background: "#ffffff",
                              },
                            }}
                            onChange={(val: any) => console.log(val)}
                            placeholder="상권을 검색하세요"
                          />
                          <Select
                            data={[
                              { text: "매장명", value: "storeName" },
                              { text: "매장코드", value: "storeCode" },
                              { text: "대표자", value: "ownerName" },
                            ]}
                            defalutValue="storeName"
                            opBaseTxt="text"
                            opBaseId="value"
                            opBaseKey="value"
                            onChange={(val: any) => setFieldValue("type", val)}
                            selectProps={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              w: "100%",
                              zIndex: 1,
                            }}
                          />
                          {getFieldProps("linkBsns").value && (
                            <Flex gap="0.5rem">
                              {getFieldProps("linkBsns").value?.map(
                                (link: any) => {
                                  console.log(link);
                                  return (
                                    <Flex
                                      position="relative"
                                      p="1px 0.5rem 0"
                                      display="flex"
                                      align="center"
                                      bgColor="primary.type2"
                                      fontFamily="main"
                                      fontSize="xs"
                                      lineHeight="1.5rem"
                                      color="primary.type7"
                                    >
                                      {link.name}
                                      <IconButton
                                        bgColor="inherit"
                                        _hover={{
                                          bgColor: "primary.type6",
                                        }}
                                        icon={
                                          <IcoClose color='color="inherit"' />
                                        }
                                        aria-label="삭제버튼"
                                      />
                                    </Flex>
                                  );
                                }
                              )}
                            </Flex>
                          )}
                        </Flex>
                      ) : (
                        <Flex>
                          {initVal?.linkBsns?.map((li: any) => (
                            <Text key={li.code} mr="1rem">
                              {li.name}
                            </Text>
                          ))}
                        </Flex>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        담당자
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("manager").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("manager", val)}
                          placeholder="매니저를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.manager}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        등록일
                      </FormLabel>
                      <Text>{initVal?.createdAt}</Text>
                    </FormControl>
                  </Flex>
                </Flex>
                {/* {(!update || fixMode) && (
                  <Flex mt="1rem" justifyContent="center">
                    <Button
                      type="submit"
                      variant="search"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      <IcoSearch />
                      <Text variant="search">저장하기</Text>
                    </Button>
                  </Flex>
                )} */}
              </Form>
            );
          }}
        </Formik>
      </Flex>
    );
  }
);

export default FormClientEditor;
