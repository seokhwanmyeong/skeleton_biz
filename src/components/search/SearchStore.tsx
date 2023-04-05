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
                <FormControl
                  variant="search"
                  maxW={isPc ? "49%" : "100%"}
                  gap="0.75rem"
                >
                  <FormLabel w={isPc ? "8%" : "20%"}>검색어</FormLabel>
                  <Flex w="100%" gap="0.5rem">
                    <Select
                      variant="search"
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
                      variant="search"
                      inputProps={{ w: isPc ? "50%" : "70%" }}
                      placeholder={"매장코드를 입력해주세요"}
                      onChange={(val: any) => setFieldValue("text", val)}
                    />
                  </Flex>
                </FormControl>
                <FormControl variant="search" maxW="49%" gap="0.75rem">
                  <FormLabel w={isPc ? "8%" : "20%"}>지역</FormLabel>
                  <SelectAddr
                    variant="search"
                    value={getFieldProps("areaCode").value}
                    onChange={(val: any) => setFieldValue("areaCode", val)}
                  />
                </FormControl>
                <FormControl variant="search" maxW="49%" gap="0.75rem">
                  <FormLabel w={isPc ? "8%" : "20%"}>상태</FormLabel>
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
                <FormControl variant="search" maxW="49%" gap="0.75rem">
                  <FormLabel w={isPc ? "8%" : "20%"}>개업일</FormLabel>
                  <InputTotalDate
                    variant="search"
                    groupProps={{
                      w: "100%",
                    }}
                    value={getFieldProps("openDate").value}
                    onChange={(val: string) => setFieldValue("openDate", val)}
                    _placeholder={{ color: "gray.500" }}
                    focusBorderColor="black.100"
                    errorBorderColor="red.300"
                  />
                </FormControl>
                <FormControl variant="search" maxW="49%" gap="0.75rem">
                  <FormLabel w={isPc ? "8%" : "20%"}>타입</FormLabel>
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
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    variant="search"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <IcoSearch w="0.875rem" h="0.875rem" />
                    검색
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
