//  Lib
import { forwardRef, useContext, useEffect, useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  IconButton,
  Input,
  Button,
  Tooltip,
  useDisclosure,
  List,
  ListItem,
} from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import { Select } from "@components/common/Select";
import { InputAddr } from "@components/common/Input";
//  Api
import { apiCommon } from "@api/bizSub/config";
//  Util
import {
  phoneRegExp,
  validateChkCode,
  validateNeedStr,
  validatePhone,
  validateStoreStatus,
} from "@util/valid/validation";
//  Icon
import { IcoClose, IcoSearch } from "@assets/icons/icon";
import markerCreate from "@assets/icons/marker_create.png";

const FormStoreEditor = forwardRef(
  (
    props: {
      initVal: any;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, setValues } = props;
    const { checkCode, getAvailableBsDisLink } = apiCommon;
    const { state, dispatch } = useContext(NaverMapContext);
    const [searchText, setSearchText] = useState<string>("");
    const [searchLi, setSearchLi] = useState<any[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [type, setType] = useState<"name" | "code">("name");
    const [isChckId, setIsChKId] = useState<{
      text: string;
      chk: boolean;
      state: "duple" | "pass" | "notWork" | "ready";
    }>({
      text: "",
      chk: false,
      state: "ready",
    });

    const addMarker = (marker: naver.maps.Marker) => {
      dispatch({ type: "remove_object", id: "createErp" });
      dispatch({ type: "add_object", object: marker, id: "createErp" });
    };

    const removeMarker = () => {
      dispatch({ type: "remove_object", id: "createErp" });
    };

    useEffect(() => {
      if (searchLi && searchLi.length > 0) onOpen();
    }, [searchLi]);

    useEffect(() => {
      return () => {
        removeMarker();
      };
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
          key="storeEditor"
          innerRef={ref}
          initialValues={initVal}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values);
            setValues(values);
          }}
        >
          {({ handleSubmit, getFieldProps }) => {
            return (
              <Form
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmit(values);
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
                    <EditorLabel text="매장명" need={true} />
                    <Field name="storeName" validate={validateNeedStr}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.storeName && form.touched.storeName
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="매장 명을 입력하세요."
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
                    direction="column"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <Flex w="100%">
                      <EditorLabel text="매장코드" need={true} />
                      <Flex gap="0.5rem">
                        <Field
                          name="storeCode"
                          validate={(val: any) =>
                            validateChkCode(val, isChckId.chk)
                          }
                        >
                          {({ field, form }: any) => (
                            <Fragment>
                              <FormControl
                                isInvalid={
                                  form.errors.storeCode &&
                                  form.touched.storeCode
                                }
                              >
                                <Input
                                  variant="modalEditor"
                                  placeholder="코드를 입력하세요."
                                  isRequired={true}
                                  color={
                                    isChckId.state === "duple"
                                      ? "system.default.red"
                                      : "font.mrimary"
                                  }
                                  {...field}
                                  value={field.value}
                                  onChange={(e) => {
                                    if (
                                      isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "pass" &&
                                      isChckId.text !== e.target.value
                                    ) {
                                      setIsChKId({
                                        ...isChckId,
                                        chk: false,
                                        state: "notWork",
                                      });
                                    } else if (
                                      !isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "notWork" &&
                                      isChckId.text === e.target.value
                                    ) {
                                      setIsChKId({
                                        ...isChckId,
                                        chk: true,
                                        state: "pass",
                                      });
                                    } else if (
                                      !isChckId.chk &&
                                      isChckId.text &&
                                      isChckId.state === "duple" &&
                                      isChckId.text !== e.target.value
                                    ) {
                                      setIsChKId({
                                        text: "",
                                        chk: false,
                                        state: "notWork",
                                      });
                                    }
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <Button
                                variant="filterSearch"
                                onClick={() => {
                                  const code = getFieldProps("storeCode").value;
                                  checkCode({
                                    type: "store",
                                    code: code,
                                  }).then((res: any) => {
                                    console.log(res);
                                    if (res?.data?.result === false) {
                                      console.log({
                                        text: code,
                                        chk: true,
                                        state: "pass",
                                      });
                                      setIsChKId({
                                        text: code,
                                        chk: true,
                                        state: "pass",
                                      });
                                      form.setFieldTouched("storeCode", true);
                                      form.setFieldValue(code);
                                    } else {
                                      !isChckId.chk &&
                                        setIsChKId({
                                          text: getFieldProps("storeCode")
                                            .value,
                                          chk: false,
                                          state: "duple",
                                        });
                                    }
                                  });
                                }}
                              >
                                중복확인
                              </Button>
                            </Fragment>
                          )}
                        </Field>
                      </Flex>
                    </Flex>
                    <Text
                      w="100%"
                      textStyle="base"
                      fontSize="xs"
                      textAlign="right"
                      lineHeight="1.5rem"
                      fontWeight={
                        isChckId.state === "duple"
                          ? "strong"
                          : isChckId.state === "pass"
                          ? "strong"
                          : "regular"
                      }
                      color={
                        isChckId.state === "duple"
                          ? "system.accessible.red"
                          : isChckId.state === "pass"
                          ? "font.primary"
                          : "font.secondary"
                      }
                    >
                      {isChckId.state === "duple"
                        ? "중복된 매장코드입니다."
                        : isChckId.state === "pass"
                        ? "사용 가능한 코드입니다."
                        : "매장코드 중복 확인을 진행해주세요."}
                    </Text>
                  </Flex>
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                  >
                    <EditorLabel text="매장상태" need={true} />
                    <Field name="storeStatus" validate={validateStoreStatus}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.storeStatus && form.touched.storeStatus
                          }
                        >
                          <Select
                            opBaseTxt="text"
                            opBaseId="value"
                            opBaseKey="value"
                            data={[
                              { text: "입점", value: "open" },
                              { text: "폐점", value: "close" },
                              { text: "휴점", value: "rest" },
                              { text: "대기", value: "ready" },
                              { text: "기타", value: "etc" },
                            ]}
                            variant="modalEditor"
                            value={form.getFieldProps("storeStatus").value}
                            onChange={(val: any) => {
                              form.setFieldTouched("storeStatus", true);
                              form.setFieldValue("storeStatus", val);
                            }}
                            isRequired={true}
                            isInvalid={
                              form.errors.storeStatus &&
                              form.touched.storeStatus
                            }
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
                      <EditorLabel text="매장타입" />
                      <Field name="storeType">
                        {({ field, form }: any) => (
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
                              value={form.getFieldProps("storeType").value}
                              onChange={(val: any) => {
                                form.setFieldTouched("storeType", true);
                                form.setFieldValue("storeType", val);
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
                  >
                    <EditorLabel text="매장연락처" />
                    <Field name="storePhone" validate={validatePhone}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.storePhone && form.touched.storePhone
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="매장연락처를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value || ""}
                            onChange={(e: any) => {
                              if (phoneRegExp.test(e.target.value)) {
                                form.setFieldTouched("storePhone", true);
                                form.setFieldValue(
                                  "storePhone",
                                  e.target.value
                                );
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
                    <EditorLabel text="사업자등록번호" />
                    <Field name="bsNum" validate={validatePhone}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.bsNum && form.touched.bsNum}
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="사업자 등록번호를 입력하세요."
                            isRequired={false}
                            {...field}
                            value={field.value || ""}
                            onChange={(e: any) => {
                              if (phoneRegExp.test(e.target.value)) {
                                form.setFieldTouched("bsNum", true);
                                form.setFieldValue("bsNum", e.target.value);
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
                    <EditorLabel text="대표자" need={true} />
                    <Field name="ownerName" validate={validateNeedStr}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.ownerName && form.touched.ownerName
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="대표자 이름을 입력하세요."
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
                    <EditorLabel text="대표자 연락처" need={true} />
                    <Field name="ownerPhone" validate={validateNeedStr}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.ownerPhone && form.touched.ownerPhone
                          }
                        >
                          <Input
                            variant="modalEditor"
                            placeholder="대표자 연락처를 입력하세요."
                            isRequired={true}
                            {...field}
                            value={field.value || ""}
                            onChange={(e: any) => {
                              if (phoneRegExp.test(e.target.value)) {
                                form.setFieldTouched("ownerPhone", true);
                                form.setFieldValue(
                                  "ownerPhone",
                                  e.target.value
                                );
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
                      <Field name="addrNew" validate={validateNeedStr}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.addrNew && form.touched.addrNew
                            }
                          >
                            <InputAddr
                              fieldKey={"addrNew"}
                              hasIcon={false}
                              btnProps={{
                                variant: "filterSearch",
                                width: "4rem",
                                lineHeight: "1",
                              }}
                              value={form.getFieldProps("addrNew").value}
                              onChange={(val: any) => {
                                const geocoder =
                                  // @ts-ignore
                                  new kakao.maps.services.Geocoder();

                                geocoder.addressSearch(
                                  val,
                                  (result: any, status: any) => {
                                    if (status === "OK") {
                                      const { x, y, address, road_address } =
                                        result[0];

                                      form.setFieldValue(
                                        "addrNew",
                                        road_address.address_name
                                      );
                                      form.setFieldValue(
                                        "addrOld",
                                        address.address_name
                                      );
                                      form.setFieldValue(
                                        "addrCode",
                                        address.b_code
                                      );
                                      form.setFieldValue(
                                        "addrHCode",
                                        address.h_code
                                      );
                                      form.setFieldValue("lat", Number(y));
                                      form.setFieldValue("lng", Number(x));
                                      setTimeout(() =>
                                        form.setFieldTouched("addrNew", true)
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
                        )}
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
                  <Flex
                    pb="0.75rem"
                    w="100%"
                    direction="column"
                    borderBottom="1px solid"
                    borderColor="neutral.gray8"
                    gap="0.5rem"
                  >
                    <EditorLabel text="연동상권" />
                    <Field name="linkBsDis">
                      {({ field, form }: any) => (
                        <FormControl display="flex" flexDirection="row">
                          <Flex
                            position="relative"
                            w="100%"
                            direction="column"
                            gap="0.25rem"
                            wrap="nowrap"
                          >
                            <Tooltip
                              hasArrow
                              isOpen={isOpen}
                              isDisabled={false}
                              placement="bottom"
                              label={TooltipContent(
                                searchLi,
                                field,
                                form,
                                onClose
                              )}
                              bottom="0rem"
                              p="0.5rem 1rem"
                              width="100%"
                              bgColor="conditional.popOver"
                              borderRadius="2px"
                              boxShadow="none"
                              filter="drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))"
                              textStyle="base"
                              fontWeight="regular"
                              fontSize="xs"
                              lineHeight="1.375rem"
                              color="font.primary"
                              pointerEvents="all"
                            >
                              <Flex gap="0.5rem">
                                <Select
                                  data={[
                                    { text: "상권명", value: "name" },
                                    { text: "상권코드", value: "code" },
                                  ]}
                                  opBaseTxt="text"
                                  opBaseId="value"
                                  opBaseKey="value"
                                  variant="modalEditor"
                                  value={type}
                                  onChange={(val: any) => {
                                    setType(val);
                                  }}
                                />
                                <Input
                                  variant="modalEditor"
                                  w="100%"
                                  zIndex="2"
                                  background="#ffffff"
                                  _focus={{ background: "#ffffff" }}
                                  value={searchText}
                                  onChange={(e: any) =>
                                    setSearchText(e.target.value)
                                  }
                                  placeholder="상권을 검색하세요"
                                />
                                <Button
                                  variant="filterSearch"
                                  onClick={() =>
                                    getAvailableBsDisLink({
                                      type: type,
                                      text: searchText,
                                      brandCode: "3",
                                    }).then((res: any) => {
                                      if (res.data && res.data.length > 0) {
                                        setSearchLi(res.data);
                                      }
                                    })
                                  }
                                >
                                  <IcoSearch />
                                </Button>
                              </Flex>
                            </Tooltip>
                            {getFieldProps("linkBsDis").value &&
                              getFieldProps("linkBsDis").value.length > 0 && (
                                <Flex w="100%" gap="0.5rem" wrap="wrap">
                                  {getFieldProps("linkBsDis").value?.map(
                                    (link: any, idx: number) => {
                                      const { bsDisCode, bsDisName } = link;

                                      return (
                                        <Flex
                                          position="relative"
                                          p="0 0.5rem 0"
                                          h="1.375rem"
                                          display="flex"
                                          align="center"
                                          gap="0.25rem"
                                          bgColor={
                                            idx % 2 === 0
                                              ? "#FFFBE6"
                                              : "#E6FFFB"
                                          }
                                          border="1px solid"
                                          borderRadius="2px"
                                          borderColor={
                                            idx % 2 === 0
                                              ? "#FFE58F"
                                              : "#87E8DE"
                                          }
                                          fontFamily="main"
                                          fontSize="xs"
                                          lineHeight="1.5rem"
                                          color={
                                            idx % 2 === 0
                                              ? "#FAAD14"
                                              : "#13C2C2"
                                          }
                                        >
                                          {bsDisName}
                                          <IconButton
                                            bgColor="inherit"
                                            color="font.secondary"
                                            _hover={{
                                              bgColor: "primary.type6",
                                            }}
                                            icon={
                                              <IcoClose
                                                width="0.75rem"
                                                height="0.75rem"
                                                color="inherit"
                                              />
                                            }
                                            aria-label="삭제버튼"
                                            onClick={() => {
                                              bsDisCode;
                                              const origin =
                                                form.getFieldProps(
                                                  "linkBsDis"
                                                ).value;

                                              if (origin && origin.length > 0) {
                                                const filter = origin.filter(
                                                  (li: any) =>
                                                    li.bsDisCode !== bsDisCode
                                                );

                                                form.setFieldTouched(
                                                  "linkBsDis",
                                                  true
                                                );
                                                form.setFieldValue(
                                                  "linkBsDis",
                                                  filter
                                                );
                                              }
                                            }}
                                          />
                                        </Flex>
                                      );
                                    }
                                  )}
                                </Flex>
                              )}
                          </Flex>
                        </FormControl>
                      )}
                    </Field>
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

const TooltipContent = (
  searchLi: any[],
  field: any,
  form: any,
  onClose: any
) => {
  return (
    <Flex w="100%" overflow="hidden" align="center">
      {searchLi && searchLi.length > 0 ? (
        <List
          w="10rem"
          h="5rem"
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
        >
          {searchLi.map((li: any, idx: number) => {
            const { bsDisCode, bsDisName } = li;

            return (
              <ListItem
                key={`searchList-${idx}`}
                cursor="pointer"
                _hover={{
                  color: "primary.type8",
                  fontWeight: "strong",
                }}
                onClick={() => {
                  const origin = form.getFieldProps("linkBsDis").value;

                  if (origin && origin.length > 0) {
                    const isAlready = origin.filter(
                      (li: any) => li.bsDisCode === bsDisCode
                    );

                    if (isAlready.length > 0) {
                      onClose();
                    } else {
                      origin.push({
                        bsDisCode: bsDisCode,
                        bsDisName: bsDisName,
                      });
                      form.setFieldTouched("linkBsDis", true);
                      form.setFieldValue("linkBsDis", origin);
                      onClose();
                    }
                  } else {
                    origin.push({
                      bsDisCode: bsDisCode,
                      bsDisName: bsDisName,
                    });
                    form.setFieldTouched("linkBsDis", true);
                    form.setFieldValue("linkBsDis", origin);
                    onClose();
                  }
                }}
              >
                {bsDisName}
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Text>"검색결과가 없습니다."</Text>
      )}
    </Flex>
  );
};

export default FormStoreEditor;
