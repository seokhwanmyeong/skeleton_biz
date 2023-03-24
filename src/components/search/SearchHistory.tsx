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
  setTotalPage,
}: {
  initVal: any;
  setValues: any;
  setTotalPage: any;
}) => {
  console.log("test");
  return (
    <Formik
      initialValues={initVal}
      onSubmit={(values) => {
        if (values && setValues !== undefined) {
          console.log(values);
          let sample = [];

          for (let i = 0; i < 200; i++) {
            sample.push({
              type: "로그",
              title: "로그인 및 멤버계정 생성",
              writer: "홍길동",
              createdAt: "2022.12.28",
              img: [],
            });
            sample.push({
              type: "작성",
              title: "매장관리 및 고객현황",
              writer: "임첨지",
              createdAt: "2022.12.28",
              img: [
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fblogthumb.pstatic.net%2FMjAyMDAyMDhfMTI3%2FMDAxNTgxMTM0NzE4NDU4.jdPtLGcqEXZ3Bnn78ke2-kVqxiusJ4FNc55T8xRr-6og.7IftkJ0RktjEw3pUINoaAP5LLPEgeqMys8qV_CXzeYgg.JPEG.boak9700%2F20200115_124837.jpg%3Ftype%3Dw2&tbnid=uDIt74gje4RneM&vet=12ahUKEwjrgLCag_T9AhWDdXAKHXgpCtEQMygTegUIARDkAQ..i&imgrefurl=https%3A%2F%2Fm.blog.naver.com%2Fboak9700%2F221800935069&docid=0bNlAWBhKh7_zM&w=743&h=557&q=%EC%8B%9D%EB%8B%B9%20%EB%A7%A4%EC%9E%A5%20%EC%9D%B4%EB%AF%B8%EC%A7%80&ved=2ahUKEwjrgLCag_T9AhWDdXAKHXgpCtEQMygTegUIARDkAQ",
              ],
            });
          }

          // setValues(values);
          setValues(sample);
          setTotalPage(sample.length);
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
