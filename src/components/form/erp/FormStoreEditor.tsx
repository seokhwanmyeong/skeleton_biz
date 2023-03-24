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
} from "@chakra-ui/react";
//  Component
import { Select } from "@components/common/Select";
import { Input, InputAddr } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { IcoClose, IcoSearch } from "@assets/icons/icon";

const FormStoreEditor = ({
  initVal,
  update = false,
  fixMode = false,
  setValues,
}: {
  initVal: any;
  update?: boolean;
  fixMode?: boolean;
  setValues?: any;
}) => {
  return (
    <Flex p="2.0625rem 4.3125rem">
      <Formik
        key="storeEditor"
        initialValues={initVal}
        onSubmit={(values) => {
          if (values && setValues !== undefined) {
            console.log(values);
            setValues(values);
          }
        }}
      >
        {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
          return (
            <Form
              onSubmit={(values) => {
                console.log(values);
                handleSubmit();
              }}
              style={{ width: "100%" }}
            >
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
                      매장상태
                    </FormLabel>
                    {!update || fixMode ? (
                      <RadioBox
                        fieldKey="storeStatus"
                        values={[
                          { text: "입점", value: "statusOpen" },
                          { text: "폐점", value: "statusClose" },
                          { text: "휴점", value: "statusRest" },
                          { text: "대기", value: "statusReady" },
                          { text: "기타", value: "statusEtc" },
                        ]}
                        value={getFieldProps("storeStatus").value}
                        onChange={(val: any) =>
                          setFieldValue("storeStatus", val)
                        }
                        radioProps={{
                          flexWrap: "wrap",
                          sx: {
                            label: {
                              mr: 0,
                              w: "3rem",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Text>{initVal.storeStatus}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="create">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      minW="2rem"
                      w="30%"
                      flex="none"
                    >
                      매장타입
                    </FormLabel>
                    {!update || fixMode ? (
                      <RadioBox
                        fieldKey="storeRank"
                        values={[
                          { text: "A타입", value: "rankA" },
                          { text: "B타입", value: "rankB" },
                          { text: "C타입", value: "rankC" },
                          { text: "D타입", value: "rankD" },
                          { text: "E타입", value: "rankE" },
                        ]}
                        value={getFieldProps("storeRank").value}
                        onChange={(val: any) => setFieldValue("storeRank", val)}
                        radioProps={{
                          flexWrap: "wrap",
                          sx: {
                            label: {
                              mr: 0,
                              w: "auto",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Text>{initVal.storeRank}</Text>
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
                      매장연락처
                    </FormLabel>
                    {!update || fixMode ? (
                      <Input
                        value={getFieldProps("phone").value}
                        inputProps={{ w: "100%" }}
                        onChange={(val: any) => setFieldValue("phone", val)}
                      />
                    ) : (
                      <Text>{initVal.phone}</Text>
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
                      사업자등록번호
                    </FormLabel>
                    {!update || fixMode ? (
                      <Input
                        value={getFieldProps("biz_number").value}
                        inputProps={{ w: "100%" }}
                        onChange={(val: any) =>
                          setFieldValue("biz_number", val)
                        }
                      />
                    ) : (
                      <Text>{initVal.biz_number}</Text>
                    )}
                  </FormControl>
                </Flex>
                <Divider
                  orientation="vertical"
                  m="0.5rem 1.4rem"
                  h="auto"
                  borderColor="font.primary"
                  borderLeftWidth="2px"
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
                      대표자
                    </FormLabel>
                    {!update || fixMode ? (
                      <Input
                        value={getFieldProps("owner_name").value}
                        inputProps={{ w: "100%" }}
                        onChange={(val: any) =>
                          setFieldValue("owner_name", val)
                        }
                      />
                    ) : (
                      <Text>{initVal.owner_name}</Text>
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
                      대표자 연락처
                    </FormLabel>
                    {!update || fixMode ? (
                      <Input
                        value={getFieldProps("owner_phone").value}
                        inputProps={{ w: "100%" }}
                        onChange={(val: any) =>
                          setFieldValue("owner_phone", val)
                        }
                      />
                    ) : (
                      <Text>{initVal.owner_phone}</Text>
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
                      주소
                    </FormLabel>
                    {!update || fixMode ? (
                      <Flex w="100%" direction="column" gap="0.5rem">
                        <InputAddr
                          fieldKey={"addr"}
                          value={getFieldProps("addr").value}
                          onChange={(val: any) => setFieldValue("addr", val)}
                        />
                        <Input
                          value={getFieldProps("addrDetail").value}
                          onChange={(val: any) =>
                            setFieldValue("addrDetail", val)
                          }
                        />
                      </Flex>
                    ) : (
                      <Text>
                        {initVal.addr}
                        {initVal.addrDetail}
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
                      연동상권
                    </FormLabel>
                    {!update || fixMode ? (
                      <Flex position="relative" w="100%" direction="column">
                        <Input
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => console.log(val)}
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
                          selectProps={{ w: "100%", zIndex: -1 }}
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
                        {initVal.linkBsns.map((li: any) => (
                          <Text key={li.name} mr="1rem">
                            {li.name}
                          </Text>
                        ))}
                      </Flex>
                    )}
                  </FormControl>
                </Flex>
              </Flex>
              {(!update || fixMode) && (
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
              )}
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default FormStoreEditor;
