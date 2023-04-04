//  Lib
import { Formik, Form, FormikProps } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

const SearchStore = ({
  initVal,
  setValues,
}: {
  initVal: any;
  setValues: any;
}) => {
  const [isPc] = useMediaQuery("(min-width: 1280px)");

  return (
    <Flex p="0rem 0.8125rem">
      <Formik
        initialValues={initVal}
        onSubmit={(values) => {
          if (values && setValues !== undefined) {
            setValues(values);
          }
        }}
      >
        {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex
                w="100%"
                justify="space-between"
                direction="row"
                wrap="wrap"
                gap="1rem"
              >
                <FormControl variant="search" maxW={isPc ? "49%" : "100%"}>
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w={isPc ? "10%" : "20%"}
                    flex="none"
                  >
                    검색어
                  </FormLabel>
                  <Flex w="100%" gap="0.5rem">
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
                      selectProps={{ w: isPc ? "20%" : "30%" }}
                    />
                    <Input
                      inputProps={{ w: isPc ? "20%" : "70%" }}
                      placeholder={"매장코드를 입력해주세요"}
                      onChange={(val: any) => setFieldValue("text", val)}
                    />
                  </Flex>
                </FormControl>
                {isPc && (
                  <>
                    <FormControl variant="search" maxW="49%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        w="10%"
                        flex="none"
                      >
                        지역
                      </FormLabel>
                      <SelectAddr
                        value={getFieldProps("areaCode").value}
                        onChange={(val: any) => setFieldValue("areaCode", val)}
                      />
                    </FormControl>
                    <FormControl variant="search" maxW="49%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        w="10%"
                        flex="none"
                      >
                        상태
                      </FormLabel>
                      <CheckboxGroup
                        chkboxData={[
                          { text: "입점", value: "statusOpen" },
                          { text: "폐점", value: "statusClose" },
                          { text: "휴점", value: "statusRest" },
                          { text: "대기", value: "statusReady" },
                          { text: "기타", value: "statusEtc" },
                        ]}
                        chkValue={getFieldProps("storeType").value}
                        activeTotal={true}
                        onChange={(val: any) => setFieldValue("storeType", val)}
                      />
                    </FormControl>
                    <FormControl variant="search" maxW="49%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        w="10%"
                        flex="none"
                      >
                        타입
                      </FormLabel>
                      <CheckboxGroup
                        chkboxData={[
                          { text: "A타입", value: "rankA" },
                          { text: "B타입", value: "rankB" },
                          { text: "C타입", value: "rankC" },
                          { text: "D타입", value: "rankD" },
                          { text: "E타입", value: "rankE" },
                        ]}
                        chkValue={getFieldProps("storeRank").value}
                        activeTotal={true}
                        onChange={(val: any) => setFieldValue("storeRank", val)}
                      />
                    </FormControl>
                    <FormControl variant="search" maxW="49%">
                      <FormLabel
                        display="flex"
                        alignItems="center"
                        w="10%"
                        flex="none"
                      >
                        개업일
                      </FormLabel>
                      <InputTotalDate
                        value={getFieldProps("openDate").value}
                        onChange={(val: string) =>
                          setFieldValue("openDate", val)
                        }
                        _placeholder={{ color: "gray.500" }}
                        focusBorderColor="black.100"
                        errorBorderColor="red.300"
                      />
                    </FormControl>
                  </>
                )}
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    variant="search"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <IcoSearch w="0.875rem" h="0.875rem" />
                    <Text variant="search">검색</Text>
                  </Button>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default SearchStore;
