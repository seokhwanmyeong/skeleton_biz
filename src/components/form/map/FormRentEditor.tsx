//  Lib
import { forwardRef, useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
import { DatePicker } from "chakra-ui-date-input";
//  Component
import { Select } from "@components/common/Select";
import { InputAddr } from "@components/common/Input";
//  Util
import {
  numRegExp,
  validateNeedStr,
  validateNumber,
} from "@util/valid/validation";
//  Icon
import markerCreate from "@assets/icons/marker_create.png";

const rentTypeText: any = {
  A: "A타입",
  B: "B타입",
  C: "C타입",
  D: "D타입",
  E: "E타입",
};

const FormRentEditor = forwardRef(
  (
    props: {
      initVal: any;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, setValues } = props;
    const { state, dispatch } = useContext(NaverMapContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const addMarker = (marker: naver.maps.Marker) => {
      dispatch({ type: "remove_object", id: "createErp" });
      dispatch({ type: "add_object", object: marker, id: "createErp" });
    };

    const removeMarker = () => {
      dispatch({ type: "remove_object", id: "createErp" });
    };

    useEffect(() => {
      return removeMarker();
    }, []);

    return (
      <Flex
        h="100%"
        direction="column"
        overflowY="scroll"
        __css={{
          "::-webkit-scrollbar": {
            w: "3px",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "5",
            bg: `bg.primary`,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          isOpen && onClose();
        }}
      >
        <Formik
          key="rentEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values);
            setValues(values);
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
            setFieldValue,
            setFieldTouched,
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
                  mb="1.25rem"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                  gap="0.75rem"
                >
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="매물명" need={true} />
                    <Field name="rentName" validate={validateNeedStr}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.rentName && form.touched.rentName
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="매물 명을 입력하세요."
                            isRequired={true}
                            {...field}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <FormControl display="flex" flexDirection="row">
                      <EditorLabel text="매물타입" />
                      <Field name="rentType">
                        {({ form }: any) => (
                          <FormControl>
                            <Select
                              data={[
                                { text: "A타입", value: "A" },
                                { text: "B타입", value: "B" },
                                { text: "C타입", value: "C" },
                                { text: "D타입", value: "D" },
                                { text: "E타입", value: "E" },
                              ]}
                              opBaseTxt="text"
                              opBaseId="value"
                              opBaseKey="value"
                              variant="modalEditor"
                              value={form.getFieldProps("rentType").value}
                              onChange={(val: any) => {
                                form.setFieldTouched("rentType", true);
                                form.setFieldValue("rentType", val);
                              }}
                            />
                          </FormControl>
                        )}
                      </Field>
                    </FormControl>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                    zIndex={999}
                  >
                    <EditorLabel text="입점가능일" />
                    <Field name="availableDay">
                      {({ field, form }: any) => (
                        <FormControl>
                          <DatePicker
                            placeholder="날짜를 입력하세요."
                            name="date"
                            dateFormat="YYYY/MM/DD"
                            value={form.getFieldProps("availableDay").value}
                            onChange={(date: string) => {
                              form.setFieldTouched("availableDay", true);
                              form.setFieldValue("availableDay", date);
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="현업종" />
                    <Field name="curUpjong">
                      {({ field }: any) => (
                        <FormControl>
                          <Input
                            variant="modalEditor"
                            placeholder="현업종을 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="실평수" />
                    <Field name="realArea" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.realArea && form.touched.realArea
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="실평수를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("realArea", true);
                                form.setFieldValue(
                                  "realArea",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("realArea", true);
                                form.setFieldValue("realArea", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="층수" />
                    <Field name="floor" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={form.errors.floor && form.touched.floor}
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="층수를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("floor", true);
                                form.setFieldValue(
                                  "floor",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("floor", true);
                                form.setFieldValue("floor", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="권리금" />
                    <Field name="premiumFee" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.premiumFee && form.touched.premiumFee
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="권리금를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("premiumFee", true);
                                form.setFieldValue(
                                  "premiumFee",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("premiumFee", true);
                                form.setFieldValue("premiumFee", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="관리비" />
                    <Field name="manageFee" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.manageFee && form.touched.manageFee
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="관리비를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("manageFee", true);
                                form.setFieldValue(
                                  "manageFee",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("manageFee", true);
                                form.setFieldValue("manageFee", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="임대료" />
                    <Field name="rentalFee" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.rentalFee && form.touched.rentalFee
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="임대료를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("rentalFee", true);
                                form.setFieldValue(
                                  "rentalFee",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("rentalFee", true);
                                form.setFieldValue("rentalFee", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="보증금" />
                    <Field name="depositFee" validate={validateNumber}>
                      {({ form, field }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.depositFee && form.touched.depositFee
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="보증금을 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value}
                            onChange={(e: any) => {
                              if (numRegExp.test(e.target.value)) {
                                form.setFieldTouched("depositFee", true);
                                form.setFieldValue(
                                  "depositFee",
                                  Number(e.target.value)
                                );
                              } else if (e.target.value === "") {
                                form.setFieldTouched("depositFee", true);
                                form.setFieldValue("depositFee", 0);
                              }
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="주소" need={true} />
                    <Flex w="100%" direction="column" gap="0.5rem">
                      <Field name="addr" validate={validateNeedStr}>
                        {({ form, errors }: any) => {
                          return (
                            <FormControl
                              isInvalid={form.errors.addr && form.touched.addr}
                            >
                              <InputAddr
                                fieldKey={"addr"}
                                hasIcon={false}
                                btnProps={{
                                  variant: "filterSearch",
                                  width: "4rem",
                                  lineHeight: "1",
                                }}
                                value={form.getFieldProps("addr").value}
                                onChange={(val: any) => {
                                  const geocoder =
                                    // @ts-ignore
                                    new kakao.maps.services.Geocoder();

                                  geocoder.addressSearch(
                                    val,
                                    (result: any, status: any) => {
                                      if (status === "OK") {
                                        const { x, y } = result[0];

                                        console.log(errors);
                                        form.setFieldValue("addr", val);
                                        form.setFieldValue("lat", y);
                                        form.setFieldValue("lng", x);
                                        setTimeout(() =>
                                          form.setFieldTouched("addr", true)
                                        );
                                        addMarker(
                                          new naver.maps.Marker({
                                            map: state.map,
                                            position: {
                                              lat: y,
                                              lng: x,
                                            },
                                            icon: {
                                              url: markerCreate,
                                              size: new naver.maps.Size(24, 29),
                                              scaledSize: new naver.maps.Size(
                                                24,
                                                29
                                              ),
                                              anchor: new naver.maps.Point(
                                                12,
                                                26
                                              ),
                                            },
                                          })
                                        );

                                        state.map?.setCenter({
                                          lat: y,
                                          lng: x,
                                        });
                                        state.map?.setZoom(13);
                                      }
                                    }
                                  );
                                }}
                                isDisabled={false}
                                isRequired={true}
                              />
                            </FormControl>
                          );
                        }}
                      </Field>
                      <Field name="addrDetail">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.addrDetail && form.touched.addrDetail
                            }
                          >
                            <Input
                              variant="addr"
                              placeholder="상세주소"
                              isRequired={true}
                              {...field}
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Flex>
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
      minW="4.4rem"
      w="40%"
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

export default FormRentEditor;
