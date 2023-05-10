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
//  Api
import { apiMapNice } from "@api/bizSub/config";
//  Icon
import {
  IcoFileSearch,
  IcoHeatMap,
  IcoSync,
  IcoTextB,
} from "@assets/icons/icon";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { DecoCardBg } from "@components/sementicMapLayer/elementDeco/Deco";
import {
  atomFlowEnterArea,
  atomSlctDong,
} from "@src/states/sementicMap/stateMap";

const NiceFilterDepth = ({
  areaInfo,
}: {
  areaInfo: {
    areaType: "dong" | "polygon" | "circle" | null;
    slctName: string;
    slctCode?: string;
    pathType?: string;
    slctPath?: any[];
    center?: any;
    range?: any;
  };
}) => {
  const { getBrandList, getFlowPop } = apiMapNice;
  const divRef = useRef<HTMLDivElement | null>(null);
  const [openIdx, setOpenIdx] = useState(0);
  const { bot } = useRecoilValue(atomUpjongState);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const [flowPop, setFlowPop] = useRecoilState(infoComFlowDepth);
  const [brandFilter, setBrandFilter] = useRecoilState(infoComBrand);
  const [buildingFilter, setBuildingFilter] = useRecoilState(infoComBuilding);
  const [filterBuilding, setFilterBuilding] = useState(buildingFilter.filter);
  const reset = useResetRecoilState(resetNiceDepth);

  //  세부 유동인구 필터 변화 및 액티브
  const searchPopHandler = () => {
    if (areaInfo.areaType === "dong" && areaInfo.slctCode) {
      getFlowPop({
        // ctyCd: sigungu.slctCode.slice(0, 4),
        admiCd: areaInfo.slctCode,
        upjongCd: bot.code || "Q01005",
      }).then((res: any) => {
        console.log(res);

        if (res.data && res.data.length > 0)
          setFlowPop({ show: true, active: true, data: res.data || [] });
      });
    } else if (areaInfo.areaType === "polygon" && areaInfo.slctPath) {
      console.log(areaInfo.slctPath);
      if (areaInfo?.slctPath) {
        const arr = areaInfo.slctPath.map((path: any): [number, number] => {
          return [path.x || path[0], path.y || path[1]];
        });

        getFlowPop({
          upjongCd: bot.code || "Q01005",
          wkt: [[arr]],
        }).then((res: any) => {
          console.log(res);

          if (res.data && res.data.length > 0)
            setFlowPop({ show: true, active: true, data: res.data || [] });
        });
      }
    } else if (
      areaInfo.areaType === "circle" &&
      areaInfo.center &&
      areaInfo.range
    ) {
      getFlowPop({
        upjongCd: bot.code || "Q01005",
        xAxis: areaInfo.center.x,
        yAxis: areaInfo.center.y,
        range: Number(areaInfo.range),
      }).then((res: any) => {
        console.log(res);

        if (res.data && res.data.length > 0)
          setFlowPop({ show: true, active: true, data: res.data || [] });
      });
    }
  };

  const searchBrandHandler = () => {
    // if (!bot.code || !bot.name || !sigungu?.slctCode || !slctCode) return;
    if (!bot.code || !bot.name) return;
    console.log(areaInfo.areaType);
    if (areaInfo.areaType === "dong" && areaInfo.slctCode) {
      getBrandList({
        // ctyCd: sigungu.slctCode.slice(0, 4),
        admiCd: areaInfo.slctCode,
        upjongCd: bot.code,
        pageNo: 1,
      }).then((res: any) => {
        console.log(res);

        if (res.data && res.data.length > 0)
          setBrandFilter({ show: true, active: true, data: res.data || [] });
      });
    } else if (areaInfo.areaType === "polygon" && areaInfo.slctPath) {
      const arr = areaInfo.slctPath.map((path: any): [number, number] => {
        return [path.x || path[0], path.y || path[1]];
      });

      getBrandList({
        upjongCd: bot.code,
        wkt: [[arr]],
        pageNo: 1,
      }).then((res: any) => {
        console.log(res);

        if (res.data && res.data.length > 0)
          setBrandFilter({ show: true, active: true, data: res.data || [] });
      });
    } else if (
      areaInfo.areaType === "circle" &&
      areaInfo.center &&
      areaInfo.range
    ) {
      getBrandList({
        upjongCd: bot.code,
        xAxis: areaInfo.center.x,
        yAxis: areaInfo.center.y,
        range: Number(areaInfo.range),
        pageNo: 1,
      }).then((res: any) => {
        console.log(res);

        if (res.data && res.data.length > 0)
          setBrandFilter({ show: true, active: true, data: res.data || [] });
      });
    }
  };

  //  건물조회 필터 변화 및 액티브
  const searchBuildingHandler = () => {
    setBrandFilter(filterBuilding);
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
        isActive={flowPop?.active || openIdx === 1}
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
          isActive={brandFilter?.active || openIdx === 2}
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
        isActive={buildingFilter?.active || openIdx === 3}
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
            <Tooltip
              hasArrow
              isDisabled={bot.code ? true : false}
              placement="auto"
              label="업종을 선택하셔야 합니다."
              p="1rem"
              borderRadius="base"
            >
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isDisabled={!brandFilter.active || (bot.code ? false : true)}
                  isChecked={brandFilter.active}
                  onChange={() => {
                    setBrandFilter({
                      ...brandFilter,
                      active: !brandFilter.active,
                    });
                  }}
                  variant="filterControl"
                />
                <BtnFilterSearch
                  isDisabled={bot.code ? false : true}
                  onClick={searchBrandHandler}
                />
              </Flex>
            </Tooltip>
          </Flex>
          {/* ============================== 박스 데코 ============================== */}
          <Deco01 margin="0.25rem 0 0.75rem" width="100%" height="0.3125rem" />
          {/* <Flex p="0 0.25rem" direction="column" gap="0.625rem">
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
          </Flex> */}
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
