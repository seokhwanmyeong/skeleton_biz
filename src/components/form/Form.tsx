//  LIB
import { Flex, Button } from "@chakra-ui/react";
import { Formik, Form as FormikForm } from "formik";
//  Components
import FormField, { TypeField } from "@components/form/FormField";

const Form = ({
  styleProps,
  form,
  onSubmit,
  activeBtn = true,
}: {
  styleProps?: {};
  form: {
    initVal: {};
    formKey: string;
    fields: any[];
  };
  onSubmit: (val: any) => any;
  activeBtn?: boolean;
}) => {
  const { initVal, formKey, fields } = form;
  const paraNum = fields.length;

  return (
    <Formik initialValues={initVal} onSubmit={onSubmit}>
      {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => {
        return (
          <FormikForm
            onSubmit={activeBtn ? handleSubmit : onSubmit}
            style={{ width: "100%", ...styleProps }}
          >
            <Flex w="100%" flexDirection="row" gap="20px">
              {fields.map((li: any, idx: number) => {
                const paraKey = `form-${formKey}-${idx}`;

                return (
                  <Flex
                    key={paraKey}
                    gap="20px"
                    w={`${100 / paraNum}%`}
                    mb="20px"
                    flexDirection="column"
                  >
                    {li.map(
                      (field: TypeField | TypeField[], fieldIdx: number) => (
                        <Flex w="100%" key={`${paraKey}-${fieldIdx}`} gap={10}>
                          {Array.isArray(field) ? (
                            field.map(
                              (fieldDepth: TypeField, depthIdx: number) =>
                                fieldDepth.type === "bind" ? (
                                  <Flex
                                    w={`${100 / field.length}%`}
                                    gap="5px"
                                    key={`${paraKey}-${fieldIdx}-${depthIdx}`}
                                  >
                                    {fieldDepth.element &&
                                      fieldDepth.element.map(
                                        (ele, idx, arr) => (
                                          <FormField
                                            key={`${paraKey}-${fieldIdx}-${ele.key}`}
                                            field={ele}
                                            setFieldValue={setFieldValue}
                                            _value={
                                              getFieldProps(ele.key).value
                                            }
                                            fieldW={
                                              ele.width
                                                ? ele.width
                                                : `${100 / arr.length}%`
                                            }
                                          />
                                        )
                                      )}
                                  </Flex>
                                ) : (
                                  <FormField
                                    key={`${paraKey}-${fieldIdx}-${fieldDepth.key}`}
                                    field={fieldDepth}
                                    setFieldValue={setFieldValue}
                                    _value={getFieldProps(fieldDepth.key).value}
                                    fieldW={`${100 / field.length}%`}
                                  />
                                )
                            )
                          ) : field.type === "bind" ? (
                            <Flex w="100%" gap="5px">
                              {field.element &&
                                field.element.map((ele, idx, arr) => (
                                  <FormField
                                    key={`${paraKey}-${fieldIdx}-${ele.key}`}
                                    field={ele}
                                    setFieldValue={setFieldValue}
                                    _value={getFieldProps(ele.key).value}
                                    fieldW={
                                      ele.width
                                        ? ele.width
                                        : `${100 / arr.length}%`
                                    }
                                  />
                                ))}
                            </Flex>
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
            {activeBtn && (
              <Flex w="100%" justifyContent="center">
                <Button type="submit" w="10rem">
                  Complete
                </Button>
              </Flex>
            )}
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
