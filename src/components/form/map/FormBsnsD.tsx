//  Lib
import { forwardRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Formik, Form } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  IconButton,
  Heading,
} from "@chakra-ui/react";
//  Component
import { Select, SelectBsDisLayer } from "@components/common/Select";
import { Input } from "@components/common/Input";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Icon
import { IcoClose } from "@assets/icons/icon";

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
    const { pathType, path, center } = useRecoilValue(atomCreateArea);
    const { initVal, update = false, fixMode = false, setValues } = props;
    const [form, setForm] = useState(initVal);

    console.log(form);

    useEffect(() => {
      setForm(initVal);
    }, [update]);

    return (
      <Flex h="100%" direction={"column"}>
        <Formik
          key="bsnsDisEditor"
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
                  mb="1.25rem"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                  gap="1.875rem"
                >
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        상권명
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("bsDisName").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("bsDisName", val)
                          }
                          placeholder="상권명을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.bsDisName}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        상권코드
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("bsDisCode").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("bsDisCode", val)
                          }
                          placeholder="상권코드를 입력하세요."
                        />
                      ) : (
                        <Text variant="detailSub">
                          상권코드 : {initVal?.bsDisCode}
                        </Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        상권레이어 선택
                      </FormLabel>
                      {fixMode ? (
                        <SelectBsDisLayer />
                      ) : (
                        <Text variant="detailSub">
                          상권코드 : {initVal?.bsDisCode}
                        </Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        연동상권
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
                            onChange={(val: any) =>
                              setFieldValue("linkStore", val)
                            }
                            selectProps={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              w: "100%",
                              zIndex: 1,
                            }}
                          />
                          {getFieldProps("linkStore").value && (
                            <Flex gap="0.5rem">
                              {getFieldProps("linkStore").value?.map(
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

export default FormBsnsD;
