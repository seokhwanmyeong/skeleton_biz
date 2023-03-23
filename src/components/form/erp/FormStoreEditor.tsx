//  Lib
import { Formik, Form, FormikProps } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";

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
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex>
                <Flex w="100%" flexDirection="column" gap="1rem">
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      />
                    ) : (
                      <Text>{initVal.storeStatus}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      />
                    ) : (
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                </Flex>
                <Divider />
                <Flex w="100%" flexDirection="column" gap="1rem">
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
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
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
                      flex="none"
                    >
                      주소
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
                      <Text>{initVal.storeRank}</Text>
                    )}
                  </FormControl>
                  <FormControl variant="search">
                    <FormLabel
                      display="flex"
                      alignItems="center"
                      w="10%"
                      flex="none"
                    >
                      연동상권
                    </FormLabel>
                    {!update || fixMode ? (
                      <Flex>
                        <Input
                          value={getFieldProps("owner_phone").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("owner_phone", val)
                          }
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
                          selectProps={{ w: "31.5%" }}
                        />
                      </Flex>
                    ) : (
                      <Text>{initVal.storeRank}</Text>
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
