//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

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
          console.log(values);
          setValues(values);
        }
      }}
    >
      {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit} style={{ width: "auto" }}>
            <Flex w="100%" flexDirection="row" gap="1rem">
              <FormControl variant="search">
                <Flex w="100%" gap="0.5rem">
                  <Select
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
                    selectProps={{ w: "5rem", h: "2rem", border: "none" }}
                  />
                  <Select
                    data={[
                      { text: "제목", value: "title" },
                      { text: "작성자", value: "writer" },
                    ]}
                    defalutValue="title"
                    opBaseTxt="text"
                    opBaseId="value"
                    opBaseKey="value"
                    onChange={(val: any) => setFieldValue("searchType", val)}
                    selectProps={{ w: "5rem", h: "2rem", border: "none" }}
                  />
                  <Flex>
                    <Input
                      inputProps={{ w: "14rem", h: "2rem" }}
                      placeholder="Input Search Text"
                      _placeholder={{
                        color: "#D9D9D9",
                      }}
                      onChange={(val: any) => setFieldValue("text", val)}
                    />
                    <Button
                      position="relative"
                      left="-1px"
                      w="2rem"
                      h="2rem"
                      bgColor="#FFFFFF"
                      border="1px solid #D9D9D9"
                      borderRadius="0 2px 2px 0"
                      type="submit"
                      variant="search"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      <IcoSearch color="#D9D9D9" />
                    </Button>
                  </Flex>
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
