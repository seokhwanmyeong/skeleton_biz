//  Lib
import { Formik, Form, FormikProps } from "formik";
import { Flex, FormControl, FormLabel, Text, Button } from "@chakra-ui/react";
//  Component
import { SelectAddr } from "@components/common/Select";
import { CheckboxGroup } from "@components/common/CheckBox";
import { IcoSearch } from "@assets/icons/icon";
import { InputTotalDate } from "@components/common/Input";

const SearchStore = ({
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
                  <FormLabel display="flex" alignItems="center" w="10%">
                    검색어
                  </FormLabel>
                  <SelectAddr
                    value={initVal?.areaCode || ""}
                    onChange={(val: any) => setFieldValue("areaCode", val)}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel display="flex" alignItems="center" w="10%">
                    지역
                  </FormLabel>
                  <SelectAddr
                    value={getFieldProps("areaCode").value}
                    onChange={(val: any) => setFieldValue("areaCode", val)}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel display="flex" alignItems="center" w="10%">
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
                    onChange={(val: any) => {
                      console.log(val);
                      setFieldValue("storeType", val);
                    }}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel display="flex" alignItems="center" w="10%">
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
                    onChange={(val: any) => {
                      console.log(val);
                      setFieldValue("storeRank", val);
                    }}
                  />
                </FormControl>
                <FormControl variant="search" maxW="80%">
                  <FormLabel display="flex" alignItems="center" w="10%">
                    개업일
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

export default SearchStore;
