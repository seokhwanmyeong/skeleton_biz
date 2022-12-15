//  LIB
import { Fragment } from "react";
import { Flex, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import {
  Input,
  InputPwd,
  InputAddon,
  InputBtn,
} from "@components/common/Input";
import { RadioBox, RadioProps } from "@src/components/common/RadioBox";

interface FieldProps {
  type:
    | "text"
    | "number"
    | "date"
    | "email"
    | "tel"
    | "pwd"
    | "chkbox"
    | "radio"
    | "custom";
  key: string;
  labelText: string;
  variant?: string;
  validate?: any;
  values?: {
    text: string;
    value: string | number;
  }[];
  component?: any;
}

const FormSample = ({
  form,
  onSubmit,
}: {
  form: {
    initialValues: {};
    config: {
      formKey: string;
      fields: any[];
    };
  };
  onSubmit: (val: any) => any;
}) => {
  const { initialValues, config } = form;
  const paraNum = config.fields.length;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Flex w="100%" flexDirection="row" gap="20px">
              {config.fields.map((li: any, idx: number) => {
                const paraKey = `form-${config.formKey}-${idx}`;

                return (
                  <Flex
                    key={paraKey}
                    gap="10px"
                    w={`${100 / paraNum}%`}
                    mb="20px"
                    flexDirection="column"
                  >
                    {li.map(
                      (field: FieldProps | FieldProps[], fieldIdx: number) => (
                        <Flex w="100%" key={`${paraKey}-${fieldIdx}`} gap={10}>
                          {Array.isArray(field) ? (
                            field.map((fieldDepth: FieldProps) => (
                              <FormField
                                key={`${paraKey}-${fieldIdx}-${fieldDepth.key}`}
                                field={fieldDepth}
                                setFieldValue={setFieldValue}
                                value={getFieldProps(fieldDepth.key).value}
                                width={`${100 / field.length}%`}
                              />
                            ))
                          ) : (
                            <FormField
                              key={`${paraKey}-${fieldIdx}-${field.key}`}
                              field={field}
                              setFieldValue={setFieldValue}
                              value={getFieldProps(field.key).value}
                            />
                          )}
                        </Flex>
                      )
                    )}
                  </Flex>
                );
              })}
            </Flex>
            <Flex w="100%" justifyContent="center">
              <Button type="submit" w="10rem">
                Complete
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

const FormField = ({
  field,
  setFieldValue,
  value,
  width = `100%`,
}: {
  field: FieldProps;
  setFieldValue: any;
  value: any;
  width?: string;
}) => {
  const { type, labelText, key, values, component, variant } = field;

  return (
    <FormControl as={Flex} variant={variant} w={width} flexDirection="column">
      <FormLabel as={FormLabel} htmlFor={key}>
        {labelText}
      </FormLabel>
      {
        {
          text: (
            <Input
              fieldKey={key}
              value={value}
              setFieldValue={setFieldValue}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          number: (
            <Input
              type="number"
              fieldKey={key}
              value={value}
              setFieldValue={setFieldValue}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          date: <></>,
          email: <></>,
          tel: <></>,
          pwd: (
            <InputPwd
              type="single"
              fieldKey={key}
              value={value}
              setFieldValue={setFieldValue}
              variant="filled"
              groupProps={{ size: "md" }}
              addonProps={{ width: "4.5rem" }}
              btnProps={{ h: "1.75rem", size: "sm" }}
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          pwdChk: (
            <InputPwd
              type="chk"
              fieldKey={key}
              value={value}
              setFieldValue={setFieldValue}
              variant="filled"
              groupProps={{ size: "md" }}
              addonProps={{ width: "4.5rem" }}
              btnProps={{ h: "1.75rem", size: "sm" }}
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          radio: (
            <RadioBox
              setFieldValue={setFieldValue}
              fieldKey={key}
              value={value}
              values={values}
              variant="filled"
            />
          ),
          chkbox: <></>,
          file: <></>,
          fileCsv: <></>,
          fileImg: <></>,
          slct: <></>,
          slctApi: <></>,
          custom: <></>,
          // custom: () => {
          //   return component({
          //     setFieldValue: setFieldValue,
          //     value: value,
          //     key: key,
          //   });
          // },
        }[type]
      }
    </FormControl>
  );
};

export default FormSample;
