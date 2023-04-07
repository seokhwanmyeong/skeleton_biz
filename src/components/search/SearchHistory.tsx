//  Lib
import { Formik, Form } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Input } from "@components/common/Input";
import { Select } from "@components/common/Select";
//  Icon
import { IcoSearch } from "@assets/icons/icon";

const SearchHistory = ({
  initVal,
  setValues,
}: {
  initVal: any;
  setValues: any;
}) => {
  return (
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
            <Flex w="100%" direction="row" gap="1rem">
              <FormControl variant="search">
                <Flex align="center" w="100%" gap="0.5rem">
                  <FormLabel w="3rem">검색어</FormLabel>
                  <Select
                    variant="search"
                    data={[
                      { text: "전체", value: "total" },
                      { text: "로그", value: "write" },
                      { text: "작성", value: "log" },
                    ]}
                    defalutValue="total"
                    opBaseTxt="text"
                    opBaseId="value"
                    opBaseKey="value"
                    onChange={(val: any) => setFieldValue("dataType", val)}
                    selectProps={{ w: "5rem", flex: "none" }}
                  />
                  <Select
                    variant="search"
                    data={[
                      { text: "제목", value: "title" },
                      { text: "작성자", value: "writer" },
                    ]}
                    defalutValue="title"
                    opBaseTxt="text"
                    opBaseId="value"
                    opBaseKey="value"
                    onChange={(val: any) => setFieldValue("searchType", val)}
                    selectProps={{ w: "5rem", flex: "none" }}
                  />
                  <Input
                    variant="search"
                    inputProps={{
                      w: "100%",
                      h: "100%",
                    }}
                    placeholder="검색어를 입력하세요"
                    _placeholder={{
                      color: "#D9D9D9",
                    }}
                    onChange={(val: any) => setFieldValue("text", val)}
                  />
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
              </FormControl>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchHistory;
