//  LIB
import { Fragment, useState } from "react";
import { Flex, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
//  Components
import {
  Input,
  InputPwd,
  InputAddon,
  InputBtn,
  InputFile,
  InputDate,
} from "@components/common/Input";
import { RadioBox, RadioProps } from "@components/common/RadioBox";

type FieldProps = {
  type:
    | "text"
    | "number"
    | "date"
    | "dateDbl"
    | "email"
    | "tel"
    | "pwd"
    | "pwdChk"
    | "chkbox"
    | "radio"
    | "chkbox"
    | "fileXlsx"
    | "fileImg"
    | "slct"
    | "slctApi"
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
};

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
    <Formik
      initialValues={initialValues}
      onSubmit={(val) => {
        onSubmit(val);
      }}
    >
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
                                _value={getFieldProps(fieldDepth.key).value}
                                width={`${100 / field.length}%`}
                              />
                            ))
                          ) : (
                            <FormField
                              key={`${paraKey}-${fieldIdx}-${field.key}`}
                              field={field}
                              setFieldValue={setFieldValue}
                              _value={getFieldProps(field.key).value}
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
  _value,
  width = `100%`,
}: {
  field: FieldProps;
  setFieldValue: any;
  _value: any;
  width?: string;
}) => {
  const {
    type: fieldType,
    labelText,
    key: _fieldKey,
    values: _values,
    component,
    variant: variant,
  } = field;

  return (
    <FormControl as={Flex} variant={variant} w={width} flexDirection="column">
      <FormLabel as={FormLabel} htmlFor={_fieldKey}>
        {labelText}
      </FormLabel>
      {
        {
          text: (
            <Input
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(val: string | number) =>
                setFieldValue(_fieldKey, val)
              }
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
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(val: number) => setFieldValue(_fieldKey, val)}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          date: (
            <InputDate
              type="single"
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(val: string) => setFieldValue(_fieldKey, val)}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          dateDbl: (
            <InputDate
              type="double"
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(val: string) => setFieldValue(_fieldKey, val)}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
          email: <></>,
          tel: <></>,
          pwd: (
            <InputPwd
              type="single"
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(val: string) => setFieldValue(_fieldKey, val)}
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
              fieldKey={_fieldKey}
              value={_value}
              _onChange={(e: string) => setFieldValue(_fieldKey, e)}
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
              _onChange={(val: any) => setFieldValue(_fieldKey, val)}
              fieldKey={_fieldKey}
              value={_value}
              values={_values}
              variant="filled"
            />
          ),
          chkbox: <></>,
          fileXlsx: (
            <InputFile
              accept=".xlsx"
              type="file"
              fieldKey={_fieldKey}
              value={_value}
              addonProps={{ width: "auto" }}
              _onChange={(val: any) => setFieldValue(_fieldKey, val)}
              variant="filled"
              placeholder="placeHolder"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="black.100"
              errorBorderColor="red.300"
            />
          ),
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
        }[fieldType]
      }
    </FormControl>
  );
};

export default FormSample;
