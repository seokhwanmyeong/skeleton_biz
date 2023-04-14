//  Lib
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  FormControl,
  forwardRef,
  Input,
  Tooltip,
} from "@chakra-ui/react";
//  Component
import { InputPwd } from "@components/common/Input";
import FormErrorMsg from "@components/common/FormErrorMsg";
//  Util_Validate
import { validateEmail, validatePwd } from "@util/valid/validation";
import { IcoAppStore, IcoExclamationCircle } from "@src/assets/icons/icon";

const FormLogin = forwardRef(
  (
    props: {
      initVal: any;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, setValues } = props;
    const [capsShow, setCapsShow] = useState(false);

    const checkCapsLock = (e: any) => {
      console.log(e);
      e.getModifierState("CapsLock")
        ? !capsShow && setCapsShow(true)
        : capsShow && setCapsShow(false);
    };

    const TooltipContent = () => {
      return (
        <Flex align="center" gap="0.5rem">
          <IcoExclamationCircle
            width="0.875rem"
            height="0.875rem"
            color="primary.type7"
          />
          Caps Lock 버튼이 켜져있습니다.
        </Flex>
      );
    };

    return (
      <Formik
        key="login"
        innerRef={ref}
        initialValues={initVal}
        onSubmit={(values) => {
          console.log(values);
          setValues(values);
        }}
      >
        {({ handleSubmit, validateForm, getFieldProps, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Tooltip
                hasArrow
                isOpen={capsShow}
                isDisabled={false}
                placement="right"
                // label="Caps Lock 버튼이 켜져있습니다."
                label={TooltipContent()}
                top="-1rem"
                right="-1rem"
                p="0.5rem 1rem"
                bgColor="conditional.popOver"
                borderRadius="2px"
                boxShadow="none"
                filter="drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))"
                textStyle="base"
                fontWeight="regular"
                fontSize="xs"
                lineHeight="1.375rem"
                color="font.primary"
              >
                <Flex flexDirection="column" gap="0.25rem">
                  <Field name="username" validate={validateEmail}>
                    {({ field, form }: any) => {
                      return (
                        <FormControl
                          display="flex"
                          flexDirection="column"
                          gap="0.25rem"
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <Input
                            onKeyUp={checkCapsLock}
                            zIndex="1"
                            w="100%"
                            h="2.5rem"
                            bgColor="neutral.gray1"
                            border="1px solid"
                            borderColor="neutral.gray5"
                            textStyle="base"
                            fontSize="md"
                            fontWeight="regular"
                            _hover={{ borderColor: "primary.type6" }}
                            _focus={{
                              borderColor: "primary.type6",
                              boxShadow: "none",
                            }}
                            _focusVisible={{
                              borderColor: "primary.type6",
                              boxShadow: "none",
                            }}
                            _invalid={{
                              boxShadow: "none",
                              borderColor: "system.default.red",
                            }}
                            _autofill={{
                              boxShadow: "0 0 0px 1000px #FFFFFF inset",
                            }}
                            _placeholder={{
                              textStyle: "base",
                              fontSize: "md",
                              fontWeight: "regular",
                              color: "font.secondary",
                            }}
                            placeholder={"이메일을 입력해주세요"}
                            isRequired={true}
                            {...field}
                          />
                          <Flex h="1.375rem">
                            <FormErrorMsg>{form.errors.username}</FormErrorMsg>
                          </Flex>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="password" validate={validatePwd}>
                    {({ field, form }: any) => {
                      return (
                        <FormControl
                          display="flex"
                          flexDirection="column"
                          gap="0.25rem"
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <InputPwd
                            onKeyUp={checkCapsLock}
                            name="password"
                            value={form.getFieldProps("password").value}
                            onChange={(val: any) => {
                              form.setFieldTouched("password", true);
                              form.setFieldValue("password", val);
                            }}
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
                              _hover: { borderColor: "primary.type6" },
                              _focusVisible: {
                                borderColor: "primary.type6",
                                boxShadow: "none",
                              },
                              _invalid: {
                                boxShadow: "none",
                                borderColor: "system.default.red",
                              },
                              _autofill: {
                                boxShadow: "0 0 0px 1000px #FFFFFF inset",
                              },
                            }}
                            _placeholder={{
                              textStyle: "base",
                              fontSize: "md",
                              fontWeight: "regular",
                              color: "font.secondary",
                            }}
                            placeholder={"비밀번호를 입력하세요"}
                            isRequired={true}
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          />
                          <Flex h="1.375rem">
                            <FormErrorMsg>{form.errors.password}</FormErrorMsg>
                          </Flex>
                        </FormControl>
                      );
                    }}
                  </Field>
                </Flex>
              </Tooltip>
            </Form>
          );
        }}
      </Formik>
    );
  }
);

export default FormLogin;
