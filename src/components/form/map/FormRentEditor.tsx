//  Lib
import { forwardRef, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { Flex, FormControl, FormLabel, Text, Heading } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import { Select } from "@components/common/Select";
import { Input, InputAddr } from "@components/common/Input";

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
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
    },
    ref: any
  ) => {
    const { state, dispatch } = useContext(NaverMapContext);
    const { initVal, update = false, fixMode = false, setValues } = props;

    const addMarker = (marker: naver.maps.Marker) => {
      dispatch({ type: "add_object", object: marker, id: "createErp" });
    };

    const removeMarker = () => {
      dispatch({ type: "remove_object", id: "createErp" });
    };

    useEffect(() => {
      return removeMarker();
    }, []);

    return (
      <Flex h="100%" direction="column">
        <Formik
          key="rentEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={true}
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
                  mb="1.25rem"
                  w="100%"
                  justify="center"
                  align="center"
                  direction="column"
                  gap="1.875rem"
                >
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        매물명
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("rentName").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("rentName", val)
                          }
                          placeholder="매물명을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.rentName}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        매물타입
                      </FormLabel>
                      {!update || fixMode ? (
                        <Select
                          data={[
                            { text: "A타입", value: "rankA" },
                            { text: "B타입", value: "rankB" },
                            { text: "C타입", value: "rankC" },
                            { text: "D타입", value: "rankD" },
                            { text: "E타입", value: "rankE" },
                          ]}
                          value={getFieldProps("rentType").value}
                          opBaseTxt="text"
                          opBaseId="value"
                          opBaseKey="value"
                          onChange={(val: any) =>
                            setFieldValue("rentType", val)
                          }
                        />
                      ) : (
                        <Text>{rentTypeText[initVal?.rentType]}</Text>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        현업종----
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("curUpjong").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("curUpjong", val)
                          }
                          placeholder="현업종을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.curUpjong}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        현업종
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("curUpjong").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("curUpjong", val)
                          }
                          placeholder="현업종을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.curUpjong}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        실평수
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("size").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("size", val)}
                          placeholder="평을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.size}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        층수
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("floor").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) => setFieldValue("floor", val)}
                          placeholder="층수를 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.floor}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        권리금
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("premiumFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("premiumFee", val)
                          }
                          placeholder="권리금을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.premiumFee}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        관리비
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("manageFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("manageFee", val)
                          }
                          placeholder="관리비를 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.manageFee}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        임대료
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("rentalFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("rentalFee", val)
                          }
                          placeholder="임대료를 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.rentalFee}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        보증금
                      </FormLabel>
                      {fixMode ? (
                        <Input
                          value={getFieldProps("depositFee").value}
                          inputProps={{ w: "100%" }}
                          onChange={(val: any) =>
                            setFieldValue("depositFee", val)
                          }
                          placeholder="보증금을 입력하세요."
                        />
                      ) : (
                        <Heading as="h3" mb="2rem" variant="detailTitle">
                          {initVal?.depositFee}
                        </Heading>
                      )}
                    </FormControl>
                  </Flex>
                  <Flex w="100%" align="center">
                    <FormControl display="flex" flexDirection="row">
                      <FormLabel
                        display="flex"
                        alignItems="flex-start"
                        m="0"
                        minW="4.4rem"
                        w="30%"
                        flex="none"
                        textStyle="base"
                        fontSize="xs"
                        fontWeight="strong"
                      >
                        주소
                      </FormLabel>
                      {!update || fixMode ? (
                        <Flex w="100%" direction="column" gap="0.5rem">
                          <InputAddr
                            fieldKey={"addr"}
                            hasIcon={false}
                            btnProps={{
                              variant: "filterSearch",
                              width: "4rem",
                              lineHeight: "1",
                            }}
                            value={getFieldProps("addr").value}
                            onChange={(val: any) => {
                              const geocoder =
                                // @ts-ignore
                                new kakao.maps.services.Geocoder();

                              geocoder.addressSearch(
                                val,
                                (result: any, status: any) => {
                                  if (status === "OK") {
                                    const { x, y } = result[0];
                                    setFieldValue("addr", val);
                                    setFieldValue("lat", y);
                                    setFieldValue("lng", x);

                                    addMarker(
                                      new naver.maps.Marker({
                                        map: state.map,
                                        position: {
                                          lat: y,
                                          lng: x,
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
                          />
                          <Input
                            value={getFieldProps("addrDetail").value}
                            onChange={(val: any) =>
                              setFieldValue("addrDetail", val)
                            }
                            placeholder="상세주소를 입력하세요."
                          />
                        </Flex>
                      ) : (
                        <Text>
                          {initVal?.addr}
                          {initVal?.addrDetail}
                        </Text>
                      )}
                    </FormControl>
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

export default FormRentEditor;
