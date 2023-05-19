//  Lib
import { Fragment, useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
//  Component
import { SwitchFilter } from "@components/common/Switch";
import { BtnFilterSearch } from "@components/common/Btn";
import { Select } from "@components/common/Select";
import { Input } from "@components/common/Input";
import { DialogAlertFilter } from "@components/dialog/DialogAlertModal";
//  State
import {
  infoComFlowDepth,
  infoComBrand,
  infoComBuilding,
  resetNiceDepth,
  atomUpjongState,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiMapBuilding, apiMapNice } from "@api/bizSub/config";
//  Util
import { regstrGbCd, roofCd, mainPurpsCd, strctCd } from "@util/define/map";
import { numRegExp } from "@util/valid/validation";
//  Icon
import {
  IcoBuildingList,
  IcoOutpatient,
  IcoRefresh,
  IcoSensorOccupied,
  IcoVillage,
} from "@assets/icons/icon";
//  Deco
import { DecoCardBg } from "@components/sementicMapLayer/elementDeco/Deco";
import { Deco01 } from "@assets/deco/DecoSvg";
import { BaseSpinner } from "@src/components/common/Spinner";

const NiceFilterDepth = ({
  areaInfo,
}: {
  areaInfo: {
    areaType: "dong" | "polygon" | "circle" | null;
    slctName: string;
    slctCode?: string;
    pathType?: string;
    slctPath?: any[] | any;
    center?: any;
    range?: any;
  };
}) => {
  const { getBrandList } = apiMapNice;
  const { getBuildingList } = apiMapBuilding;
  const reset = useResetRecoilState(resetNiceDepth);
  const { bot } = useRecoilValue(atomUpjongState);
  const [flowPop, setFlowPop] = useRecoilState(infoComFlowDepth);
  const [brand, setBrand] = useRecoilState(infoComBrand);
  const [building, setBuilding] = useRecoilState(infoComBuilding);
  const [filterBuilding, setFilterBuilding] = useState(building.filter);
  const [openIdx, setOpenIdx] = useState(0);
  const [alert, setAlert] = useState({ isOpen: false, text: "" });
  const [isLoading, setLoading] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  //  세부 유동인구 필터 변화 및 액티브
  const searchPopHandler = () => {
    setFlowPop({ show: true, active: true, data: [] });
    setOpenIdx(0);
    return;
    // if (areaInfo.areaType === "dong" && areaInfo.slctCode) {
    //   getFlowPop({
    //     // ctyCd: sigungu.slctCode.slice(0, 4),
    //     admiCd: areaInfo.slctCode,
    //     upjongCd: bot.code || "Q01005",
    //   }).then((res: any) => {
    //     console.log(res);

    //     if (res.data && res.data.length > 0)
    //       setFlowPop({ show: true, active: true, data: res.data || [] });
    //   });
    // } else if (areaInfo.areaType === "polygon" && areaInfo.slctPath) {
    //   console.log(areaInfo.slctPath);
    //   if (areaInfo?.slctPath) {
    //     const arr = areaInfo.slctPath.map((path: any): [number, number] => {
    //       return [path.x || path[0], path.y || path[1]];
    //     });

    //     getFlowPop({
    //       upjongCd: bot.code || "Q01005",
    //       wkt: [[arr]],
    //     }).then((res: any) => {
    //       console.log(res);

    //       if (res.data && res.data.length > 0)
    //         setFlowPop({ show: true, active: true, data: res.data || [] });
    //     });
    //   }
    // } else if (
    //   areaInfo.areaType === "circle" &&
    //   areaInfo.center &&
    //   areaInfo.range
    // ) {
    //   getFlowPop({
    //     upjongCd: bot.code || "Q01005",
    //     xAxis: areaInfo.center.x,
    //     yAxis: areaInfo.center.y,
    //     range: Number(areaInfo.range),
    //   }).then((res: any) => {
    //     console.log(res);

    //     if (res.data && res.data.length > 0)
    //       setFlowPop({ show: true, active: true, data: res.data || [] });
    //   });
    // }
  };

  const searchBrandHandler = () => {
    setLoading(true);
    // if (!bot.code || !bot.name || !sigungu?.slctCode || !slctCode) return;
    if (!bot.code || !bot.name) return;
    if (areaInfo.areaType === "dong" && areaInfo.slctCode) {
      getBrandList({
        // ctyCd: sigungu.slctCode.slice(0, 4),
        admiCd: areaInfo.slctCode,
        upjongCd: bot?.code || "Q13007",
        pageNo: 1,
      })
        .then((res: any) => {
          if (res.data && res.data.length > 0)
            setBrand({ show: true, active: true, data: res.data || [] });

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else if (areaInfo.areaType === "polygon" && areaInfo.slctPath) {
      const arr = areaInfo.slctPath.map((path: any): [number, number] => {
        return [path.x || path[0], path.y || path[1]];
      });

      getBrandList({
        upjongCd: bot?.code || "Q13007",
        wkt: [[arr]],
        pageNo: 1,
      })
        .then((res: any) => {
          if (res.data && res.data.length > 0)
            setBrand({ show: true, active: true, data: res.data || [] });

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else if (
      areaInfo.areaType === "circle" &&
      areaInfo.center &&
      areaInfo.range
    ) {
      getBrandList({
        upjongCd: bot?.code || "Q13007",
        xAxis: areaInfo.center.x,
        yAxis: areaInfo.center.y,
        range: Number(areaInfo.range),
        pageNo: 1,
      })
        .then((res: any) => {
          if (res.data && res.data.length > 0)
            setBrand({ show: true, active: true, data: res.data || [] });

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    setOpenIdx(0);
  };

  const searchBuildingHandler = () => {
    setLoading(true);
    console.log("filterBuilding", filterBuilding);
    if (filterBuilding.useStartDay && !filterBuilding.useEndDay) {
      setAlert({
        isOpen: true,
        text: "필터의 준공기간 종료날짜를 지정해주세요",
      });
      setLoading(false);
      return;
    } else if (!filterBuilding.useStartDay && filterBuilding.useEndDay) {
      setAlert({
        isOpen: true,
        text: "필터의 준공기간 시작날짜를 지정해주세요",
      });
      setLoading(false);
      return;
    } else if (!filterBuilding.startTotArea && filterBuilding.endTotArea) {
      setAlert({
        isOpen: true,
        text: "필터의 연면적 범위 최소를 지정해주세요",
      });
      setLoading(false);
      return;
    } else if (filterBuilding.startTotArea && !filterBuilding.endTotArea) {
      setAlert({
        isOpen: true,
        text: "필터의 연면적 범위 최대를 지정해주세요",
      });
      setLoading(false);
      return;
    }
    const req = { ...filterBuilding };

    if (filterBuilding.useStartDay && filterBuilding.useEndDay) {
      req.useStartDay = new Date(filterBuilding.useStartDay).toISOString();
      req.useEndDay = new Date(filterBuilding.useEndDay).toISOString();
    }

    if (areaInfo.areaType === "dong" && areaInfo.slctCode) {
      getBuildingList({
        admiCd: areaInfo.slctCode,
        ...req,
      })
        .then((res: any) => {
          if (res.data) {
            setBuilding({
              filter: filterBuilding,
              data: res.data,
              show: true,
              active: true,
            });
          }
          setOpenIdx(0);
          setLoading(false);
        })
        .catch(() => {
          setOpenIdx(0);
          setLoading(false);
        });
    } else if (areaInfo.areaType === "polygon" && areaInfo.slctPath) {
      const arr = areaInfo.slctPath.map((path: any): [number, number] => {
        return [path.x || path[0], path.y || path[1]];
      });

      getBuildingList({
        wkt: [[arr]],
        ...req,
      })
        .then((res: any) => {
          if (res.data) {
            setBuilding({
              filter: filterBuilding,
              data: res.data,
              show: true,
              active: true,
            });
          }
          setOpenIdx(0);
          setLoading(false);
        })
        .catch(() => {
          setOpenIdx(0);
          setLoading(false);
        });
    } else if (
      areaInfo.areaType === "circle" &&
      areaInfo.center &&
      areaInfo.range &&
      areaInfo.slctPath
    ) {
      const arr = [
        [areaInfo.slctPath._max.x, areaInfo.slctPath._max.y],
        [areaInfo.slctPath._max.x, areaInfo.slctPath._min.y],
        [areaInfo.slctPath._min.x, areaInfo.slctPath._min.y],
        [areaInfo.slctPath._min.x, areaInfo.slctPath._max.y],
        [areaInfo.slctPath._max.x, areaInfo.slctPath._max.y],
      ];
      getBuildingList({
        wkt: [[arr]],
        // xAxis: areaInfo.center.x,
        // yAxis: areaInfo.center.y,
        // range: Number(areaInfo.range),
        ...req,
      })
        .then((res: any) => {
          if (res.data) {
            setBuilding({
              filter: filterBuilding,
              data: res.data,
              show: true,
              active: true,
            });
          }

          setOpenIdx(0);
          setLoading(false);
        })
        .catch(() => {
          setOpenIdx(0);
          setLoading(false);
        });
    } else {
      setOpenIdx(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bot.code && brand.active) {
      searchBrandHandler();
    }
  }, [bot.code]);

  return (
    <Fragment>
      {isLoading && <BaseSpinner zIndex={1000} />}
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
            <IcoSensorOccupied
              width="1.125rem"
              height="1.125rem"
              color="font.primary"
            />
          </Box>
          유동인구
        </Button>
        <Tooltip
          hasArrow
          isDisabled={bot ? true : false}
          placement="auto"
          label="업종을 선택하셔야 합니다."
          p="0.5rem 0.75rem"
          bgColor="#595959d9"
          border="1px solid"
          borderColor="neutral.gray6"
          borderRadius="base"
          textStyle="base"
          fontSize="xs"
          fontWeight="strong"
          color="font.inverse"
        >
          <Button
            variant="filterTop02"
            isDisabled={bot ? false : true}
            isActive={brand?.active || openIdx === 2}
            onClick={() => {
              if (openIdx === 2) {
                setOpenIdx(0);
              } else {
                setOpenIdx(2);
              }
            }}
          >
            <Box>
              <IcoVillage
                width="1.125rem"
                height="1.125rem"
                color="font.primary"
              />
            </Box>
            사업체 데이터
          </Button>
        </Tooltip>
        <Button
          variant="filterTop02"
          isActive={building?.active || openIdx === 3}
          onClick={() => {
            if (openIdx === 3) {
              setOpenIdx(0);
            } else {
              setOpenIdx(3);
            }
          }}
        >
          <Box>
            <IcoBuildingList
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
            setFilterBuilding({
              useStartDay: null,
              useEndDay: null,
              regstrGbCd: "",
              roofCd: "",
              mainPurpsCd: "",
              strctCd: "",
              startTotArea: "",
              endTotArea: "",
            });
          }}
        >
          <Box>
            <IcoRefresh
              width="1.125rem"
              height="1.125rem"
              color="font.primary"
            />
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
              <Flex pl="0.25rem" align="center" gap="0.5rem">
                <IcoSensorOccupied
                  width="0.875rem"
                  height="0.875rem"
                  color="font.title"
                />
                <Heading as={"h5"} variant="filterBox">
                  유동인구
                </Heading>
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
            <Deco01
              margin="0.25rem 0 0.75rem"
              width="100%"
              height="0.3125rem"
            />
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
              <Flex pl="0.25rem" align="center" gap="0.5rem">
                <IcoVillage
                  width="0.875rem"
                  height="0.875rem"
                  color="font.title"
                />
                <Heading as={"h5"} variant="filterBox">
                  사업체 데이터
                </Heading>
              </Flex>
              {!bot?.code && (
                <Text
                  fontFamily="main"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight="1.5rem"
                  color="system.accessible.red"
                >
                  · 업종을 선택해주세요.
                </Text>
              )}
              <Tooltip
                hasArrow
                isDisabled={bot.code ? true : false}
                placement="top"
                label="업종을 선택하셔야 합니다."
                p="0.5rem 0.75rem"
                bgColor="#595959d9"
                border="1px solid"
                borderColor="neutral.gray6"
                borderRadius="base"
                textStyle="base"
                fontSize="xs"
                fontWeight="strong"
                color="font.inverse"
              >
                <Flex align="center" gap="0.5rem">
                  <SwitchFilter
                    isDisabled={!brand.active || (bot.code ? false : true)}
                    isChecked={brand.active}
                    onChange={() => {
                      setBrand({
                        ...brand,
                        active: !brand.active,
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
            <Deco01
              margin="0.25rem 0 0.75rem"
              width="100%"
              height="0.3125rem"
            />
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
              <Flex pl="0.25rem" align="center" gap="0.5rem">
                <IcoOutpatient
                  width="0.875rem"
                  height="0.875rem"
                  color="font.title"
                />
                <Heading as={"h5"} variant="filterBox">
                  건물조회
                </Heading>
              </Flex>
              <Flex align="center" gap="0.5rem">
                <SwitchFilter
                  isChecked={building.active}
                  onChange={() => {
                    setBuilding({
                      ...building,
                      active: !building.active,
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
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight={1}
                >
                  준공기간
                </FormLabel>
                <Flex w="100%" gap="0.5rem">
                  <DatePicker
                    placeholder="날짜를 입력하세요."
                    name="date"
                    dateFormat="YYYY-MM-DD"
                    value={filterBuilding.useStartDay}
                    onChange={(date: string) => {
                      setFilterBuilding({
                        ...filterBuilding,
                        useStartDay: date,
                      });
                    }}
                    bgColor="#FFFFFF"
                    borderColor="neutral.gray5"
                    __css={{
                      div: {
                        bg: "transparent!important",
                      },
                    }}
                  />
                  <DatePicker
                    placeholder="날짜를 입력하세요."
                    name="date"
                    dateFormat="YYYY-MM-DD"
                    value={filterBuilding.useEndDay}
                    onChange={(date: string) => {
                      setFilterBuilding({
                        ...filterBuilding,
                        useEndDay: date,
                      });
                    }}
                    bgColor="#FFFFFF"
                    borderColor="neutral.gray5"
                  />
                </Flex>
              </Flex>
              <Flex gap="1rem">
                <Flex w="100%" align="center">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    flex="none"
                    m="0"
                    w="4rem"
                    textStyle="base"
                    fontSize="xs"
                    fontWeight="strong"
                    lineHeight={1}
                  >
                    대장종류
                  </FormLabel>
                  <Select
                    data={regstrGbCd}
                    value={filterBuilding.regstrGbCd}
                    opBaseTxt="text"
                    opBaseId="value"
                    opBaseKey="value"
                    onChange={(val: string) => {
                      setFilterBuilding({
                        ...filterBuilding,
                        regstrGbCd: val,
                      });
                    }}
                    selectProps={{ w: "100%" }}
                  />
                </Flex>
                <Flex w="100%" align="center">
                  <FormLabel
                    display="flex"
                    alignItems="center"
                    flex="none"
                    m="0"
                    w="4rem"
                    textStyle="base"
                    fontSize="xs"
                    fontWeight="strong"
                    lineHeight={1}
                  >
                    지붕구조
                  </FormLabel>
                  <Select
                    data={roofCd}
                    value={filterBuilding.roofCd}
                    opBaseTxt="text"
                    opBaseId="value"
                    opBaseKey="value"
                    onChange={(val: string) => {
                      setFilterBuilding({
                        ...filterBuilding,
                        roofCd: val,
                      });
                    }}
                    selectProps={{ w: "100%" }}
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
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight={1}
                >
                  용도
                </FormLabel>
                <Select
                  data={mainPurpsCd}
                  value={filterBuilding.mainPurpsCd}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  onChange={(val: string) => {
                    setFilterBuilding({
                      ...filterBuilding,
                      mainPurpsCd: val,
                    });
                  }}
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
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight={1}
                >
                  구조
                </FormLabel>
                <Select
                  data={strctCd}
                  value={filterBuilding.strctCd}
                  opBaseTxt="text"
                  opBaseId="value"
                  opBaseKey="value"
                  onChange={(val: string) => {
                    setFilterBuilding({
                      ...filterBuilding,
                      strctCd: val,
                    });
                  }}
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
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight={1}
                >
                  연면적
                </FormLabel>
                <Flex w="100%" gap="0.5rem">
                  <Input
                    inputProps={{ w: "100%" }}
                    placeholder={"연면적을 입력하세요"}
                    value={filterBuilding.startTotArea || ""}
                    onChange={(val: any) => {
                      if (numRegExp.test(val)) {
                        const tmp = Number(val);

                        setFilterBuilding({
                          ...filterBuilding,
                          startTotArea: val !== "" ? String(tmp) : "",
                        });
                      } else if (val === "") {
                        setFilterBuilding({
                          ...filterBuilding,
                          startTotArea: "",
                        });
                      }
                    }}
                  />
                  <Input
                    inputProps={{ w: "100%" }}
                    placeholder={"연면적을 입력하세요"}
                    value={filterBuilding.endTotArea || ""}
                    onChange={(val: any) => {
                      if (numRegExp.test(val)) {
                        const tmp = Number(val);

                        setFilterBuilding({
                          ...filterBuilding,
                          endTotArea: val !== "" ? String(tmp) : "",
                        });
                      } else if (val === "") {
                        setFilterBuilding({
                          ...filterBuilding,
                          endTotArea: "",
                        });
                      }
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <DecoCardBg />
          </Flex>
        ) : null}
      </Flex>
      <DialogAlertFilter
        text={alert.text}
        isOpen={alert.isOpen}
        onClose={() => {
          setAlert({
            isOpen: false,
            text: "",
          });
        }}
      />
    </Fragment>
  );
};

export default NiceFilterDepth;
