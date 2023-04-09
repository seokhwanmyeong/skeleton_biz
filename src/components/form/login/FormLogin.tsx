//  Lib
import { Formik, Form } from "formik";
import { Flex, FormControl, Text, Button } from "@chakra-ui/react";
//  Component
import { Input, InputPwd } from "@components/common/Input";
import { IcoMy, IcoLock } from "@assets/icons/icon";

const FormLogin = ({
  initVal,
  setValues,
}: {
  initVal: any;
  setValues?: any;
}) => {
  return (
    <Formik
      key="login"
      initialValues={initVal}
      onSubmit={(values) => {
        console.log(values);
        setValues(values);
      }}
    >
      {({ getFieldProps, setFieldValue }) => {
        return (
          <Form style={{ marginBottom: "1.375rem", width: "100%" }}>
            <Flex mb="2.125rem" flexDirection="column" gap="1rem">
              <FormControl variant="create">
                <Flex position="relative" w="100%">
                  <IcoMy
                    zIndex="2"
                    position="absolute"
                    top="50%"
                    left="0.8125rem"
                    transform="translateY(-50%)"
                    w="1rem"
                    h="1rem"
                    color="#B1B431"
                  />
                  <Input
                    value={getFieldProps("username").value}
                    inputProps={{
                      zIndex: "1",
                      p: "0 3.8125rem 0 3.875rem",
                      w: "100%",
                      h: "2.5rem",
                      bgColor: "bg.primary",
                      borderColor: "neutral.gray5",
                      _focus: {
                        borderColor: "#000000",
                      },
                    }}
                    placeholder={"아이디를 입력해주세요"}
                    onChange={(val: any) => setFieldValue("username", val)}
                  />
                </Flex>
              </FormControl>
              <FormControl variant="create">
                <Flex position="relative" w="100%">
                  <IcoLock
                    zIndex="2"
                    position="absolute"
                    top="50%"
                    left="0.8125rem"
                    transform="translateY(-50%)"
                    w="1rem"
                    h="1rem"
                    color="#B1B431"
                  />
                  <InputPwd
                    value={getFieldProps("password").value}
                    inputProps={{
                      zIndex: "1",
                      p: "0 3.8125rem 0 3.875rem",
                      w: "100%",
                      h: "2.5rem",
                      borderColor: "neutral.gray5",
                      _focus: {
                        borderColor: "#000000",
                      },
                    }}
                    focusBorderColor={"#cbd5e0"}
                    placeholder={"비밀번호를 입력해주세요"}
                    onChange={(val: any) => setFieldValue("password", val)}
                  />
                </Flex>
              </FormControl>
            </Flex>
            <Flex mt="1rem" justifyContent="center">
              <Button
                type="submit"
                p="0"
                w="100%"
                h="2.5rem"
                gap="0.5rem"
                fontSize="sm"
                lineHeight="1.5rem"
                bg="primary.type7"
                _hover={{
                  bgColor: "primary.type8",
                }}
              >
                <Text position="relative" top="1px">
                  로그인
                </Text>
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
