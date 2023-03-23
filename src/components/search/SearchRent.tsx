//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

const SearchRent = ({
  initVal,
  setValues,
}: {
  initVal: any;
  setValues: any;
}) => {
  return (
    <Flex p="0rem 2rem">
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
              <Flex w="100%" flexDirection="column" gap="1rem">
                <FormControl variant="search" maxW="80%">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w="10%"
                    flex="none"
                  >
                    검색어
                  </FormLabel>
                  <Flex w="100%" gap="2rem">
                    <Select
                      data={[
                        { text: "매물명", value: "rentName" },
                        { text: "매물코드", value: "rentCode" },
                      ]}
                      defalutValue="rentName"
                      opBaseTxt="text"
                      opBaseId="value"
                      opBaseKey="value"
                      onChange={(val: any) => setFieldValue("type", val)}
                      selectProps={{ w: "32%" }}
                    />
                    <Input
                      inputProps={{ w: "68%" }}
                      onChange={(val: any) => setFieldValue("text", val)}
                    />
                  </Flex>
                </FormControl>
                <FormControl variant="search" maxW="80%">
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
                <FormControl variant="search" maxW="80%">
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
                      { text: "A타입", value: "rentRankA" },
                      { text: "B타입", value: "rentRankB" },
                      { text: "C타입", value: "rentRankC" },
                      { text: "D타입", value: "rentRankD" },
                      { text: "E타입", value: "rentRankE" },
                    ]}
                    chkValue={getFieldProps("storeRank").value}
                    activeTotal={true}
                    onChange={(val: any) => setFieldValue("storeRank", val)}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w="10%"
                    flex="none"
                  >
                    등록일
                  </FormLabel>
                  <InputTotalDate
                    value={getFieldProps("openDate").value}
                    onChange={(val: string) => setFieldValue("openDate", val)}
                    _placeholder={{ color: "gray.500" }}
                    focusBorderColor="black.100"
                    errorBorderColor="red.300"
                  />
                </FormControl>
              </Flex>
              <Flex mt="1rem" justifyContent="center">
                <Button
                  type="submit"
                  variant="search"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <IcoSearch />
                  <Text variant="search">검색</Text>
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default SearchRent;
