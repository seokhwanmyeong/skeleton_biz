//  Lib
import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
import { RadioBox } from "@components/common/RadioBox";
import { Select } from "@components/common/Select";
import { Input } from "@components/common/Input";
import ModalStoreEditor from "@components/modal/map/ModalStoreEditor";
import ModalRentEditor from "@components/modal/map/ModalRentEditor";
import ModalBsnsDEditor from "@components/modal/map/ModalBsnsDEditor";
//  Icon
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  IcoBsnsD,
  IcoDoubleSquere,
  IcoPlus,
  IcoRent,
  IcoStore,
  IcoStore02,
  IcoPlusSquare02,
} from "@assets/icons/icon";
//  State
import {
  infoComErpStore,
  infoComErpBsnsD,
  infoComErpRent,
  resetErp,
} from "@src/states/sementicMap/stateFilter";

type Props = {
  toolOpen: any;
  areaCode?: string;
  path?: any;
};

const ErpFilter = ({ toolOpen, areaCode, path }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [openIdx, setOpenIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(1);
  const [erpStore, setErpStore] = useRecoilState(infoComErpStore);
  const resetStore = useResetRecoilState(infoComErpStore);
  const [erpBsnsD, setErpBsnsD] = useRecoilState(infoComErpBsnsD);
  const resetBsnsD = useResetRecoilState(infoComErpBsnsD);
  const [erpRent, setErpRent] = useRecoilState(infoComErpRent);
  const resetRent = useResetRecoilState(infoComErpRent);
  const reset = useResetRecoilState(resetErp);

  useEffect(() => {
    console.log(areaCode);
  }, []);

  //  매장 필터 변화 및 액티브
  useEffect(() => {
    const { filter } = erpStore;
    if (
      filter.text ||
      filter.storeRank.length !== 0 ||
      filter.storeStatus.length !== 0 ||
      filter.salesRange.start ||
      filter.salesRange.end
    ) {
      console.log("진입");
      setErpStore({
        ...erpStore,
        active: true,
        data: [],
      });
    } else {
      resetStore();
    }
  }, [erpStore.filter]);

  //  상권 필터 변화 및 액티브
  useEffect(() => {
    const { filter } = erpBsnsD;

    if (filter.text || filter.bsnsType.length !== 0) {
      setErpBsnsD({
        ...erpBsnsD,
        active: true,
        data: [],
      });
    } else {
      resetBsnsD();
    }
  }, [erpBsnsD.filter]);

  //  매물 필터 변화 및 액티브
  useEffect(() => {
    const { filter } = erpRent;

    if (filter.text || filter.rentRank.length !== 0) {
      setErpRent({
        ...erpRent,
        active: true,
        data: [],
      });
    } else {
      resetRent();
    }
  }, [erpRent.filter]);

  useEffect(() => {
    if (isOpen && modalIdx === 2) {
      toolOpen(true);
    } else {
      toolOpen(false);
    }
  }, [isOpen]);

  return (
    <Flex
      pos="absolute"
      bottom="calc(1% + 4.5rem)"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      gap="1.25rem"
    >
      {/* ============================== infoCom의 필터 버튼 ============================== */}
      <Button
        variant="filterTop02"
        isActive={erpStore.active}
        onClick={() => {
          if (openIdx === 1) {
            setOpenIdx(0);
          } else {
            setOpenIdx(1);
          }
        }}
      >
        <Box>
          <IcoStore color="#262323cc" />
        </Box>
      </Button>
      <Button
        variant="filterTop02"
        isActive={erpBsnsD.active}
        onClick={() => {
          if (openIdx === 2) {
            setOpenIdx(0);
          } else {
            setOpenIdx(2);
          }
        }}
      >
        <Box>
          <IcoBsnsD color="#262323cc" />
        </Box>
      </Button>
      <Button
        variant="filterTop02"
        isActive={erpRent.active}
        onClick={() => {
          if (openIdx === 3) {
            setOpenIdx(0);
          } else {
            setOpenIdx(3);
          }
        }}
      >
        <Box>
          <IcoRent color="#262323cc" />
        </Box>
      </Button>
      <Button
        variant="filterTop02"
        // isActive={household.active || filterSale.active || upjongCnt.active}
        onClick={() => {
          if (openIdx === 4) {
            setOpenIdx(0);
          } else {
            setOpenIdx(4);
          }
        }}
      >
        <Box>
          <IcoPlus color="#262323cc" />
        </Box>
      </Button>
      {/* ============================== infoCom의 필터 박스 ============================== */}
      {openIdx === 1 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 1 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex p="0 1rem" justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                pr="1rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                매장조회
              </Heading>
              <IcoStore02 color="font.title" />
            </Flex>
            <Switch
              isChecked={erpStore.active}
              onChange={() => {
                setErpStore({ ...erpStore, active: !erpStore.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 0.5rem" width="100%" height="4px" />
          <Flex p="0 1rem" direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                검색
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <Select
                  data={[
                    { text: "매장명", value: "storeName" },
                    { text: "매장코드", value: "storeCode" },
                  ]}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  value={erpStore.filter.type}
                  onChange={(val: any) => {
                    setErpStore({
                      ...erpStore,
                      filter: { ...erpStore.filter, type: val },
                    });
                  }}
                  selectProps={{ w: "20%" }}
                />
                <Input
                  inputProps={{ w: "50%" }}
                  placeholder={"매장코드를 입력해주세요"}
                  value={erpStore.filter.text}
                  onChange={(val: any) => {
                    setErpStore({
                      ...erpStore,
                      filter: { ...erpStore.filter, text: val },
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                타입
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "A타입", value: "rankA" },
                  { text: "B타입", value: "rankB" },
                  { text: "C타입", value: "rankC" },
                  { text: "D타입", value: "rankD" },
                  { text: "E타입", value: "rankE" },
                ]}
                chkValue={erpStore.filter.storeRank}
                activeTotal={true}
                onChange={(val: any) => {
                  setErpStore({
                    ...erpStore,
                    filter: { ...erpStore.filter, storeRank: val },
                  });
                  return null;
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                상태
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "입점", value: "statusOpen" },
                  { text: "휴점", value: "statusRest" },
                  { text: "폐점", value: "statusClose" },
                  { text: "대기", value: "statusReady" },
                  { text: "기타", value: "statusEtc" },
                ]}
                chkValue={erpStore.filter.storeStatus}
                activeTotal={true}
                onChange={(val: any) => {
                  setErpStore({
                    ...erpStore,
                    filter: { ...erpStore.filter, storeStatus: val },
                  });
                  return null;
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                매출
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <Select
                  data={[
                    { text: "평균월매출", value: "avgM" },
                    { text: "평균일매출", value: "avgD" },
                    { text: "누적매출", value: "sum" },
                  ]}
                  defalutValue="avgM"
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  value={erpStore.filter.salesType}
                  onChange={(val: any) => {
                    setErpStore({
                      ...erpStore,
                      filter: { ...erpStore.filter, salesType: val },
                    });
                    return null;
                  }}
                  selectProps={{ w: "30%", lineHeight: "1.4rem" }}
                />
                <Flex w="76%" gap="1rem">
                  <Input
                    inputProps={{ w: "100%" }}
                    value={erpStore.filter.salesRange.start}
                    onChange={(val: any) =>
                      setErpStore({
                        ...erpStore,
                        filter: {
                          ...erpStore.filter,
                          salesRange: {
                            start: val,
                            end: erpStore.filter.salesRange.end,
                          },
                        },
                      })
                    }
                  />
                  <Text>~</Text>
                  <Input
                    inputProps={{ w: "100%" }}
                    value={erpStore.filter.salesRange.end}
                    onChange={(val: any) =>
                      setErpStore({
                        ...erpStore,
                        filter: {
                          ...erpStore.filter,
                          salesRange: {
                            start: erpStore.filter.salesRange.start,
                            end: val,
                          },
                        },
                      })
                    }
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Box
            zIndex={-1}
            position="absolute"
            top={0}
            left={0}
            display="block"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.75)"
            backdropFilter="blur(5px)"
            userSelect="none"
          ></Box>
        </Flex>
      ) : openIdx === 2 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 2 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex p="0 1rem" justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                pr="1rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                상권조회
              </Heading>
              <IcoDoubleSquere color="font.title" />
            </Flex>
            <Switch
              isChecked={erpBsnsD.active}
              onChange={() => {
                setErpBsnsD({ ...erpBsnsD, active: !erpBsnsD.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 0.5rem" width="100%" height="4px" />
          <Flex p="0 1rem" direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                검색
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <Select
                  data={[
                    { text: "매물명", value: "rentName" },
                    { text: "매물코드", value: "rentCode" },
                  ]}
                  value={erpBsnsD.filter.type}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  onChange={(val: any) => {
                    setErpBsnsD({
                      ...erpBsnsD,
                      filter: { ...erpBsnsD.filter, type: val },
                    });
                  }}
                  selectProps={{ w: "20%" }}
                />
                <Input
                  inputProps={{ w: "50%" }}
                  placeholder={"매장코드를 입력해주세요"}
                  value={erpBsnsD.filter.text}
                  onChange={(val: any) => {
                    setErpBsnsD({
                      ...erpBsnsD,
                      filter: { ...erpBsnsD.filter, text: val },
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                fontSize="xs"
                fontWeight="strong"
              >
                타입
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "상권1", value: "bsnsType1" },
                  { text: "상권2", value: "bsnsType2" },
                  { text: "상권3", value: "bsnsType3" },
                  { text: "상권4", value: "bsnsType4" },
                  { text: "상권5", value: "bsnsType5" },
                ]}
                chkValue={erpBsnsD.filter.bsnsType}
                activeTotal={true}
                onChange={(val: any) =>
                  setErpBsnsD({
                    ...erpBsnsD,
                    filter: { ...erpBsnsD.filter, bsnsType: val },
                  })
                }
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <Box
            zIndex={-1}
            position="absolute"
            top={0}
            left={0}
            display="block"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.75)"
            backdropFilter="blur(5px)"
            userSelect="none"
          ></Box>
        </Flex>
      ) : openIdx === 3 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 3 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex p="0 1rem" justify="space-between">
            <Flex align="center">
              <Heading
                as={"h5"}
                pr="1rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                매물조회
              </Heading>
              <IcoStore02 color="font.title" />
            </Flex>
            <Switch
              isChecked={erpRent.active}
              onChange={() => {
                setErpRent({ ...erpRent, active: !erpRent.active });
              }}
              variant="filterControl"
              spacing="5rem"
            />
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 0.5rem" width="100%" height="4px" />
          <Flex p="0 1rem" direction="column" gap="0.75rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="4rem"
                fontSize="xs"
                fontWeight="strong"
              >
                검색
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <Select
                  data={[
                    { text: "상권명", value: "bsnsDName" },
                    { text: "상권코드", value: "bsnsDCode" },
                  ]}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  value={erpRent.filter.type}
                  onChange={(val: any) => {
                    setErpRent({
                      ...erpRent,
                      filter: { ...erpRent.filter, type: val },
                    });
                  }}
                  selectProps={{ w: "20%" }}
                />
                <Input
                  inputProps={{ w: "50%" }}
                  placeholder={"매장코드를 입력해주세요"}
                  value={erpRent.filter.text}
                  onChange={(val: any) => {
                    setErpRent({
                      ...erpRent,
                      filter: { ...erpRent.filter, text: val },
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="4rem"
                fontSize="xs"
                fontWeight="strong"
              >
                타입
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "A타입", value: "rankA" },
                  { text: "B타입", value: "rankB" },
                  { text: "C타입", value: "rankC" },
                  { text: "D타입", value: "rankD" },
                  { text: "E타입", value: "rankE" },
                ]}
                chkValue={erpRent.filter.rentRank}
                activeTotal={true}
                onChange={(val: any) => {
                  setErpRent({
                    ...erpRent,
                    filter: { ...erpRent.filter, rentRank: val },
                  });
                  return null;
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <Box
            zIndex={-1}
            position="absolute"
            top={0}
            left={0}
            display="block"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.75)"
            backdropFilter="blur(5px)"
            userSelect="none"
          ></Box>
        </Flex>
      ) : openIdx === 4 ? (
        <Flex
          pos="absolute"
          bottom="4rem"
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 0.6875rem 1.4375rem"
          display={openIdx === 4 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
          w="29.5rem"
        >
          <Flex justify="space-between">
            <Flex p="0 1rem" align="center">
              <Heading
                as={"h5"}
                pr="1rem"
                w="max-content"
                fontSize="md"
                lineHeight="1.5rem"
                color="font.title"
                textAlign="left"
                bg="none"
              >
                생성
              </Heading>
              <IcoPlusSquare02
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 0.5rem" width="100%" height="4px" />
          <Flex p="0 1rem" direction="row" justify="space-between" gap="1rem">
            <Flex align="center" w="100%">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="5rem"
                fontSize="xs"
                fontWeight="strong"
              >
                타입
              </FormLabel>
              <RadioBox
                variant="search"
                values={[
                  { text: "매장", value: 1 },
                  { text: "상권", value: 2 },
                  { text: "매물", value: 3 },
                  // { text: "고객", value: 4 },
                ]}
                fieldKey="value"
                value={modalIdx}
                onChange={(val: any) => {
                  setModalIdx(Number(val));
                }}
                radioProps={{
                  w: "max-content",
                  justifyContent: "space-between",
                }}
              />
            </Flex>
            <Button
              w="6rem"
              variant="search"
              onClick={() => {
                onOpen();
              }}
            >
              생성하기
            </Button>
          </Flex>
          {modalIdx === 1 ? (
            <Flex mt="1rem">
              <ModalStoreEditor
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
              />
            </Flex>
          ) : modalIdx === 2 ? (
            <Flex mt="1rem">
              <ModalBsnsDEditor
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
              />
            </Flex>
          ) : modalIdx === 3 ? (
            <Flex mt="1rem">
              <ModalRentEditor
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
              />
            </Flex>
          ) : null}
          <Box
            zIndex={-1}
            position="absolute"
            top={0}
            left={0}
            display="block"
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.75)"
            backdropFilter="blur(5px)"
            userSelect="none"
          ></Box>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default ErpFilter;
