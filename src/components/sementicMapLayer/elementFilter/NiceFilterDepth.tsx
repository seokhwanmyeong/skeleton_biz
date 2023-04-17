//  Lib
import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
//  Component
import { CheckboxGroup } from "@components/common/CheckBox";
import { SwitchFilter } from "@components/common/Switch";
import { BtnFilterSearch } from "@components/common/Btn";
import { Select } from "@components/common/Select";
import { Input } from "@components/common/Input";
//  State
import {
  infoComFlowDepth,
  infoComBrand,
  infoComBuilding,
  resetNiceDepth,
  atomUpjongState,
} from "@states/sementicMap/stateFilter";
//  Icon
import {
  IcoFileSearch,
  IcoHeatMap,
  IcoNice1,
  IcoNice2,
  IcoNice3,
  IcoNice5,
  IcoSync,
  IcoTextB,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoCardBg } from "@components/sementicMapLayer/elementDeco/Deco";

type Props = {
  areaCode?: string;
  path?: any;
};

const NiceFilterDepth = ({ areaCode, path }: Props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [openIdx, setOpenIdx] = useState(0);
  const { bot } = useRecoilValue(atomUpjongState);
  const [flowPop, setFlowPop] = useRecoilState(infoComFlowDepth);
  const [filterPop, setFilterPop] = useState(flowPop.filter);
  const [brandFilter, setBrandFilter] = useRecoilState(infoComBrand);
  const [filterBrand, setFilterBrand] = useState(brandFilter.filter);
  const [brandList, setBrandList] = useState<any>([]);
  const [buildingFilter, setBuildingFilter] = useRecoilState(infoComBuilding);
  const [filterBuilding, setFilterBuilding] = useState(buildingFilter.filter);

  const reset = useResetRecoilState(resetNiceDepth);

  useEffect(() => {
    console.log(areaCode);
  }, []);

  //  세부 유동인구 필터 변화 및 액티브
  const searchPopHandler = () => {
    setFlowPop(filterPop);
  };

  //  사업체 필터 변화 및 액티브
  useEffect(() => {
    if (bot) {
      setBrandList([
        { text: "스타벅스", value: "스타벅스" },
        { text: "메가커피", value: "메가커피" },
        { text: "컴포즈커피", value: "컴포즈커피" },
      ]);
    }
  }, [bot]);

  const searchBrandHandler = () => {
    setBrandFilter(filterBrand);
  };

  //  건물조회 필터 변화 및 액티브
  const searchBuildingHandler = () => {
    setBrandFilter(filterBrand);
  };

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
      <Button
        variant="filterTop02"
        isActive={flowPop?.active}
        onClick={() => {
          if (openIdx === 1) {
            setOpenIdx(0);
          } else {
            setOpenIdx(1);
          }
        }}
      >
        <Box>
          <IcoHeatMap width="1.125rem" height="1.125rem" color="font.primary" />
        </Box>
        유동인구
      </Button>
      <Tooltip
        hasArrow
        isDisabled={bot ? true : false}
        placement="auto"
        label="업종을 선택하셔야 합니다."
        p="1rem"
        borderRadius="base"
      >
        <Button
          variant="filterTop02"
          isDisabled={bot ? false : true}
          isActive={brandFilter?.active}
          onClick={() => {
            if (openIdx === 2) {
              setOpenIdx(0);
            } else {
              setOpenIdx(2);
            }
          }}
        >
          <Box>
            <IcoTextB width="1.125rem" height="1.125rem" color="font.primary" />
          </Box>
          사업체 데이터
        </Button>
      </Tooltip>
      <Button
        variant="filterTop02"
        isActive={buildingFilter?.active}
        onClick={() => {
          if (openIdx === 3) {
            setOpenIdx(0);
          } else {
            setOpenIdx(3);
          }
        }}
      >
        <Box>
          <IcoFileSearch
            width="1.125rem"
            height="1.125rem"
            color="font.primary"
          />
        </Box>
        건물 데이터
      </Button>
      <Button
        variant="filterTop02"
        onClick={() => {
          setOpenIdx(0);
          reset();
        }}
      >
        <Box>
          <IcoSync width="1.125rem" height="1.125rem" color="font.primary" />
        </Box>
        필터초기화
      </Button>
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
                유동인구
              </Heading>
              <IcoHeatMap
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={flowPop.active}
                onChange={() => {
                  setFlowPop({ ...flowPop, active: !flowPop.active });
                }}
              />
              <BtnFilterSearch onClick={searchPopHandler} />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
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
                성별
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "남자", value: "man" },
                  { text: "여자", value: "woman" },
                ]}
                chkValue={filterPop?.gender}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterPop({
                    ...filterPop,
                    gender: val,
                  })
                }
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
                나이대
              </FormLabel>
              <CheckboxGroup
                chkboxData={[
                  { text: "20대", value: "gen20" },
                  { text: "30대", value: "gen30" },
                  { text: "40대", value: "gen40" },
                  { text: "50대", value: "gen50" },
                  { text: "60대 이상", value: "gen60" },
                ]}
                chkValue={filterPop?.age}
                activeTotal={true}
                onChange={(val: any) =>
                  setFilterPop({
                    ...filterPop,
                    age: val,
                  })
                }
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
                사업체 데이터
              </Heading>
              <IcoTextB width="0.875rem" height="0.875rem" color="font.title" />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={brandFilter.active}
                onChange={() => {
                  setBrandFilter({
                    ...brandFilter,
                    active: !brandFilter.active,
                  });
                }}
                variant="filterControl"
              />
              <BtnFilterSearch onClick={searchBrandHandler} />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
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
                사업체 목록
              </FormLabel>
              <CheckboxGroup
                chkboxData={brandList}
                chkValue={brandFilter?.filter?.brand}
                activeTotal={true}
                onChange={(val: any) =>
                  // setInitPop({ ...initFlowPop, age: val })
                  setFilterBrand({
                    ...filterBrand,
                    brand: val,
                  })
                }
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
                건물조회
              </Heading>
              <IcoFileSearch
                width="0.875rem"
                height="0.875rem"
                color="font.title"
              />
            </Flex>
            <Flex align="center" gap="0.5rem">
              <SwitchFilter
                isChecked={buildingFilter.active}
                onChange={() => {
                  setBuildingFilter({
                    ...buildingFilter,
                    active: !buildingFilter.active,
                  });
                }}
                variant="filterControl"
              />
              <BtnFilterSearch onClick={searchBuildingHandler} />
            </Flex>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.3rem 0 1.375rem" width="100%" height="4px" />
          <Flex p="0 0.25rem" direction="column" gap="0.625rem">
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
                대장종류
              </FormLabel>
              <Select
                data={[
                  { text: "-", value: "-" },
                  { text: "-", value: "-" },
                ]}
                // value={filterBuilding.searchType}
                opBaseTxt="text"
                opBaseId="value"
                opBaseKey="value"
                onChange={(val: any) => {}}
                selectProps={{ w: "100%" }}
              />
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
                지붕구조
              </FormLabel>
              <Select
                data={[
                  { text: "-", value: "-" },
                  { text: "-", value: "-" },
                ]}
                // value={filterBuilding.searchType}
                opBaseTxt="text"
                opBaseId="value"
                opBaseKey="value"
                onChange={(val: any) => {}}
                selectProps={{ w: "100%" }}
              />
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
                용도
              </FormLabel>
              <Select
                data={[
                  { text: "-", value: "-" },
                  { text: "-", value: "-" },
                ]}
                // value={filterBuilding.searchType}
                opBaseTxt="text"
                opBaseId="value"
                opBaseKey="value"
                onChange={(val: any) => {}}
                selectProps={{ w: "100%" }}
              />
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
                구조
              </FormLabel>
              <Select
                data={[
                  { text: "-", value: "-" },
                  { text: "-", value: "-" },
                ]}
                // value={filterBuilding.searchType}
                opBaseTxt="text"
                opBaseId="value"
                opBaseKey="value"
                onChange={(val: any) => {}}
                selectProps={{ w: "100%" }}
              />
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
                연면적
              </FormLabel>
              <Input
                inputProps={{ w: "100%" }}
                placeholder={"연면적을 입력하세요"}
                onChange={(val: any) => {}}
              />
            </Flex>
          </Flex>
          <DecoCardBg />
        </Flex>
      ) : null}
    </Flex>
  );
};

export default NiceFilterDepth;
