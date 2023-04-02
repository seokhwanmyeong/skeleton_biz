//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

const SearchBsns = ({
  initVal,
  setValues,
}: {
  initVal: any;
  setValues: any;
}) => {
  return (
    <Flex p="0rem 0.8125rem">
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
              <Flex
                w="100%"
                justify="space-between"
                direction="row"
                wrap="wrap"
                gap="1rem"
              >
                <FormControl variant="search" maxW="49%">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w="10%"
                    flex="none"
                  >
                    검색어
                  </FormLabel>
                  <Flex w="100%" gap="0.5rem">
                    <Select
                      data={[
                        { text: "상권명", value: "bsnsName" },
                        { text: "상권코드", value: "bsnsCode" },
                        { text: "연동매장명", value: "linkStore" },
                      ]}
                      defalutValue="bsnsName"
                      opBaseTxt="text"
                      opBaseId="value"
                      opBaseKey="value"
                      onChange={(val: any) => setFieldValue("type", val)}
                      selectProps={{ w: "24%" }}
                    />
                    <Input
                      inputProps={{ w: "50%" }}
                      onChange={(val: any) => setFieldValue("text", val)}
                    />
                  </Flex>
                </FormControl>
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
                    유형
                  </FormLabel>
                  <CheckboxGroup
                    chkboxData={[
                      { text: "상권1", value: "0" },
                      { text: "상권2", value: "1" },
                      { text: "상권3", value: "2" },
                      { text: "상권4", value: "3" },
                      { text: "상권5", value: "4" },
                    ]}
                    chkValue={getFieldProps("bsnsType").value}
                    activeTotal={true}
                    onChange={(val: any) => setFieldValue("bsnsType", val)}
                  />
                </FormControl>
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

export default SearchBsns;
