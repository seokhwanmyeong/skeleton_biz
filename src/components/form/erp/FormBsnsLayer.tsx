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
import { Input, InputAddr } from "@components/common/Input";
import { RadioBox } from "@components/common/RadioBox";
import { IcoClose, IcoSearch } from "@assets/icons/icon";
import { forwardRef, useEffect, useState } from "react";

const storeStatusText: any = {
  statusOpen: "입점",
  statusClose: "폐점",
  statusRest: "휴점",
  statusReady: "대기",
  statusEtc: "기타",
};
const storeRankText: any = {
  rankA: "A타입",
  rankB: "B타입",
  rankC: "C타입",
  rankD: "D타입",
  rankE: "E타입",
};

const FormBsnsLayer = forwardRef(
  (
    props: {
      initVal: any;
      update?: boolean;
      fixMode?: boolean;
      setValues?: any;
    },
    ref: any
  ) => {
    const { initVal, update = false, fixMode = false, setValues } = props;

    return (
      <>
        <Flex w="100%">
          <Text
            w="20%"
            textAlign="center"
            fontWeight="strong"
            fontSize="xs"
            lineHeight="1.0625rem"
          >
            번호
          </Text>
          <Text
            w="20%"
            textAlign="center"
            fontWeight="strong"
            fontSize="xs"
            lineHeight="1.0625rem"
          >
            구분
          </Text>
          <Text
            w="20%"
            textAlign="center"
            fontWeight="strong"
            fontSize="xs"
            lineHeight="1.0625rem"
          >
            중복여부
          </Text>
          <Text
            w="20%"
            textAlign="center"
            fontWeight="strong"
            fontSize="xs"
            lineHeight="1.0625rem"
          >
            매장 필수 연동
          </Text>
          <Text
            w="20%"
            textAlign="center"
            fontWeight="strong"
            fontSize="xs"
            lineHeight="1.0625rem"
          >
            컬러
          </Text>
        </Flex>
        <Flex h="100%">
          <Formik
            key="storeEditor"
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
                  {initVal?.map((li: any, idx: number) => {
                    console.log(li);
                    return (
                      <Flex
                        mb="0.5rem"
                        h="2.5rem"
                        border="1px solid"
                        borderColor="#D8D8DC"
                        borderRadius="12px"
                        align="center"
                      >
                        <Flex
                          w="20%"
                          justify="center"
                          fontWeight="regular"
                          fontSize="xs"
                        >
                          {idx + 1}
                        </Flex>
                        <Flex w="20%" justify="center">
                          {fixMode ? (
                            <FormControl
                              variant="create"
                              justifyContent="center"
                            >
                              <Input
                                value={getFieldProps(`${idx}.bsnsName`).value}
                                inputProps={{ w: "50%" }}
                                onChange={(val: any) =>
                                  setFieldValue(`${idx}.bsnsName`, val)
                                }
                              />
                            </FormControl>
                          ) : (
                            <Flex fontWeight="regular" fontSize="xs">
                              {li.bsnsName}
                            </Flex>
                          )}
                        </Flex>
                        <Flex w="20%" justify="center">
                          <Flex gap="1rem">
                            {fixMode ? (
                              <>
                                <Button
                                  width="2.375rem"
                                  height="1.5rem"
                                  background="#ffffff"
                                  border="1px solid #D9D9D9"
                                  borderRadius="4px"
                                  color="font.title"
                                  fontWeight="medium"
                                  fontSize="xs"
                                  isActive={
                                    getFieldProps(`${idx}.duplicate`).value
                                  }
                                  onClick={() => {
                                    setFieldValue(`${idx}.duplicate`, true);
                                  }}
                                  _active={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                  _hover={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  YES
                                </Button>
                                <Button
                                  isActive={
                                    !getFieldProps(`${idx}.duplicate`).value
                                  }
                                  onClick={() => {
                                    setFieldValue(`${idx}.duplicate`, false);
                                  }}
                                  width="2.375rem"
                                  height="1.5rem"
                                  background="#ffffff"
                                  border="1px solid #D9D9D9"
                                  borderRadius="4px"
                                  color="font.title"
                                  fontWeight="medium"
                                  fontSize="xs"
                                  _active={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                  _hover={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  NO
                                </Button>
                              </>
                            ) : (
                              <Button
                                isDisabled
                                width="2.375rem"
                                height="1.5rem"
                                background="#e5e5e5"
                                border="1px solid #D9D9D9"
                                borderRadius="4px"
                                fontWeight="regular"
                                fontSize="xs"
                                color="rgba(0, 0, 0, 0.25)"
                              >
                                {li.duplicate ? "YES" : "NO"}
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                        <Flex w="20%" justify="center">
                          <Flex gap="1rem">
                            {fixMode ? (
                              <>
                                <Button
                                  isActive={
                                    getFieldProps(`${idx}.storeLink`).value
                                  }
                                  onClick={() => {
                                    setFieldValue(`${idx}.storeLink`, true);
                                  }}
                                  width="2.375rem"
                                  height="1.5rem"
                                  background="#ffffff"
                                  border="1px solid #D9D9D9"
                                  borderRadius="4px"
                                  color="font.title"
                                  fontWeight="medium"
                                  fontSize="xs"
                                  _active={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                  _hover={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  YES
                                </Button>
                                <Button
                                  isActive={
                                    !getFieldProps(`${idx}.storeLink`).value
                                  }
                                  onClick={() => {
                                    setFieldValue(`${idx}.storeLink`, false);
                                  }}
                                  width="2.375rem"
                                  height="1.5rem"
                                  background="#ffffff"
                                  border="1px solid #D9D9D9"
                                  borderRadius="4px"
                                  color="font.title"
                                  fontWeight="medium"
                                  fontSize="xs"
                                  _active={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                  _hover={{
                                    background: "rgba(173, 139, 0, 1)",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  NO
                                </Button>
                              </>
                            ) : (
                              <Button
                                isDisabled
                                width="2.375rem"
                                height="1.5rem"
                                background="#e5e5e5"
                                border="1px solid #D9D9D9"
                                borderRadius="4px"
                                fontWeight="regular"
                                fontSize="xs"
                                color="rgba(0, 0, 0, 0.25)"
                              >
                                {li.storeLink ? "YES" : "NO"}
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                        <Flex w="20%" justify="center">
                          <Box
                            w="1.5rem"
                            h="1.5rem"
                            borderRadius="50%"
                            bgColor={li.color}
                          ></Box>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Form>
              );
              // return (
              //   <Form
              //     onSubmit={(values) => {
              //       console.log(values);
              //       handleSubmit();
              //     }}
              //     style={{ width: "100%" }}
              //   >
              //     <Flex>
              //       <Flex
              //         p="0 1.4rem"
              //         w="50%"
              //         flexDirection="column"
              //         gap="1.625rem"
              //       >
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             매장상태
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Select
              //               data={[
              //                 { text: "입점", value: "statusOpen" },
              //                 { text: "폐점", value: "statusClose" },
              //                 { text: "휴점", value: "statusRest" },
              //                 { text: "대기", value: "statusReady" },
              //                 { text: "기타", value: "statusEtc" },
              //               ]}
              //               value={getFieldProps("storeStatus").value}
              //               opBaseTxt="text"
              //               opBaseId="value"
              //               opBaseKey="value"
              //               onChange={(val: any) =>
              //                 setFieldValue("storeStatus", val)
              //               }
              //             />
              //           ) : (
              //             <Text>{storeStatusText[initVal?.storeStatus]}</Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="2rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             매장타입
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Select
              //               data={[
              //                 { text: "A타입", value: "rankA" },
              //                 { text: "B타입", value: "rankB" },
              //                 { text: "C타입", value: "rankC" },
              //                 { text: "D타입", value: "rankD" },
              //                 { text: "E타입", value: "rankE" },
              //               ]}
              //               value={getFieldProps("storeRank").value}
              //               opBaseTxt="text"
              //               opBaseId="value"
              //               opBaseKey="value"
              //               onChange={(val: any) =>
              //                 setFieldValue("storeRank", val)
              //               }
              //             />
              //           ) : (
              //             <Text>{storeRankText[initVal?.storeRank]}</Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             매장연락처
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Input
              //               value={getFieldProps("phone").value}
              //               inputProps={{ w: "100%" }}
              //               onChange={(val: any) => setFieldValue("phone", val)}
              //               placeholder="매장연락처를 입력하세요."
              //             />
              //           ) : (
              //             <Text>{initVal?.phone}</Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             사업자등록번호
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Input
              //               value={getFieldProps("biz_number").value}
              //               inputProps={{ w: "100%" }}
              //               onChange={(val: any) =>
              //                 setFieldValue("biz_number", val)
              //               }
              //               placeholder="사업자 등록번호를 입력하세요."
              //             />
              //           ) : (
              //             <Text>{initVal?.biz_number}</Text>
              //           )}
              //         </FormControl>
              //       </Flex>
              //       <Divider
              //         orientation="vertical"
              //         m="0.5rem 1.4rem"
              //         h="auto"
              //         borderColor="font.primary"
              //         borderLeftWidth="0"
              //       />
              //       <Flex
              //         p="0 1.4rem"
              //         w="50%"
              //         flexDirection="column"
              //         gap="1.625rem"
              //       >
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             대표자
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Input
              //               value={getFieldProps("owner_name").value}
              //               inputProps={{ w: "100%" }}
              //               onChange={(val: any) =>
              //                 setFieldValue("owner_name", val)
              //               }
              //               placeholder="대표자 이름을 입력하세요."
              //             />
              //           ) : (
              //             <Text>{initVal?.owner_name}</Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             대표자 연락처
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Input
              //               value={getFieldProps("owner_phone").value}
              //               inputProps={{ w: "100%" }}
              //               onChange={(val: any) =>
              //                 setFieldValue("owner_phone", val)
              //               }
              //               placeholder="대표자 연락처를 입력하세요."
              //             />
              //           ) : (
              //             <Text>{initVal?.owner_phone}</Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             주소
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Flex w="100%" direction="column" gap="0.5rem">
              //               <InputAddr
              //                 fieldKey={"addr"}
              //                 value={getFieldProps("addr").value}
              //                 onChange={(val: any) =>
              //                   setFieldValue("addr", val)
              //                 }
              //               />
              //               <Input
              //                 value={getFieldProps("addrDetail").value}
              //                 onChange={(val: any) =>
              //                   setFieldValue("addrDetail", val)
              //                 }
              //                 placeholder="상세주소를 입력하세요."
              //               />
              //             </Flex>
              //           ) : (
              //             <Text>
              //               {initVal?.addr}
              //               {initVal?.addrDetail}
              //             </Text>
              //           )}
              //         </FormControl>
              //         <FormControl variant="create">
              //           <FormLabel
              //             display="flex"
              //             alignItems="center"
              //             minW="4.4rem"
              //             w="30%"
              //             flex="none"
              //           >
              //             연동상권
              //           </FormLabel>
              //           {!update || fixMode ? (
              //             <Flex position="relative" w="100%" direction="column">
              //               <Input
              //                 inputProps={{
              //                   w: "100%",
              //                   zIndex: 2,
              //                   background: "#ffffff",
              //                   _focus: {
              //                     background: "#ffffff",
              //                   },
              //                 }}
              //                 onChange={(val: any) => console.log(val)}
              //                 placeholder="상권을 검색하세요"
              //               />
              //               <Select
              //                 data={[
              //                   { text: "매장명", value: "storeName" },
              //                   { text: "매장코드", value: "storeCode" },
              //                   { text: "대표자", value: "ownerName" },
              //                 ]}
              //                 defalutValue="storeName"
              //                 opBaseTxt="text"
              //                 opBaseId="value"
              //                 opBaseKey="value"
              //                 onChange={(val: any) =>
              //                   setFieldValue("type", val)
              //                 }
              //                 selectProps={{
              //                   position: "absolute",
              //                   top: 0,
              //                   left: 0,
              //                   w: "100%",
              //                   zIndex: 1,
              //                 }}
              //               />
              //               {getFieldProps("linkBsns").value && (
              //                 <Flex gap="0.5rem">
              //                   {getFieldProps("linkBsns").value?.map(
              //                     (link: any) => {
              //                       console.log(link);
              //                       return (
              //                         <Flex
              //                           position="relative"
              //                           p="1px 0.5rem 0"
              //                           display="flex"
              //                           align="center"
              //                           bgColor="primary.type2"
              //                           fontFamily="main"
              //                           fontSize="xs"
              //                           lineHeight="1.5rem"
              //                           color="primary.type7"
              //                         >
              //                           {link.name}
              //                           <IconButton
              //                             bgColor="inherit"
              //                             _hover={{
              //                               bgColor: "primary.type6",
              //                             }}
              //                             icon={
              //                               <IcoClose color='color="inherit"' />
              //                             }
              //                             aria-label="삭제버튼"
              //                           />
              //                         </Flex>
              //                       );
              //                     }
              //                   )}
              //                 </Flex>
              //               )}
              //             </Flex>
              //           ) : (
              //             <Flex>
              //               {initVal?.linkBsns?.map((li: any) => (
              //                 <Text key={li.code} mr="1rem">
              //                   {li.name}
              //                 </Text>
              //               ))}
              //             </Flex>
              //           )}
              //         </FormControl>
              //       </Flex>
              //     </Flex>
              //   </Form>
              // );
            }}
          </Formik>
        </Flex>
      </>
    );
  }
);

export default FormBsnsLayer;
