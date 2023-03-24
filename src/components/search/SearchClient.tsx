//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

const SearchClient = ({
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
                        { text: "매장명", value: "clientName" },
                        { text: "담당자명", value: "manager" },
                      ]}
                      defalutValue="clientName"
                      opBaseTxt="text"
                      opBaseId="value"
                      opBaseKey="value"
                      onChange={(val: any) => setFieldValue("type", val)}
                      selectProps={{ w: "31.5%" }}
                    />
                    <Input
                      inputProps={{ w: "68.5%" }}
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
                    희망지역
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
                    상태
                  </FormLabel>
                  <CheckboxGroup
                    chkboxData={[
                      { text: "상담대기", value: "statusReady" },
                      { text: "상담중", value: "statusCurrent" },
                      { text: "상담완료", value: "statusComplete" },
                      { text: "종료", value: "statusEnd" },
                    ]}
                    chkValue={getFieldProps("clientStatus").value}
                    activeTotal={true}
                    onChange={(val: any) => setFieldValue("clientStatus", val)}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w="10%"
                    flex="none"
                  >
                    유입경로
                  </FormLabel>
                  <CheckboxGroup
                    chkboxData={[
                      { text: "지인소개", value: "friend" },
                      { text: "온라인광고", value: "onlineAd" },
                      { text: "TV,지면 광고", value: "tvAd" },
                      { text: "박람회", value: "exhibition" },
                      { text: "포털검색", value: "potal" },
                    ]}
                    chkValue={getFieldProps("clientPath").value}
                    activeTotal={true}
                    onChange={(val: any) => setFieldValue("clientPath", val)}
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
                    value={getFieldProps("registDate").value}
                    onChange={(val: string) => setFieldValue("registDate", val)}
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

export default SearchClient;