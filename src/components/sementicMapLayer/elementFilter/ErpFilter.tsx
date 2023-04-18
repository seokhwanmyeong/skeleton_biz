//  Lib
import { useState, useEffect, useRef, useContext, Fragment } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
import { RadioBox } from "@components/common/RadioBox";
import { Select, SelectAddr } from "@components/common/Select";
import { Input } from "@components/common/Input";
import { BtnFilterSearch } from "@components/common/Btn";
import { SwitchFilter } from "@components/common/Switch";
import ModalStoreEditor from "@components/modal/map/ModalStoreEditor";
import ModalRentEditor from "@components/modal/map/ModalRentEditor";
import ModalBsnsDEditor from "@components/modal/map/ModalBsnsDEditor";
import DrawTools from "@components/sementicMapLayer/elementFilter/DrawTools";
//  Api
import { apiErpMap } from "@api/biz/config";
//  State
import {
  infoComErpStore,
  infoComErpBsnsD,
  infoComErpRent,
  resetErp,
} from "@states/sementicMap/stateFilter";
//  Icon
import {
  IcoDoubleSquere,
  IcoStore,
  IcoPlusSquare02,
  IcoExpand,
  IcoEnvironment,
  IcoBuilding,
  IcoSync,
  IcoFileSearch,
  IcoCheck,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoCardBg } from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type {
  Infocome,
  TypeFilterStore,
  TypeFilterBsDis,
  TypeFilterRent,
} from "@states/sementicMap/stateFilter";

type ErpFilterProps = {
  areaCode?: string;
  path?: any;
  isToolOpen: boolean;
  toolOpen: (props?: any) => any;
};

const ErpFilter = ({
  isToolOpen,
  toolOpen,
  areaCode,
  path,
}: ErpFilterProps) => {
  const { dispatch } = useContext(NaverMapContext);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { getStoreList, getRentList, getBsDisList } = apiErpMap;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [openIdx, setOpenIdx] = useState(0);
  const [localModalIdx, setLocalModalIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(0);
  const [erpStore, setErpStore] =
    useRecoilState<Infocome<TypeFilterStore>>(infoComErpStore);
  const [filterStore, setFilterStore] = useState<TypeFilterStore>(
    erpStore.filter
  );
  const [erpBsD, setErpBsD] =
    useRecoilState<Infocome<TypeFilterBsDis>>(infoComErpBsnsD);
  const [filterBsD, setFilterBsD] = useState<TypeFilterBsDis>(erpBsD.filter);
  const [erpRent, setErpRent] =
    useRecoilState<Infocome<TypeFilterRent>>(infoComErpRent);
  const [filterRent, setFilterRent] = useState<TypeFilterRent>(erpRent.filter);
  const reset = useResetRecoilState(resetErp);

  //  매장 필터 검색
  const searchStoreHandler = () => {
    console.log("store search");
    console.log(filterStore);
    // console.log(tmp);
    // setErpStore({
    //   filter: tmp,
    //   active: true,
    //   data: [
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfd506",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "11119",
    //       BP_NM: "안국점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1363186800000",
    //         },
    //       },
    //       TEL_NO1: "02-745-1676",
    //       ADDR_H: "서울특별시 종로구 창덕궁길 84 (원서동)",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1668059439000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110600",
    //       lat: "37.5811933",
    //       lng: "126.9894288",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfdb43",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "13060",
    //       BP_NM: "경희궁자이점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1630422000000",
    //         },
    //       },
    //       TEL_NO1: "02-720-1008",
    //       ADDR_H: "서울특별시 종로구 통일로14길 8 (무악동)",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1636607504000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110570",
    //       lat: "37.5749062",
    //       lng: "126.9581177",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfde13",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "71701",
    //       BP_NM: "종로본점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1369407600000",
    //         },
    //       },
    //       TEL_NO1: "02-725-9282",
    //       ADDR_H: "서울특별시 종로구 청계천로 81",
    //       ADDR_D: "(관철동)",
    //       STATUS: "40",
    //       STATUS_NM: "폐점",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1620967301000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110615",
    //       lat: "37.5685614",
    //       lng: "126.9865980",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfde1f",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "71747",
    //       BP_NM: "명륜점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1373641200000",
    //         },
    //       },
    //       TEL_NO1: "02-742-4442",
    //       ADDR_H: "서울특별시 종로구 성균관로 12-3",
    //       ADDR_D: "1층",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1668059466000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110650",
    //       lat: "37.5841424",
    //       lng: "126.9979887",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfe1d4",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "73899",
    //       BP_NM: "인사동점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1607007600000",
    //         },
    //       },
    //       TEL_NO1: "02-738-9282",
    //       ADDR_H: "서울특별시 종로구 인사동3길 37 (인사동)",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1668492093000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110615",
    //       lat: "37.5720371",
    //       lng: "126.9864703",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfe36e",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "74631",
    //       BP_NM: "동대문역점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1610463600000",
    //         },
    //       },
    //       TEL_NO1: "02-742-9282",
    //       ADDR_H: "서울특별시 종로구 창신길 59 (창신동, 주영빌딩)",
    //       ADDR_D: "1층 1호",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1673326811000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110680",
    //       lat: "37.5743906",
    //       lng: "127.010517",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfe53a",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "75225",
    //       BP_NM: "대학로점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1640271600000",
    //         },
    //       },
    //       TEL_NO1: "02-2135-6563",
    //       ADDR_H: "서울특별시 종로구 대학로10길 16 (동숭동)",
    //       ADDR_D: "1층",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1668059414000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110640",
    //       lat: "37.5816377",
    //       lng: "127.0031047",
    //     },
    //     {
    //       _id: {
    //         $oid: "63db684647d2511eb5cfe53e",
    //       },
    //       BRAND_CD: "01",
    //       BP_CD: "75230",
    //       BP_NM: "종로LCK점",
    //       OPEN_DATE: {
    //         $date: {
    //           $numberLong: "1641654000000",
    //         },
    //       },
    //       TEL_NO1: "07040474742",
    //       ADDR_H: "서울특별시 종로구 종로 33 (청진동, 그랑서울)",
    //       ADDR_D: "3층 1-309호",
    //       STATUS: "10",
    //       STATUS_NM: "정상",
    //       DTS_UPDATE: {
    //         $date: {
    //           $numberLong: "1668492042000",
    //         },
    //       },
    //       RK: "1",
    //       areaCode: "11110615",
    //       lat: "37.57096",
    //       lng: "126.9814392",
    //     },
    //   ],
    // });
    // return;
    getStoreList(filterStore).then((res: any) => {
      const { records } = res;
      console.log(records);

      if (records || records.length > 0) {
        setErpStore({
          filter: filterStore,
          active: true,
          data: records || [],
        });
      }
    });
  };

  //  상권 필터 검색
  const searchBsDHandler = () => {
    console.log("bsD search");
    console.log(filterBsD);

    getBsDisList(filterBsD).then((res: any) => {
      const { records } = res;
      console.log(res);

      setErpBsD({
        filter: filterBsD,
        active: true,
        data: records || [],
      });
    });
  };

  //  매물 필터 검색
  const searchRentHandler = () => {
    console.log("rent search");
    console.log(filterRent);

    getRentList(filterRent).then((res: any) => {
      const { records } = res;
      console.log(res);

      setErpRent({
        filter: filterRent,
        active: true,
        data: records || [],
      });
    });
  };

  //  ERP 필터 초기화
  const filterResetHandler = () => {
    console.log("reset ERP");
    setOpenIdx(0);
    setLocalModalIdx(0);
    setModalIdx(0);
    onClose();
    toolOpen(false);
    reset();
  };

  const removeMarker = () => {
    dispatch({ type: "remove_object", id: "createErp" });
  };

  useEffect(() => {
    console.log("active");
    removeMarker();
  }, [modalIdx, isOpen]);

  return (
    <Flex
      ref={divRef}
      pos="absolute"
      bottom="5.25rem"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      p="0.5rem 0"
      w="29.5rem"
      justify="center"
      gap="1.5rem"
      bgColor="#FFFFFFBF"
      border="1px solid"
      borderColor="neutral.gray6"
      borderRadius="34px"
    >
      {/* ============================== infoCom의 필터 버튼 ============================== */}
      {isToolOpen ? (
        <DrawTools toolOpen={toolOpen} />
      ) : (
        <Fragment>
          <Button
            variant="filterTop02"
            isActive={erpStore.active}
            onClick={() => (openIdx === 1 ? setOpenIdx(0) : setOpenIdx(1))}
          >
            <Box>
              <IcoEnvironment
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            매장조회
          </Button>
          <Button
            variant="filterTop02"
            isActive={erpBsD.active}
            onClick={() => (openIdx === 2 ? setOpenIdx(0) : setOpenIdx(2))}
          >
            <Box>
              <IcoExpand
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            상권조회
          </Button>
          <Button
            variant="filterTop02"
            isActive={erpRent.active}
            onClick={() => (openIdx === 3 ? setOpenIdx(0) : setOpenIdx(3))}
          >
            <Box>
              <IcoBuilding
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            매물조회
          </Button>
          <Button
            variant="filterTop02"
            onClick={() => (openIdx === 4 ? setOpenIdx(0) : setOpenIdx(4))}
          >
            <Box>
              <IcoPlusSquare02
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            생성
          </Button>
          <Button variant="filterTop02" onClick={filterResetHandler}>
            <Box>
              <IcoSync
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            필터초기화
          </Button>
        </Fragment>
      )}
      {/* ============================== infoCom의 필터 박스 ============================== */}
      {openIdx === 1 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 1 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                매장조회
              </Heading>
              <IcoStore width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpStore.active}
                onChange={() => {
                  setErpStore({ ...erpStore, active: !erpStore.active });
                }}
              />
              <BtnFilterSearch onClick={searchStoreHandler} />
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
            <Flex align="center">
              <FormLabel
                display="flex"
                alignItems="center"
                flex="none"
                m="0"
                w="2.8rem"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                검색
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <Select
                  data={[
                    { text: "매장명", value: "name" },
                    { text: "매장코드", value: "code" },
                    { text: "대표자", value: "owner_name" },
                  ]}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  value={filterStore.searchType}
                  onChange={(val: "name" | "code" | "owner_name") => {
                    setFilterStore({
                      ...filterStore,
                      searchType: val,
                    });
                  }}
                  selectProps={{ w: "30%" }}
                />
                <Input
                  inputProps={{ w: "100%" }}
                  placeholder={"매장명, 코드, 대표자를 입력해주세요"}
                  value={filterStore.text || ""}
                  onChange={(val: any) => {
                    setFilterStore({
                      ...filterStore,
                      text: val || "",
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
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                지역
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <SelectAddr
                  value={filterStore.areaCode || ""}
                  onChange={(val: any) => {
                    setFilterStore({
                      ...filterStore,
                      areaCode: val || "",
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
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                타입
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "A타입", value: "A" },
                  { text: "B타입", value: "B" },
                  { text: "C타입", value: "C" },
                  { text: "D타입", value: "D" },
                  { text: "E타입", value: "E" },
                ]}
                chkValue={filterStore.storeType || []}
                activeTotal={true}
                onChange={(val: any) => {
                  setFilterStore({
                    ...filterStore,
                    storeType: val.length === 0 ? [] : val,
                  });
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
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.secondary"
              >
                상태
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "입점", value: "open" },
                  { text: "휴점", value: "rest" },
                  { text: "폐점", value: "close" },
                  { text: "대기", value: "ready" },
                  { text: "기타", value: "etc" },
                ]}
                chkValue={filterStore.storeStatus || []}
                activeTotal={true}
                onChange={(val: any) => {
                  setFilterStore({
                    ...filterStore,
                    storeStatus: val.length === 0 ? [] : val,
                  });
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 2 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 2 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                상권조회
              </Heading>
              <IcoDoubleSquere
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpBsD.active}
                onChange={() => {
                  setErpBsD({ ...erpBsD, active: !erpBsD.active });
                }}
                variant="filterControl"
              />
              <BtnFilterSearch onClick={searchBsDHandler} />
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
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
                    { text: "상권명", value: "bsDName" },
                    { text: "상권코드", value: "bsDCode" },
                  ]}
                  value={filterBsD.searchType}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  onChange={(val: any) => {
                    setFilterBsD({
                      ...filterBsD,
                      searchType: val,
                    });
                  }}
                  selectProps={{ w: "30%" }}
                />
                <Input
                  inputProps={{ w: "100%" }}
                  placeholder={
                    filterBsD.searchType === "bsDName"
                      ? "상권명를 입력해주세요"
                      : "상권코드를 입력해주세요"
                  }
                  value={filterBsD.text || ""}
                  onChange={(val: any) => {
                    setFilterBsD({
                      ...filterBsD,
                      text: val || "",
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
                지역
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <SelectAddr
                  value={filterBsD.areaCode || ""}
                  onChange={(val: any) => {
                    setFilterBsD({
                      ...filterBsD,
                      areaCode: val || "",
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
                  { text: "상권1", value: "A" },
                  { text: "상권2", value: "B" },
                  { text: "상권3", value: "C" },
                  { text: "상권4", value: "D" },
                  { text: "상권5", value: "E" },
                ]}
                chkValue={filterBsD.bsDType || []}
                activeTotal={true}
                onChange={(val: any) => {
                  setFilterBsD({
                    ...filterBsD,
                    bsDType: val.length === 0 ? [] : val,
                  });
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 3 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={openIdx === 3 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                매물조회
              </Heading>
              <IcoFileSearch
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpRent.active}
                onChange={() => {
                  setErpRent({ ...erpRent, active: !erpRent.active });
                }}
                variant="filterControl"
              />
              <BtnFilterSearch onClick={searchRentHandler} />
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
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
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  value={filterRent.searchType}
                  onChange={(val: any) => {
                    setFilterRent({
                      ...filterRent,
                      searchType: val,
                    });
                  }}
                  selectProps={{ w: "30%" }}
                />
                <Input
                  inputProps={{ w: "100%" }}
                  placeholder={
                    filterRent.searchType === "rentName"
                      ? "매물명를 입력해주세요"
                      : "매물코드를 입력해주세요"
                  }
                  value={filterRent.text || ""}
                  onChange={(val: any) => {
                    setFilterRent({
                      ...filterRent,
                      text: val || "",
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
                지역
              </FormLabel>
              <Flex w="100%" gap="0.5rem">
                <SelectAddr
                  value={filterRent.areaCode || ""}
                  onChange={(val: any) => {
                    setFilterRent({
                      ...filterRent,
                      areaCode: val || "",
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
                  { text: "A타입", value: "A" },
                  { text: "B타입", value: "B" },
                  { text: "C타입", value: "C" },
                  { text: "D타입", value: "D" },
                  { text: "E타입", value: "E" },
                ]}
                chkValue={filterRent.rentType || []}
                activeTotal={true}
                onChange={(val: any) => {
                  setFilterRent({
                    ...filterRent,
                    rentType: val.length === 0 ? [] : val,
                  });
                }}
                groupProps={{
                  w: "max-content",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : openIdx === 4 ? (
        <Flex
          pos="absolute"
          bottom={
            divRef?.current
              ? `calc(${divRef.current.clientHeight}px + 0.25rem)`
              : "5.25rem"
          }
          left="50%"
          transform="translateX(-50%)"
          p="1.125rem 1.375rem 1rem"
          w="29.5rem"
          display={modalIdx === 2 && isToolOpen ? "none" : "flex"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="1rem">
              <Heading as={"h5"} variant="filterBox">
                생성
              </Heading>
              <IcoPlusSquare02
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <Button
                variant="filterSearch"
                aria-label="생성하기"
                onClick={() => {
                  setModalIdx(localModalIdx);
                  onOpen();

                  if (localModalIdx === 2) {
                    toolOpen(true);
                  }
                }}
              >
                <IcoCheck
                  width="0.875rem"
                  height="0.875rem"
                  color="primary.inverse"
                />
                생성
              </Button>
            </Flex>
          </Flex>
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
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
              <RadioBox
                variant="filterBox"
                values={[
                  { text: "매장", value: 1 },
                  { text: "상권", value: 2 },
                  { text: "매물", value: 3 },
                  // { text: "고객", value: 4 },
                ]}
                fieldKey="value"
                value={localModalIdx}
                onChange={(val: any) => {
                  setLocalModalIdx(Number(val));
                }}
                radioProps={{
                  w: "max-content",
                  justifyContent: "space-between",
                }}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : null}
      {modalIdx === 1 && isOpen ? (
        <ModalStoreEditor
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          setOpenIdx={setOpenIdx}
        />
      ) : modalIdx === 2 && isOpen ? (
        <ModalBsnsDEditor
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          toolOpen={toolOpen}
        />
      ) : modalIdx === 3 && isOpen ? (
        <ModalRentEditor
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          setOpenIdx={setOpenIdx}
        />
      ) : null}
    </Flex>
  );
};

export default ErpFilter;