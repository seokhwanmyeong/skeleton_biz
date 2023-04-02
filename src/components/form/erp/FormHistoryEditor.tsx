//  Lib
import { Formik, Form, FormikProps } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Divider,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";
//  Component
import { Select } from "@components/common/Select";
import { Input, InputAddr, InputImg } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { IcoClose, IcoSearch } from "@assets/icons/icon";
import { forwardRef, useEffect, useState } from "react";
import TextArea from "@src/components/common/TextArea";

const FormHistoryEditor = forwardRef(
  (
    props: {
      initVal: any;
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
      children?: any;
    },
    ref: any
  ) => {
    const {
      initVal,
      update = false,
      fixMode = false,
      setValues,
      children,
    } = props;
    console.log(initVal);

    return (
      <Flex minW="16rem" h="100%">
        <Formik
          key="storeEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={false}
          onSubmit={(values) => {
            if (values && setValues !== undefined) {
              console.log(values);
              setValues(values);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            getFieldProps,
            setFieldValue,
          }) => {
            return (
              <Form
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmit();
                }}
                style={{ width: "100%" }}
              >
                <Flex
                  position="relative"
                  w="100%"
                  h="100%"
                  justify="flex-start"
                  align="center"
                  direction="column"
                >
                  <Flex mb="1.5rem" pr="2rem" w="100%" align="left">
                    {fixMode ? (
                      <Input
                        value={getFieldProps("title").value}
                        inputProps={{ w: "10rem" }}
                        onChange={(val: any) => setFieldValue("title", val)}
                      />
                    ) : (
                      <Heading as="h3" mb="2rem" variant="detailTitle">
                        {initVal?.title}
                      </Heading>
                    )}
                  </Flex>
                  <Flex mb="2rem" w="100%" flexDirection="column" gap="0.25rem">
                    <FormControl mb="1rem" variant="modal">
                      {fixMode ? (
                        <InputImg
                          accept="image/jpg,impge/png,image/jpeg,image/gif"
                          onChange={(val: any) => {
                            setFieldValue("img", val);
                          }}
                        />
                      ) : (
                        // <Text>{getFieldProps("writer").value}</Text>
                        <Text>{getFieldProps("writer").value}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="modal">
                      <FormLabel w="40%">작성자</FormLabel>
                      {fixMode ? (
                        <Text>{getFieldProps("writer").value}</Text>
                      ) : (
                        <Text>{getFieldProps("writer").value}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="modal">
                      <FormLabel w="40%">구분</FormLabel>
                      {fixMode ? (
                        <Text>작성</Text>
                      ) : (
                        <Text>{initVal.type}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="modal">
                      <FormLabel w="40%">작성일</FormLabel>
                      {fixMode ? (
                        <Text>2023-03-31</Text>
                      ) : (
                        <Text>{initVal.createdAt}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="modal">
                      <FormLabel w="40%">작성위치</FormLabel>
                      {fixMode ? (
                        <Text>서울특별시 용산구 한강대로 405</Text>
                      ) : (
                        <Text>{initVal.location}</Text>
                      )}
                    </FormControl>
                  </Flex>
                  <FormControl variant="modal" h="100%" flex={1}>
                    {fixMode ? (
                      <TextArea
                        variant={"base"}
                        p="5px 12px"
                        h="100%"
                        bgColor="neutral.gray1"
                        border="1px solid"
                        borderColor="neutral.gray5"
                        fontFamily="main"
                        fontWeight="regular"
                        fontSize="xs"
                        lineHeight="1.375rem"
                        value={getFieldProps("content").value}
                        placeholder="내용을 입력해주세요"
                        onChange={(val: any) => {
                          setFieldValue("content", val);
                        }}
                      />
                    ) : (
                      <Text h="100%">{initVal.content}</Text>
                    )}
                  </FormControl>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Flex>
    );
  }
);

export default FormHistoryEditor;
