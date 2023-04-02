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
import { Select } from "@components/common/Select";
import { Input, InputAddr, InputImg } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { IcoClose, IcoSearch } from "@assets/icons/icon";
import { forwardRef, useEffect, useState } from "react";

const rentStatusText: any = {
  statusOpen: "입점",
  statusClose: "폐점",
  statusRest: "휴점",
  statusReady: "대기",
  statusEtc: "기타",
};
const rentRankText: any = {
  rankA: "A타입",
  rankB: "B타입",
  rankC: "C타입",
  rankD: "D타입",
  rankE: "E타입",
};

const FormRentEditore = forwardRef(
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
      <Flex h="50%">
        <Formik
          key="rentEditor"
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
                  gap="0.75rem"
                >
                  <Flex align="center">
                    {fixMode ? (
                      <Input
                        value={getFieldProps("rentName").value}
                        inputProps={{ w: "10rem" }}
                        onChange={(val: any) => setFieldValue("rentName", val)}
                        placeholder="매물명을 입력하세요."
                      />
                    ) : (
                      <Heading as="h3" mb="2rem" variant="detailTitle">
                        {initVal?.rentName}
                      </Heading>
                    )}
                  </Flex>
                  {fixMode ? (
                    <Input
                      value={getFieldProps("rentCode").value}
                      inputProps={{ w: "10rem" }}
                      onChange={(val: any) => setFieldValue("rentCode", val)}
                      placeholder="매장코드를 입력하세요."
                    />
                  ) : (
                    <Text variant="detailSub">
                      매물코드 : {initVal?.rentCode}
                    </Text>
                  )}
                </Flex>
                <Flex p="0 1.4rem" w="100%" h="100%" gap="3.6rem">
                  <Flex direction="column" w="50%" gap="0.75rem">
                    <Flex gap="1rem">
                      {children}
                      <Flex direction="column" gap="5px">
                        <InputImg isSimple />
                        <InputImg isSimple />
                        <InputImg isSimple />
                      </Flex>
                    </Flex>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        임대료
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("rentFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("rentFee", val)}
                          placeholder="임대료를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.rentFee}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                      >
                        보증금
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("reCharge").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("reCharge", val)
                          }
                          placeholder="보증금를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.reCharge}</Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex
                    direction="column"
                    w="50%"
                    height="100%"
                    justify="space-between"
                  >
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        매물타입
                      </FormLabel>
                      {!update || fixMode ? (
                        <Select
                          data={[
                            { value: "rankA", text: "A" },
                            { value: "rankB", text: "B" },
                            { value: "rankC", text: "C" },
                            { value: "rankD", text: "D" },
                            { value: "rankE", text: "E" },
                          ]}
                          value={getFieldProps("rentRank").value}
                          opBaseTxt="text"
                          opBaseId="value"
                          opBaseKey="value"
                          onChange={(val: any) =>
                            setFieldValue("rentRank", val)
                          }
                        />
                      ) : (
                        <Text>{initVal?.rentRank}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        입점가능일
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("owner_phone").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("owner_phone", val)
                          }
                          // placeholder="대표자 연락처를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.owner_phone}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
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
                            placeholder="상세주소를 입력하세요."
                          />
                        </Flex>
                      ) : (
                        <Text>
                          {initVal?.addr}
                          {initVal?.addrDetail}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        현업종
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("upjong").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("upjong", val)}
                          placeholder="현업종을 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.upjong}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        실평수
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("size").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("size", val)}
                          placeholder="실평수를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.size}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        층수
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("floor").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("floor", val)}
                          placeholder="층수를 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.floor}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        관리금
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("manageFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("manageFee", val)
                          }
                          placeholder="관리금을 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.manageFee}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" w="100%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        minW="4.4rem"
                        w="20%"
                        flex="none"
                      >
                        보증금
                      </FormLabel>
                      {!update || fixMode ? (
                        <Input
                          value={getFieldProps("reCharge").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("reCharge", val)
                          }
                          placeholder="보증금을 입력하세요."
                        />
                      ) : (
                        <Text>{initVal?.reCharge}</Text>
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

export default FormRentEditore;
