//  Lib
import { Formik, Form, Field } from "formik";
import {
  Flex,
  FormControl,
  Text,
  Button,
  forwardRef,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
//  Component
import { InputPwd } from "@components/common/Input";
//  Util_Validate
import { validateEmail, validatePwd } from "@util/valid/validation";

const FormLogin = forwardRef(
  (
    props: {
      initVal: any;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, setValues } = props;

    return (
      <Formik
        key="login"
        innerRef={ref}
        initialValues={initVal}
        onSubmit={(values) => {
          setValues(values);
        }}
      >
        {({ handleSubmit, getFieldProps, setFieldValue }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              style={{ marginBottom: "1.875rem", width: "100%" }}
            >
              <Flex flexDirection="column" gap="1rem">
                {/* <Field name="username" validate={validateEmail}>
                  {({ field, form }: any) => {
                    console.log(field);
                    console.log(form);
                    return (
                      <FormControl
                        variant="create"
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <Flex position="relative" w="100%" direction="column">
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            inputProps={{
                              zIndex: "1",
                              p: "0.75rem",
                              w: "100%",
                              h: "2.5rem",
                              bgColor: "neutral.gray1",
                              borderColor: "neutral.gray5",
                              textStyle: "base",
                              fontSize: "md",
                              fontWeight: "regular",
                              _focus: {
                                borderColor: "primary.type6",
                              },
                              _error: {
                                color: "system.default.red",
                                borderColor: "system.default.red",
                              },
                            }}
                            _placeholder={{
                              textStyle: "base",
                              fontSize: "md",
                              fontWeight: "regular",
                              color: "font.secondary",
                            }}
                            errorBorderColor="system.default.red"
                            placeholder={"이메일을 입력하세요"}
                          />
                          <FormErrorMessage color="system.default.red">
                            {form.errors.username}
                          </FormErrorMessage>
                        </Flex>
                      </FormControl>
                    );
                  }}
                </Field> */}
                <FormControl variant="create">
                  <Flex position="relative" w="100%">
                    <Input
                      value={getFieldProps("username").value}
                      zIndex="1"
                      w="100%"
                      h="2.5rem"
                      bgColor="neutral.gray1"
                      borderColor="neutral.gray5"
                      textStyle="base"
                      fontSize="md"
                      fontWeight="regular"
                      _focus={{
                        borderColor: "primary.type6",
                      }}
                      _placeholder={{
                        textStyle: "base",
                        fontSize: "md",
                        fontWeight: "regular",
                        color: "font.secondary",
                      }}
                      placeholder={"아이디를 입력해주세요"}
                      onChange={(e: any) =>
                        setFieldValue("username", e.target.value)
                      }
                    />
                  </Flex>
                </FormControl>
                <FormControl variant="create">
                  <Flex position="relative" w="100%">
                    <InputPwd
                      value={getFieldProps("password").value}
                      inputProps={{
                        zIndex: "1",
                        p: "0 3.875rem 0 0.75rem",
                        w: "100%",
                        h: "2.5rem",
                        bgColor: "neutral.gray1",
                        borderColor: "neutral.gray5",
                        textStyle: "base",
                        fontSize: "md",
                        fontWeight: "regular",
                        _focus: {
                          borderColor: "primary.type6",
                        },
                      }}
                      _placeholder={{
                        textStyle: "base",
                        fontSize: "md",
                        fontWeight: "regular",
                        color: "font.secondary",
                      }}
                      focusBorderColor="primary.type7"
                      placeholder={"비밀번호를 입력하세요"}
                      onChange={(val: any) => setFieldValue("password", val)}
                    />
                  </Flex>
                </FormControl>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    );
  }
);

export default FormLogin;
