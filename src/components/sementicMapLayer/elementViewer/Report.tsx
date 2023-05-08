//  LIB
import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  List,
  ListItem,
  Text,
  Highlight,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
//  Component
import { Select } from "@components/common/Select";
import ChartStackBar from "@components/charts/ChartStackBar";
import ViewList from "@components/sementicMapLayer/elementViewer/ViewList";
import ChartLine from "@components/sementicMapLayer/elementViewer/ChartLine";
import ChartLineGroup from "@components/sementicMapLayer/elementViewer/ChartLineGroup";
//  Api
import { apiReport } from "@api/bizSub/config";
//  State
import { atomUpjongState } from "@states/sementicMap/stateFilter";
//  Icon
import {
  IcoAddChart,
  IcoBars,
  IcoBorder,
  IcoClose,
  IcoGroup,
  IcoLogoMain,
  IcoMonitoring,
  IcoNice2,
  IcoNice3,
  IcoPayment,
  IcoResident,
  IcoWorkspace,
  IconFileAdd,
} from "@assets/icons/icon";
import ReportSummary from "./elementReport/ReportSummary";
import ReportPop from "./elementReport/ReportPop";
import ReportResi from "./elementReport/ReportResi";
import ReportJob from "./elementReport/ReportJob";
import ReportHouse from "./elementReport/ReportHouse";
import ReportFacility from "./elementReport/ReportFacility";
import ReportUpjong from "./elementReport/ReportUpjong";
import ReportSale from "./elementReport/ReportSale";
import ReportCost from "./elementReport/ReportCost";

const Report = ({ props, isOpen, onClose }: any) => {
  const { areaType, slctName, slctCode, pathType, slctPath, center, range } =
    props;
  const { getSummary, getPop, getHouse, getUpjongSale, getFacility } =
    apiReport;
  const { top, mid, bot } = useRecoilValue(atomUpjongState);
  const [double, setDouble] = useState<boolean>(false);
  const [tabIdx, setTabIdx] = useState<number>(0);
  const [summary, setSummary] = useState<any>(null);
  const [pop, setPop] = useState<any>(null);
  const [flowPop, setFlowPop] = useState<any>(null);
  const [jobPop, setJobPop] = useState<any>(null);
  const [resiPop, setResiPop] = useState<any>(null);
  const [house, setHouse] = useState<any>(null);
  const [ubjongCnt, setUpjongCnt] = useState<any>(null);
  const [sale, setSale] = useState<any>(null);
  const [facility, setFacility] = useState<any>(null);

  const summaryHandler = () => {
    const sample = {
      upjongCd: "Q13007",
      batchYyyymm: "202303",
      blockType: "상업지역, 주거지역, 특수지역, 오피스지역, 기타지역",
      blockRto: "46, 45, 5, 3, 1",
      avgScore: 152,
      avgLv: 2,
      avgMScore: 152,
      inflowCustCnt: 296200,
      housCustCnt: 26025,
      jobCustCnt: 50296,
      storeCnt: 67,
      cost: 8661,
      hous: 10191,
      avgSalesAmt: 2646.3187865671644,
      schoolCnt: 6,
      companyCnt: 1994,
      subwayCnt: 2,
      busstopCnt: 21,
    };

    setSummary(sample);
    return;
    if (areaType === "dong") {
      getSummary({
        upjongCd: bot.code,
        ctyCd: slctCode.slice(0, 4),
        admiCd: slctCode,
      })
        .then((res: any) => {
          console.log(res);

          if (res?.data) {
            setSummary(res.data);
          }
        })
        .catch(() => {
          setSummary(sample);
        });
    } else if (areaType === "circle" && pathType === "circle") {
      getSummary({
        upjongCd: bot.code,
        xAxis: center.x,
        yAxis: center.y,
        range: range,
      })
        .then((res: any) => {
          console.log(res);

          if (res?.data) {
            setSummary(res.data);
          }
        })
        .catch(() => {
          setSummary(sample);
        });
    } else if (areaType === "polygon" && pathType === "bounds") {
      if (slctPath) {
        const arr = slctPath.map((path: any) => {
          return [path.x, path.y];
        });

        getSummary({
          upjongCd: bot.code,
          wkt: [[arr]],
        })
          .then((res: any) => {
            console.log(res);

            if (res?.data) {
              setSummary(res.data);
            }
          })
          .catch(() => {
            setSummary(sample);
          });
      }
    }
  };

  const popHandler = (index: number) => {
    setPop(FlowSample.data);
    return;
    if (areaType === "dong") {
      getPop({
        upjongCd: bot.code,
        ctyCd: slctCode.slice(0, 4),
        admiCd: slctCode,
      })
        .then((res) => {
          console.log(res);
          setTabIdx(index);
        })
        .catch(() => {
          setPop(FlowSample);
        });
    } else if (areaType === "circle" && pathType === "circle") {
      getPop({
        upjongCd: bot.code,
        xAxis: center.x,
        yAxis: center.y,
        range: range,
      })
        .then((res) => {
          console.log(res);
          setTabIdx(index);
        })
        .catch(() => {
          setPop(FlowSample);
        });
    } else if (areaType === "polygon" && pathType === "bounds") {
      if (slctPath) {
        const arr = slctPath.map((path: any) => {
          return [path.x, path.y];
        });

        getPop({
          upjongCd: bot.code,
          wkt: [[arr]],
        })
          .then((res) => {
            console.log(res);
            setTabIdx(index);
          })
          .catch(() => {
            setPop(FlowSample);
          });
      }
    }
  };

  const houseHandler = (index: number) => {
    if (areaType === "dong") {
      getHouse({
        upjongCd: bot.code,
        ctyCd: slctCode.slice(0, 4),
        admiCd: slctCode,
      }).then((res: any) => {
        console.log(res);

        if (res?.data) {
          setHouse(res.data);
          setTabIdx(index);
        }
      });
    } else if (areaType === "circle" && pathType === "circle") {
      getHouse({
        upjongCd: bot.code,
        xAxis: center.x,
        yAxis: center.y,
        range: range,
      }).then((res: any) => {
        console.log(res);

        if (res?.data) {
          setHouse(res.data);
          setTabIdx(index);
        }
      });
    } else if (areaType === "polygon" && pathType === "bounds") {
      if (slctPath) {
        const arr = slctPath.map((path: any) => {
          return [path.x, path.y];
        });

        getHouse({
          upjongCd: bot.code,
          wkt: [[arr]],
        }).then((res: any) => {
          console.log(res);

          if (res?.data) {
            setHouse(res.data);
            setTabIdx(index);
          }
        });
      }
    }
  };

  const upjongSaleHandler = (index: number) => {
    if (areaType === "dong") {
      getUpjongSale({
        upjongCd: bot.code,
        ctyCd: slctCode.slice(0, 4),
        admiCd: slctCode,
      }).then((res) => {
        console.log(res);
        setTabIdx(index);
      });
    } else if (areaType === "circle" && pathType === "circle") {
      getUpjongSale({
        upjongCd: bot.code,
        xAxis: center.x,
        yAxis: center.y,
        range: range,
      }).then((res) => {
        console.log(res);
        setTabIdx(index);
      });
    } else if (areaType === "polygon" && pathType === "bounds") {
      if (slctPath) {
        const arr = slctPath.map((path: any) => {
          return [path.x, path.y];
        });

        getUpjongSale({
          upjongCd: bot.code,
          wkt: [[arr]],
        }).then((res) => {
          console.log(res);
          setTabIdx(index);
        });
      }
    }
  };

  const facilityHandler = (index: number) => {
    if (areaType === "dong") {
      getFacility({
        upjongCd: bot.code,
        ctyCd: slctCode.slice(0, 4),
        admiCd: slctCode,
      }).then((res) => {
        console.log(res);
        setTabIdx(index);
      });
    } else if (areaType === "circle" && pathType === "circle") {
      getFacility({
        upjongCd: bot.code,
        xAxis: center.x,
        yAxis: center.y,
        range: range,
      }).then((res) => {
        console.log(res);
        setTabIdx(index);
      });
    } else if (areaType === "polygon" && pathType === "bounds") {
      if (slctPath) {
        const arr = slctPath.map((path: any) => {
          return [path.x, path.y];
        });

        getFacility({
          upjongCd: bot.code,
          wkt: [[arr]],
        }).then((res) => {
          console.log(res);
          setTabIdx(index);
        });
      }
    }
  };

  useEffect(() => {
    if (!pop) return;
    console.log(pop);
    let flow = {
      inflowCustCnt: pop?.inflowCustCnt | 0,
      inflowCustM20: pop?.inflowCustM20 | 0,
      inflowCustM30: pop?.inflowCustM30 | 0,
      inflowCustM40: pop?.inflowCustM40 | 0,
      inflowCustM50: pop?.inflowCustM50 | 0,
      inflowCustM60: pop?.inflowCustM60 | 0,
      inflowCustW20: pop?.inflowCustW20 | 0,
      inflowCustW30: pop?.inflowCustW30 | 0,
      inflowCustW40: pop?.inflowCustW40 | 0,
      inflowCustW50: pop?.inflowCustW50 | 0,
      inflowCustW60: pop?.inflowCustW60 | 0,
      inflowMon: pop?.inflowMon | 0,
      inflowTue: pop?.inflowTue | 0,
      inflowWed: pop?.inflowWed | 0,
      inflowThu: pop?.inflowThu | 0,
      inflowFri: pop?.inflowFri | 0,
      inflowSat: pop?.inflowSat | 0,
      inflowSun: pop?.inflowSun | 0,
      inflow0710: pop?.inflow0710 | 0,
      inflow1012: pop?.inflow1012 | 0,
      inflow1214: pop?.inflow1214 | 0,
      inflow1418: pop?.inflow1418 | 0,
      inflow1821: pop?.inflow1821 | 0,
    };
    let job = {
      housCustCnt: pop?.housCustCnt | 0,
      housCustM10: pop?.housCustM10 | 0,
      housCustM20: pop?.housCustM20 | 0,
      housCustM30: pop?.housCustM30 | 0,
      housCustM40: pop?.housCustM40 | 0,
      housCustM50: pop?.housCustM50over | 0,
      housCustW10: pop?.housCustW10 | 0,
      housCustW20: pop?.housCustW20 | 0,
      housCustW30: pop?.housCustW30 | 0,
      housCustW40: pop?.housCustW40 | 0,
      housCustW50: pop?.housCustW50over | 0,
    };
    let resi = {
      jobCustCnt: pop?.jobCustCnt | 0,
      jobCustM10: pop?.jobCustM10 | 0,
      jobCustM20: pop?.jobCustM20 | 0,
      jobCustM30: pop?.jobCustM30 | 0,
      jobCustM40: pop?.jobCustM40 | 0,
      jobCustM50: pop?.jobCustM50over | 0,
      jobCustW10: pop?.jobCustW10 | 0,
      jobCustW20: pop?.jobCustW20 | 0,
      jobCustW30: pop?.jobCustW30 | 0,
      jobCustW40: pop?.jobCustW40 | 0,
      jobCustW50: pop?.jobCustW50over | 0,
    };

    setFlowPop(flow);
    setJobPop(job);
    setResiPop(resi);
  }, [pop]);

  useEffect(() => {
    if (summary) return;
    summaryHandler();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="auto" h="34.25rem" maxW="auto" bgColor="transparent">
        <ModalBody p="0" h="100%">
          <Tabs
            variant="unstyled"
            display="flex"
            w="100%"
            h="100%"
            gap="0.25rem"
            index={tabIdx}
            onChange={(index) => {
              if (!pop && (index === 1 || index === 2 || index === 3)) {
                popHandler(index);
              } else if (!house && index === 4) {
                houseHandler(index);
              } else if (!ubjongCnt && !sale && (index === 5 || index === 6)) {
                setTabIdx(index);
                return;
                upjongSaleHandler(index);
              } else if (!facility && index === 7) {
                setTabIdx(index);
                return;
                facilityHandler(index);
              } else {
                setTabIdx(index);
              }
            }}
          >
            {/* -------------------- 좌측 --------------- */}
            <Flex
              w="15.75rem"
              direction="column"
              bgColor="rgba(255, 255, 255, 0.75)"
              borderRadius="base"
            >
              <Flex
                p="0.5rem 1.25rem"
                w="100%"
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor="neutral.gray6"
              >
                <IcoLogoMain w="2rem" h="1rem" color="bg.inverse" />
                <Heading
                  textStyle="base"
                  fontSize="md"
                  fontWeight="strong"
                  lineHeight="1.5rem"
                  color="font.primary"
                >
                  분석 리포트
                </Heading>
              </Flex>
              <Flex
                m="0 2rem"
                p="1.25rem 0 "
                direction="column"
                align="center"
                borderBottom="1px solid"
                borderColor="neutral.gray6"
              >
                {tabIdx === 0 ? (
                  <IcoAddChart
                    width="3rem"
                    height="3rem"
                    color="font.primary"
                  />
                ) : tabIdx === 1 ? (
                  <IcoGroup width="3rem" height="3rem" color="font.primary" />
                ) : tabIdx === 2 ? (
                  <IcoNice2 width="3rem" height="3rem" color="font.primary" />
                ) : tabIdx === 3 ? (
                  <IcoNice3 width="3rem" height="3rem" color="font.primary" />
                ) : tabIdx === 4 ? (
                  <IcoResident
                    width="3rem"
                    height="3rem"
                    color="font.primary"
                  />
                ) : tabIdx === 5 ? (
                  <IcoWorkspace
                    width="3rem"
                    height="3rem"
                    color="font.primary"
                  />
                ) : tabIdx === 6 ? (
                  <IcoMonitoring
                    width="3rem"
                    height="3rem"
                    color="font.primary"
                  />
                ) : tabIdx === 7 ? (
                  <IcoPayment width="3rem" height="3rem" color="font.primary" />
                ) : tabIdx === 8 ? (
                  <IcoBorder width="3rem" height="3rem" color="font.primary" />
                ) : null}
                <Text
                  textStyle="base"
                  fontSize="1.75rem"
                  fontWeight="strong"
                  lineHeight="2.625rem"
                  textAlign="center"
                  color="font.primary"
                >
                  {tabIdx === 0
                    ? "전체 요약"
                    : tabIdx === 1
                    ? "유동인구"
                    : tabIdx === 2
                    ? "주거인구"
                    : tabIdx === 3
                    ? "직장인구"
                    : tabIdx === 4
                    ? "세대수"
                    : tabIdx === 5
                    ? "업종"
                    : tabIdx === 6
                    ? "매출"
                    : tabIdx === 7
                    ? "소비"
                    : tabIdx === 8
                    ? "지역정보"
                    : null}
                </Text>
                <Text
                  mb="1rem"
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="regular"
                  lineHeight="1rem"
                  textAlign="center"
                  color="font.secondary"
                >
                  2022.03.30 ~ 2023.03.30 기준
                </Text>
                <Select
                  data={[
                    { text: "브랜드 기준 선택 안함", val: "null" },
                    { text: "탑5", val: "true" },
                    { text: "하위5", val: "true" },
                  ]}
                  value="null"
                  opBaseTxt={"text"}
                  opBaseId={"val"}
                  opBaseKey={"val"}
                  onChange={(val: any) => {
                    val === "null" ? setDouble(false) : setDouble(true);
                  }}
                  selectProps={{
                    w: "80%",
                    lineHeight: 1,
                  }}
                />
              </Flex>
              <TabList
                p="1.25rem 0.75rem"
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gridTemplateRows="1fr 1fr 1fr 1fr 1fr"
              >
                <Tab
                  w="auto"
                  h="2.875rem"
                  gridRow="1 / 2"
                  gridColumn="1 / 3"
                  borderRadius="23px"
                  textStyle="base"
                  _selected={{
                    bg: "#262626",
                    fontWeight: "strong",
                    color: "font.inverse",
                    svg: {
                      color: "primary.type7",
                    },
                    div: {
                      borderBottom: "3px solid",
                      borderColor: "primary.type7",
                    },
                  }}
                  _hover={{
                    bg: "#262626",
                    fontWeight: "strong",
                    color: "font.inverse",
                    svg: {
                      color: "primary.type7",
                    },
                    div: {
                      borderBottom: "3px solid",
                      borderColor: "primary.type7",
                    },
                  }}
                >
                  <Flex p="0 0.5rem" align="center" gap="0.75rem">
                    <IcoBars
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                    전체요약
                  </Flex>
                </Tab>
                <ReportTap
                  text="유동인구"
                  icon={
                    <IcoGroup
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="주거인구"
                  icon={
                    <IcoNice2
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="직장인구"
                  icon={
                    <IcoNice3
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="세대수"
                  icon={
                    <IcoResident
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="업종"
                  icon={
                    <IcoWorkspace
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="매출"
                  icon={
                    <IcoMonitoring
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="소비"
                  icon={
                    <IcoPayment
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
                <ReportTap
                  text="지역정보"
                  icon={
                    <IcoBorder
                      pos="relative"
                      top="1px"
                      width="1rem"
                      height="1rem"
                      color="font.secondary"
                    />
                  }
                />
              </TabList>
            </Flex>
            {/* -------------------- 우측 --------------- */}
            <Flex
              direction="column"
              bgColor="rgba(255, 255, 255, 0.75)"
              borderRadius="base"
            >
              <Flex
                p="0.75rem 0.875rem 0.75rem"
                w="100%"
                justify="space-between"
                borderBottom="1px solid"
                borderColor="neutral.gray6"
              >
                <Flex align="center" gap="0.75rem">
                  <Text
                    textStyle="base"
                    fontSize="sm"
                    fontWeight="strong"
                    lineHeight="1"
                    color="font.secondary"
                  >
                    영역
                  </Text>
                  <Text
                    textStyle="base"
                    fontSize="xs"
                    fontWeight="regular"
                    lineHeight="1px"
                    color="font.secondary"
                  >
                    선택 영역 (
                    {areaType === "dong"
                      ? "지역"
                      : areaType === "circle"
                      ? "반경"
                      : areaType === "polygon"
                      ? "다각형"
                      : ""}
                    )
                  </Text>
                </Flex>
                <Flex align="center" gap="0.75rem">
                  <Text
                    textStyle="base"
                    fontSize="sm"
                    fontWeight="strong"
                    lineHeight="1"
                    color="font.secondary"
                  >
                    업종
                  </Text>
                  <Text
                    textStyle="base"
                    fontSize="xs"
                    fontWeight="regular"
                    lineHeight="1px"
                    color="font.secondary"
                  >
                    {top?.name}
                    {" > "}
                    {mid?.name}
                    {" > "}
                    {bot?.name}
                  </Text>
                </Flex>
                <IconButton
                  onClick={onClose}
                  aria-label="닫기"
                  icon={<IcoClose />}
                  w="1rem"
                  h="1rem"
                  bg="transparent"
                  color="font.title"
                  _hover={{
                    bg: "transparent",
                  }}
                />
              </Flex>
              <TabPanels h="100%">
                <TabPanel h="100%">
                  {tabIdx === 0 && summary && <ReportSummary data={summary} />}
                </TabPanel>
                <TabPanel width="100%">
                  {tabIdx === 1 && flowPop && <ReportPop data={flowPop} />}
                </TabPanel>
                <TabPanel>
                  {tabIdx === 2 && resiPop && <ReportResi data={resiPop} />}
                </TabPanel>
                <TabPanel>
                  {tabIdx === 3 && jobPop && <ReportJob data={jobPop} />}
                </TabPanel>
                <TabPanel>
                  {tabIdx === 4 && house && <ReportHouse data={house} />}
                </TabPanel>
                <TabPanel>
                  <ReportUpjong />
                </TabPanel>
                <TabPanel>
                  <ReportSale />
                </TabPanel>
                <TabPanel>
                  <ReportCost />
                </TabPanel>
                <TabPanel>
                  <ReportFacility />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ReportTap = ({ text, icon }: { text: string; icon: any }) => {
  return (
    <Tab
      p="0"
      w="100%"
      h="2.875rem"
      borderRadius="23px"
      gap="0.75rem"
      textStyle="base"
      _selected={{
        bg: "#262626",
        fontWeight: "strong",
        color: "font.inverse",
        svg: {
          color: "primary.type7",
        },
      }}
      _hover={{
        bg: "#262626",
        fontWeight: "strong",
        color: "font.inverse",
        svg: {
          color: "primary.type7",
        },
      }}
    >
      {icon}
      <Text>{text}</Text>
    </Tab>
  );
};

export default Report;

const FlowSample = {
  data: {
    inflowCustCnt: 91603,
    inflowCustM20: 14602,
    inflowCustM30: 8294,
    inflowCustM40: 7448,
    inflowCustM50: 7700,
    inflowCustM60: 7877,
    inflowCustW20: 18686,
    inflowCustW30: 7163,
    inflowCustW40: 7200,
    inflowCustW50: 6444,
    inflowCustW60: 6195,
    inflowMon: 89801,
    inflowTue: 92382,
    inflowWed: 91430,
    inflowThu: 91684,
    inflowFri: 95294,
    inflowSat: 93832,
    inflowSun: 86803,
    inflow0710: 12705,
    inflow1012: 9651,
    inflow1214: 25783,
    inflow1418: 24700,
    inflow1821: 18776,
    housCustCnt: 9759,
    housCustM10: 299,
    housCustM20: 917,
    housCustM30: 847,
    housCustM40: 622,
    housCustM50over: 0,
    housCustW10: 274,
    housCustW20: 1406,
    housCustW30: 803,
    housCustW40: 530,
    housCustW50over: 0,
    jobCustCnt: 12283,
    jobCustM10: 11,
    jobCustM20: 364,
    jobCustM30: 1014,
    jobCustM40: 1371,
    jobCustM50over: 0,
    jobCustW10: 14,
    jobCustW20: 538,
    jobCustW30: 1345,
    jobCustW40: 1980,
    jobCustW50over: 0,
    economyPop: 6729,
    nonEconomyPop: 3031,
    popM09under: 0,
    popM1019: 0,
    popM2024: 0,
    popM2529: 0,
    popM3034: 0,
    popM3539: 0,
    popM4044: 0,
    popM4549: 0,
    popM5054: 0,
    popM5559: 0,
    popM60over: 0,
    popW09under: 0,
    popW1019: 0,
    popW2024: 0,
    popW2529: 0,
    popW3034: 0,
    popW3539: 0,
    popW4044: 0,
    popW4549: 0,
    popW5054: 0,
    popW5559: 0,
    popW60over: 0,
  },
};
