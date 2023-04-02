//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { Select, SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { Input, InputTotalDate } from "@components/common/Input";

const SearchDocs = ({
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
            <Flex w="40%" direction="row" gap="1rem">
              <FormControl variant="search">
                <Flex align="center" w="100%" gap="0.5rem">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    w="3rem"
                    flex="none"
                  >
                    검색어
                  </FormLabel>
                  <Input
                    inputProps={{
                      w: "100%",
                      h: "100%",
                    }}
                    placeholder="Input Search Text"
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

export default SearchDocs;
