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
import { motion } from "framer-motion";
import { NaverMapContext } from "@src/lib/src";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
import { RadioBox } from "@components/common/RadioBox";
import { Select, SelectAddr } from "@components/common/Select";
import { Input } from "@components/common/Input";
import { BtnFilterSearch } from "@components/common/Btn";
import { SwitchFilter } from "@components/common/Switch";
import DrawBox from "@components/sementicMapLayer/boxCreateDraw/DrawBox";
import ModalStoreEditor from "@components/modal/map/ModalStoreEditor";
import ModalRentEditor from "@components/modal/map/ModalRentEditor";
import ModalBsnsDEditor from "@components/modal/map/ModalBsnsDEditor";
//  Api
import { apiErpMap } from "@api/bizSub/config";
//  State
import {
  infoComErpStore,
  infoComErpBsnsD,
  infoComErpRent,
  resetErp,
} from "@states/sementicMap/stateFilter";
import { atomCreateArea } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { getCenter } from "@util/map/distance";
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
import type { TypeMapStoreSearch, TypeMapRentSearch } from "@api/bizSub/type";

type ErpFilterProps = {
  editorOpen: boolean;
  setEditorOpen: (props?: any) => any;
};

const ErpFilter = ({ editorOpen, setEditorOpen }: ErpFilterProps) => {
  const { dispatch } = useContext(NaverMapContext);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { getStoreList, getRentList, getBsDisList } = apiErpMap;
  const resetCreateArea = useResetRecoilState(atomCreateArea);
  const resetView = useResetRecoilState(sementicViewState);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [openIdx, setOpenIdx] = useState(0);
  const [localModalIdx, setLocalModalIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(0);
  const [isToolOpen, toolOpen] = useState<boolean>(false);
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

    const tmp: any = { ...filterStore, brandCode: "3" };

    if (
      filterStore.storeType.length === 0 ||
      filterStore.storeType.length === 5
    )
      // tmp.storeType = ["A", "B", "C", "D", "E"];
      tmp.storeType = [];
    if (
      filterStore.storeStatus.length === 0 ||
      filterStore.storeStatus.length === 5
    )
      tmp.storeStatus = ["open", "ready", "rest", "close", "etc"];
    // tmp.storeStatus = [];
    if (!filterStore.areaCode || filterStore.areaCode?.length <= 2)
      tmp.sidoCode = filterStore.areaCode;
    else if (
      filterStore.areaCode &&
      filterStore.areaCode.length > 2 &&
      filterStore.areaCode.length <= 4
    ) {
      tmp.sigunguCode = filterStore.areaCode;
    } else if (filterStore.areaCode.length > 4) {
      tmp.sigunguCode = filterStore.areaCode.slice(0, 4);
      tmp.dongCode = `${filterStore.areaCode.slice(0, 4)}00`;
    }

    delete tmp.areaCode;
    delete tmp.areaText;
    delete tmp.storeType;

    getStoreList(tmp)
      .then((res: TypeMapStoreSearch["res"]) => {
        const { data } = res;
        if (data && data.length > 0) {
          const tmp = data.filter((li) => li.location.coordinates);

          setErpStore({
            filter: filterStore,
            active: true,
            show: true,
            data: tmp,
          });
        } else {
          setErpStore({
            filter: filterStore,
            active: true,
            show: true,
            data: [],
          });
        }

        setOpenIdx(0);
      })
      .catch(() => {
        setOpenIdx(0);
      });
  };

  //  상권 필터 검색
  const searchBsDHandler = () => {
    console.log("bsD search");
    const tmp: any = { ...filterBsD, brandCode: "3" };
    delete tmp.areaCode;
    delete tmp.areaText;

    if (filterBsD.bsDisType.length === 0)
      tmp.bsDisType = ["A", "B", "C", "D", "E"];
    if (!filterBsD.areaCode || filterBsD.areaCode?.length <= 2)
      tmp.sidoCode = filterBsD.areaCode;
    else if (
      filterBsD.areaCode &&
      filterBsD.areaCode.length > 2 &&
      filterBsD.areaCode.length <= 4
    ) {
      tmp.sigunguCode = filterBsD.areaCode;
    } else if (filterBsD.areaCode.length > 4) {
      tmp.sigunguCode = filterBsD.areaCode.slice(0, 4);
      tmp.dongCode = `${filterBsD.areaCode.slice(
        4,
        filterBsD.areaCode.length
      )}00`;
    }
    // delete tmp.brandCode;
    delete tmp.bsDisType;
    // console.log(tmp);
    // setErpBsD({
    //   filter: filterBsD,
    //   active: true,
    //   show: true,
    //   data: [],
    // });
    // return;
    getBsDisList(tmp)
      .then((res) => {
        const { data } = res;
        console.log(data);
        if (data && data.length > 0) {
          const checkList = data.filter((li: any) => {
            if (li.polygonType !== "single") {
              console.log(li);
            }

            return li.polygonType ? true : false;
          });

          const makeCenter = checkList.map((li: any) => {
            if (li.center) {
              const center = li.center.coordinates;
              return { ...li, center: center };
            } else {
              const center = getCenter(li.polygon[0]);
              return { ...li, center: center };
            }
          });

          setErpBsD({
            filter: filterBsD,
            active: true,
            show: true,
            data: makeCenter || [],
          });
          setOpenIdx(0);
        } else {
          setErpBsD({
            filter: filterBsD,
            active: true,
            show: true,
            data: [],
          });
          setOpenIdx(0);
        }
      })
      .catch(() => {
        setOpenIdx(0);
      });
  };

  //  매물 필터 검색
  const searchRentHandler = () => {
    console.log("rent search");
    console.log(filterRent);

    const tmp: any = { ...filterRent, brandCode: "3" };
    delete tmp.areaCode;
    delete tmp.areaText;

    if (filterRent.rentType.length === 0)
      tmp.rentType = ["A", "B", "C", "D", "E"];
    if (!filterRent.areaCode || filterRent.areaCode?.length <= 2)
      tmp.sidoCode = filterRent.areaCode;
    else if (
      filterRent.areaCode &&
      filterRent.areaCode.length > 2 &&
      filterRent.areaCode.length <= 4
    ) {
      tmp.sigunguCode = filterRent.areaCode;
    } else if (filterRent.areaCode.length > 4) {
      tmp.sigunguCode = filterRent.areaCode.slice(0, 4);
      tmp.dongCode = `${filterRent.areaCode.slice(0, 4)}00`;
    }

    getRentList(tmp)
      .then((res: { data: TypeMapRentSearch["res"][] }) => {
        const { data } = res;
        console.log(res);
        data && data.length > 0
          ? setErpRent({
              filter: filterRent,
              active: true,
              show: true,
              data: data,
            })
          : setErpRent({
              filter: filterRent,
              active: true,
              show: true,
              data: [],
            });

        setOpenIdx(0);
      })
      .catch(() => {
        setOpenIdx(0);
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
    setEditorOpen(false);
    setFilterStore({
      brandCode: "",
      searchType: "name",
      text: "",
      areaCode: "",
      areaText: "",
      storeType: ["A", "B", "C", "D", "E"],
      storeStatus: ["open", "ready", "rest", "close", "etc"],
    });
    setFilterBsD({
      brandCode: "",
      searchType: "bsDisName",
      text: "",
      areaCode: "",
      areaText: "",
      bsDisType: ["A", "B", "C", "D", "E"],
    });
    setFilterRent({
      brandCode: "",
      text: "",
      areaCode: "",
      areaText: "",
      rentType: ["A", "B", "C", "D", "E"],
    });
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
      as={motion.div}
      ref={divRef}
      pos="absolute"
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
      transition="0.2s 0.1s linear"
      initial={{
        opacity: 0,
        bottom: "-5rem",
      }}
      animate={{
        opacity: 1,
        bottom: "6.15rem",
      }}
      exit={{
        opacity: 1,
        bottom: "6.15rem",
      }}
    >
      {/* ============================== infoCom의 필터 버튼 ============================== */}
      {isToolOpen ? (
        <Fragment>
          <DrawBox
            toolOpen={toolOpen}
            setLocalModalIdx={setLocalModalIdx}
            onOpen={onOpen}
            onClose={onClose}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Button
            variant="filterTop02"
            isActive={erpStore.active || openIdx === 1}
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
            isActive={erpBsD.active || openIdx === 2}
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
            isActive={erpRent.active || openIdx === 3}
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
            isActive={openIdx === 4}
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
          display={!isToolOpen && openIdx === 1 ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoStore
                width="0.625rem"
                height="0.625rem"
                color="font.primary"
              />
              <Heading as={"h5"} variant="filterBox">
                매장조회
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpStore.show}
                onChange={() => {
                  setErpStore({ ...erpStore, show: !erpStore.show });
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
                  key="store-addr-slct"
                  value={filterStore.areaCode || ""}
                  onChange={(code: string) => {
                    setFilterStore({
                      ...filterStore,
                      areaCode: code || "",
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
          display={openIdx === 2 && !isToolOpen ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoDoubleSquere
                width="0.625rem"
                height="0.625rem"
                color="font.primary"
              />
              <Heading as={"h5"} variant="filterBox">
                상권조회
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpBsD.show}
                onChange={() => {
                  setErpBsD({ ...erpBsD, show: !erpBsD.show });
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
                    { text: "상권명", value: "bsDisName" },
                    { text: "상권코드", value: "bsDisCode" },
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
                    filterBsD.searchType === "bsDisName"
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
                  key="bs-addr-slct"
                  value={filterBsD.areaCode || ""}
                  onChange={(code: string) => {
                    setFilterBsD({
                      ...filterBsD,
                      areaCode: code || "",
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
                chkValue={filterBsD.bsDisType || []}
                activeTotal={true}
                onChange={(val: any) => {
                  setFilterBsD({
                    ...filterBsD,
                    bsDisType: val.length === 0 ? [] : val,
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
          display={openIdx === 3 && !isToolOpen ? "flex" : "none"}
          direction="column"
          justify="center"
          border="1px solid #BFBFBF"
        >
          <Flex justify="space-between">
            <Flex pl="0.25rem" align="center" gap="0.5rem">
              <IcoFileSearch
                width="0.625rem"
                height="0.625rem"
                color="font.primary"
              />
              <Heading as={"h5"} variant="filterBox">
                매물조회
              </Heading>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={erpRent.show}
                onChange={() => {
                  setErpRent({ ...erpRent, show: !erpRent.show });
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
              <Flex w="100%">
                <Input
                  inputProps={{ w: "100%" }}
                  placeholder={"매물명를 입력해주세요"}
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
                  key="rent-addr-slct"
                  value={filterRent.areaCode || ""}
                  onChange={(code: string) => {
                    setFilterRent({
                      ...filterRent,
                      areaCode: code || "",
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
          display={openIdx === 4 && !isToolOpen ? "flex" : "none"}
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
                  setEditorOpen(true);
                  resetCreateArea();
                  resetView();
                  if (localModalIdx === 2) {
                    isOpen && onClose();
                    setModalIdx(localModalIdx);
                    toolOpen(true);
                  } else {
                    setModalIdx(localModalIdx);
                    onOpen();
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
          onClose={() => {
            onClose();
            setEditorOpen(false);
          }}
          isOpen={isOpen}
          setOpenIdx={setOpenIdx}
        />
      ) : modalIdx === 2 && isOpen ? (
        <ModalBsnsDEditor
          onOpen={onOpen}
          onClose={() => {
            onClose();
            setEditorOpen(false);
            toolOpen(false);
            resetCreateArea();
          }}
          isOpen={isOpen}
          toolOpen={toolOpen}
        />
      ) : modalIdx === 3 && isOpen ? (
        <ModalRentEditor
          onOpen={onOpen}
          onClose={() => {
            onClose();
            setEditorOpen(false);
          }}
          isOpen={isOpen}
          setOpenIdx={setOpenIdx}
        />
      ) : null}
    </Flex>
  );
};

export default ErpFilter;
