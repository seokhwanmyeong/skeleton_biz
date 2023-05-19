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
import { IcoClose, IcoLeft, IcoSearch } from "@assets/icons/icon";
import { forwardRef, useEffect, useState } from "react";
import TextArea from "@src/components/common/TextArea";
import { Deco01 } from "@src/assets/deco/DecoSvg";

const FormHistory = forwardRef(
  (
    props: {
      initVal: any;
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
      onClose?: any;
      children?: any;
    },
    ref: any
  ) => {
    const {
      initVal,
      update = false,
      fixMode = false,
      setValues,
      onClose,
      children,
    } = props;
    console.log(initVal);

    return (
      <Flex h="100%">
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
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <Flex direction="column" justify="center" align="center">
                  <IconButton
                    aria-label="생성 취소"
                    onClick={onClose}
                    icon={
                      <IcoLeft
                        width="1.25rem"
                        height="1.25rem"
                        color="font.primary"
                      />
                    }
                    position="absolute"
                    top="0.125rem"
                    left="0rem"
                    bg="transparent"
                    color="font.primary"
                    _hover={{
                      bg: "transparent",
                    }}
                  />
                  <Flex w="50%" minH="2rem" align="left">
                    {fixMode ? (
                      <FormControl variant="create" gap="28px">
                        <EditorLabel text="제목명" need={true} />
                        <Input
                          variant="editor"
                          value={getFieldProps("title").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("title", val)}
                        />
                      </FormControl>
                    ) : (
                      <Heading
                        as={"h5"}
                        w="100%"
                        bg="none"
                        fontSize="md"
                        lineHeight="2rem"
                        textAlign="center"
                        color="font.primary"
                      >
                        {initVal?.title || " "}
                      </Heading>
                    )}
                  </Flex>
                </Flex>
                <Deco01
                  margin="0.5rem 0 1.3125rem"
                  width="100%"
                  height="auto"
                />
                <Flex flex="1" direction="column">
                  <Flex
                    mb="0.75rem"
                    pb="1.5rem"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                    gap="0.25rem"
                  >
                    <Flex
                      w="20%"
                      h="128px"
                      direction="column"
                      justify="center"
                      align="center"
                      gap="0.75rem"
                      bgColor="neutral.gray2"
                      border="1px dashed"
                      borderColor="neutral.gray5"
                      borderRadius="2px"
                    >
                      <Text>No Image</Text>
                    </Flex>
                    <Flex
                      w="20%"
                      h="128px"
                      direction="column"
                      justify="center"
                      align="center"
                      gap="0.75rem"
                      bgColor="neutral.gray2"
                      border="1px dashed"
                      borderColor="neutral.gray5"
                      borderRadius="2px"
                    >
                      <Text>No Image</Text>
                    </Flex>
                    <Flex
                      w="20%"
                      h="128px"
                      direction="column"
                      justify="center"
                      align="center"
                      gap="0.75rem"
                      bgColor="neutral.gray2"
                      border="1px dashed"
                      borderColor="neutral.gray5"
                      borderRadius="2px"
                    >
                      <Text>No Image</Text>
                    </Flex>
                    <Flex
                      w="20%"
                      h="128px"
                      direction="column"
                      justify="center"
                      align="center"
                      gap="0.75rem"
                      bgColor="neutral.gray2"
                      border="1px dashed"
                      borderColor="neutral.gray5"
                      borderRadius="2px"
                    >
                      <Text>No Image</Text>
                    </Flex>
                    <Flex
                      w="20%"
                      h="128px"
                      direction="column"
                      justify="center"
                      align="center"
                      gap="0.75rem"
                      bgColor="neutral.gray2"
                      border="1px dashed"
                      borderColor="neutral.gray5"
                      borderRadius="2px"
                    >
                      <Text>No Image</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    mb="0.75rem"
                    pb="0.75rem"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                    align="center"
                  >
                    <FormControl variant="create">
                      <EditorLabel text="작성자" />
                      {fixMode ? (
                        <Text>{getFieldProps("writer").value}</Text>
                      ) : (
                        <Text>{initVal.writer}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create">
                      <EditorLabel text="구분" />
                      {fixMode ? (
                        <Text>작성</Text>
                      ) : (
                        <Text>
                          {initVal.historyType === "write"
                            ? "작성"
                            : initVal.historyType === "log"
                            ? "로그"
                            : "작성"}
                        </Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex mb="0.75rem" pb="0.75rem" align="center">
                    <FormControl variant="create">
                      <FormLabel w="auto">작성일</FormLabel>
                      {fixMode ? (
                        <Text>
                          {new Date()
                            .toLocaleDateString()
                            .replace(/\./g, "")
                            .replace(/\s/g, "-")}
                        </Text>
                      ) : (
                        <Text>{initVal.createAt}</Text>
                      )}
                    </FormControl>
                    <FormControl variant="create" alignItems="flex-start">
                      <FormLabel w="auto">작성위치</FormLabel>
                      <Text pos="relative" top="0.25rem">
                        {initVal.curAddr}
                      </Text>
                    </FormControl>
                  </Flex>
                  <FormControl
                    variant="modal"
                    h="100%"
                    flex={1}
                    overflow="hidden"
                  >
                    {fixMode ? (
                      <TextArea
                        variant={"base"}
                        p="5px 12px"
                        h="100%"
                        bgColor="neutral.gray1"
                        border="1px solid"
                        borderColor="neutral.gray5"
                        borderRadius="base"
                        fontFamily="main"
                        fontWeight="regular"
                        fontSize="md"
                        lineHeight="1.375rem"
                        value={getFieldProps("content").value}
                        placeholder="내용을 입력해주세요"
                        onChange={(val: any) => {
                          setFieldValue("content", val);
                        }}
                      />
                    ) : (
                      <Flex
                        display="block"
                        p="5px 12px"
                        w="100%"
                        h="100%"
                        bgColor="neutral.gray1"
                        border="1px solid"
                        borderColor="neutral.gray5"
                        borderRadius="base"
                        overflowY="scroll"
                      >
                        <Text
                          w="100%"
                          h="100%"
                          fontFamily="main"
                          fontSize="md"
                          fontWeight="regular"
                          lineHeight="1.375rem"
                        >
                          {initVal.content}
                        </Text>
                      </Flex>
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

const EditorLabel = ({
  text,
  need = false,
}: {
  text: string;
  need?: boolean;
}) => {
  return (
    <FormLabel
      display="flex"
      alignItems="flex-start"
      m="0"
      flex="none"
      textStyle="base"
      fontSize="sm"
      fontWeight="strong"
    >
      {text}
      {need && (
        <Text
          as={"span"}
          pos="relative"
          top="0.25rem"
          left="0.1rem"
          lineHeight={1}
          color="primary.type8"
        >
          *
        </Text>
      )}
    </FormLabel>
  );
};

export default FormHistory;
