//  LIB
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useTheme,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FormikValues } from "formik";
//  Components
import Section from "@components/common/Section";
import ErpHistory from "@page/erp/history/ErpHistory";
import ErpDocs from "@page/erp/docs/ErpDocs";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
import { IcoBtnBack, IcoBtnNext, IcoBtnPrev } from "@components/common/Btn";
import { Select } from "@components/common/Select";
import Divider from "@components/common/Divider";
import Table from "@components/table/Table";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Util
import {
  columnStoreSaleMenu,
  columnStoreSaleTime,
  columnStoreSaleDay,
  columnStoreSaleType,
} from "@components/table/column/erp";
//  Icon
import {
  IcoBars,
  IcoLineChart,
  IcoHistory,
  IcoAudit,
  IcoCloseCircle,
  IcoUpdate,
  IcoUpdateChk,
} from "@assets/icons/icon";
//  Type
import type { StoreInfo } from "@page/erp/store/ErpStoreCreate";

type Props = {};

const StoreSale = (props: Props) => {
  const sliderTitleRef = useRef(null);
  const sliderRef = useRef(null);
  const [brand, setBrand] = useState(undefined);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [storeData, setStoreData] = useState<StoreInfo | undefined>(undefined);
  const [storeSaleData, setStoreSaleData] = useState<any>(undefined);
  const [storeSaleDuration, setStoreSaleDuraion] = useState<any>({
    store: [],
    brand: [],
  });

  const columnMenu = useMemo(() => columnStoreSaleMenu, []);
  const columnTime = useMemo(() => columnStoreSaleTime, []);
  const columnDay = useMemo(() => columnStoreSaleDay, []);
  const columnType = useMemo(() => columnStoreSaleType, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current && !sliderTitleRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current && !sliderTitleRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    // console.log(state);
    setStoreData({
      storeName: "종로점",
      storeCode: "1234567",
      storeStatus: "statusOpen",
      storeRank: "rankA",
      phone: "010-8277-8260",
      biz_number: "01-524-64211-21",
      owner_name: "홍길동",
      owner_phone: "010-8277-8260",
      addr: "경기도 김포시 풍무로 69번길 51",
      addrDetail: "102동 101호",
      linkBsns: [
        { name: "종로상권1", code: "1234" },
        { name: "종로상권2", code: "12345" },
      ],
      lat: 37.5666805,
      lng: 126.9784147,
    });

    setStoreSaleData({
      menu: [
        { rank: 1, menu: "test1", amount: "1000000", ratio: "30.3" },
        { rank: 2, menu: "test2", amount: "900000", ratio: "28" },
        { rank: 3, menu: "test3", amount: "800000", ratio: "26.2" },
      ],
      time: [
        { rank: 1, time: "17:00", amount: "1000000", ratio: "30" },
        { rank: 2, time: "18:00", amount: "900000", ratio: "28.5" },
        { rank: 3, time: "19:00", amount: "800000", ratio: "26" },
      ],
      day: [
        { rank: 1, day: "토요일", amount: "1000000", ratio: "30.8" },
        { rank: 2, day: "금요일", amount: "900000", ratio: "28.1" },
        { rank: 3, day: "일요일", amount: "800000", ratio: "26" },
      ],
      type: [
        { rank: 1, type: "배달", amount: "1000000", ratio: "30.3" },
        { rank: 2, type: "포장", amount: "900000", ratio: "28.6" },
        { rank: 3, type: "홀", amount: "800000", ratio: "26.7" },
      ],
    });

    setStoreSaleDuraion({
      store: [
        1000000, 20000000, 30000000, 5000000, 3000000, 5000000, 10000000,
        30000000, 2000000, 5000000, 3000000, 2000000,
      ],
      brand: [],
    });
  }, []);

  useEffect(() => {
    if (brand !== null) {
      setStoreSaleDuraion({
        store: [
          1000000, 20000000, 30000000, 5000000, 3000000, 5000000, 10000000,
          30000000, 2000000, 5000000, 3000000, 2000000,
        ],
        brand: [
          2000000, 80000000, 5000000, 5000000, 30000000, 8000000, 10000000,
          30000000, 2000000, 5000000, 5000000, 2000000,
        ],
      });
    } else {
      setStoreSaleDuraion({
        store: [
          1000000, 20000000, 30000000, 5000000, 3000000, 5000000, 10000000,
          30000000, 2000000, 5000000, 3000000, 2000000,
        ],
        brand: [],
      });
    }
  }, [brand]);

  return (
    <Flex w="100%" h="100%" direction="column">
      {/* <Flex
        position="relative"
        mb="1.5rem"
        w="100%"
        justify="center"
        align="center"
      >
        <Heading as="h3" mb="2rem" variant="detailTitle">
          {storeData?.storeName}
        </Heading>
        <Flex pos="absolute" top="0" right="1rem">
          <Select
            variant="search"
            data={[
              { text: "선택안함", value: "0" },
              { text: "브랜드1", value: "1" },
              { text: "브랜드2", value: "2" },
              { text: "브랜드3", value: "3" },
              { text: "브랜드4", value: "4" },
            ]}
            value={brand}
            opBaseTxt="text"
            opBaseId="value"
            opBaseKey="value"
            onChange={(val: any) => {
              if (val === "0") {
                setBrand(undefined);
              } else {
                setBrand(val);
              }
            }}
            selectProps={{
              w: "auto",
            }}
          />
        </Flex>
      </Flex> */}
      <Flex
        mb="1.875rem"
        flex="none"
        justify="space-between"
        alignItems="center"
        direction="row"
      >
        <Flex direction="column" w="33.33%" justify="center" gap="0.5rem">
          <Heading as={"h4"} variant="cardTitle">
            이번 달 월 누적 매출
          </Heading>
          <Flex justify="center" gap="1.75rem">
            <Flex direction="column" align="center">
              <Flex
                position="relative"
                p="0 0.5rem"
                display="flex"
                w="fit-content"
                h="1.375rem"
                align="center"
                bgColor="primary.type2"
                border="1px solid"
                borderColor="primary.type4"
                fontFamily="main"
                fontSize="xs"
                lineHeight="1px"
                color="primary.type7"
              >
                매장
              </Flex>
              <Text variant="cardContent">{`\u{20A9}`} 10,230,000</Text>
            </Flex>
            {brand && (
              <Flex direction="column" align="center">
                <Flex
                  position="relative"
                  p="0 0.5rem"
                  display="flex"
                  w="fit-content"
                  h="1.375rem"
                  align="center"
                  bgColor="secondary.second1.type1"
                  border="1px solid"
                  borderColor="secondary.second1.type3"
                  fontFamily="main"
                  fontSize="xs"
                  lineHeight="1px"
                  color="secondary.second1.type6"
                >
                  브랜드
                </Flex>
                <Text variant="cardContent">{`\u{20A9}`} 10,230,000</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Divider orientation="vertical" h="5rem" />
        <Flex direction="column" w="33.33%" justify="center" gap="0.5rem">
          <Heading as={"h4"} variant="cardTitle">
            최근 3개월 월 평균 매출
          </Heading>
          <Flex justify="center" gap="1.75rem">
            <Flex direction="column" align="center">
              <Flex
                position="relative"
                p="0 0.5rem"
                display="flex"
                w="fit-content"
                h="1.375rem"
                align="center"
                bgColor="primary.type2"
                border="1px solid"
                borderColor="primary.type4"
                fontFamily="main"
                fontSize="xs"
                lineHeight="1px"
                color="primary.type7"
              >
                매장
              </Flex>
              <Text variant="cardContent">{`\u{20A9}`} 10,230,000</Text>
            </Flex>
            {brand && (
              <Flex direction="column" align="center">
                <Flex
                  position="relative"
                  p="0 0.5rem"
                  display="flex"
                  w="fit-content"
                  h="1.375rem"
                  align="center"
                  bgColor="secondary.second1.type1"
                  border="1px solid"
                  borderColor="secondary.second1.type3"
                  fontFamily="main"
                  fontSize="xs"
                  lineHeight="1px"
                  color="secondary.second1.type6"
                >
                  브랜드
                </Flex>
                <Text variant="cardContent">{`\u{20A9}`} 13,910,000</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Divider orientation="vertical" h="5rem" />
        <Flex direction="column" w="33.33%" justify="center" gap="0.5rem">
          <Heading as={"h4"} variant="cardTitle">
            최근 3개월 일 평균 매출
          </Heading>
          <Flex justify="center" gap="1.75rem">
            <Flex direction="column" align="center">
              <Flex
                position="relative"
                p="0 0.5rem"
                display="flex"
                w="fit-content"
                h="1.375rem"
                align="center"
                bgColor="primary.type2"
                border="1px solid"
                borderColor="primary.type4"
                fontFamily="main"
                fontSize="xs"
                lineHeight="1px"
                color="primary.type7"
              >
                매장
              </Flex>
              <Text variant="cardContent">{`\u{20A9}`} 10,230,000</Text>
            </Flex>
            {brand && (
              <Flex direction="column" align="center">
                <Flex
                  position="relative"
                  p="0 0.5rem"
                  display="flex"
                  w="fit-content"
                  h="1.375rem"
                  align="center"
                  bgColor="secondary.second1.type1"
                  border="1px solid"
                  borderColor="secondary.second1.type3"
                  fontFamily="main"
                  fontSize="xs"
                  lineHeight="1px"
                  color="secondary.second1.type6"
                >
                  브랜드
                </Flex>
                <Text variant="cardContent">{`\u{20A9}`} 890,000</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <LineChart
        store={storeSaleDuration.store}
        brand={storeSaleDuration.brand}
      />
      <Flex direction="column" mt="1rem" pos="relative" flex="none">
        <Flex direction="column">
          <Flex justify="space-around">
            <Flex w="5rem" justify="center">
              <Flex
                position="relative"
                p="0 0.5rem"
                display="flex"
                w="fit-content"
                h="1.375rem"
                align="center"
                bgColor="primary.type2"
                border="1px solid"
                borderColor="primary.type4"
                fontFamily="main"
                fontSize="xs"
                lineHeight="2px"
                color="primary.type7"
              >
                매장
              </Flex>
            </Flex>
            <Flex w="12rem" justify="space-between" align="center">
              <IcoBtnPrev isDisabled={sliderIdx === 0} onClick={handlePrev} />
              <Swiper
                ref={sliderTitleRef}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  if (
                    sliderRef.current &&
                    swiper.activeIndex >
                      // @ts-ignore
                      sliderRef.current.swiper.activeIndex
                  ) {
                    // @ts-ignore
                    sliderRef.current.swiper.slideNext();
                  } else if (
                    swiper.activeIndex <
                    // @ts-ignore
                    sliderRef.current.swiper.activeIndex
                  ) {
                    // @ts-ignore
                    sliderRef.current.swiper.slidePrev();
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SwiperSlide
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    w="10rem"
                    textStyle="base"
                    fontWeight="strong"
                    fontSize="md"
                    textAlign="center"
                  >
                    인기 메뉴 TOP 3
                  </Text>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    w="10rem"
                    textStyle="base"
                    fontWeight="strong"
                    fontSize="md"
                    textAlign="center"
                  >
                    인기 시간 TOP 3
                  </Text>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    w="10rem"
                    textStyle="base"
                    fontWeight="strong"
                    fontSize="md"
                    textAlign="center"
                  >
                    인기 요일 TOP 3
                  </Text>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    w="10rem"
                    textStyle="base"
                    fontWeight="strong"
                    fontSize="md"
                    textAlign="center"
                  >
                    인기 유형 TOP 3
                  </Text>
                </SwiperSlide>
              </Swiper>
              <IcoBtnNext
                isDisabled={sliderIdx === 3}
                onClick={handleNext}
                style={{ top: "1px", transform: "rotate(180deg)" }}
              />
            </Flex>
            <Flex w="5rem" justify="center">
              <Flex
                position="relative"
                p="0.5rem"
                display="flex"
                w="fit-content"
                h="1.375rem"
                align="center"
                bgColor="secondary.second.type1"
                border="1px solid"
                borderColor="secondary.second.type3"
                fontFamily="main"
                fontSize="xs"
                lineHeight="2px"
                color="secondary.second.type6"
              >
                브랜드
              </Flex>
            </Flex>
          </Flex>
          <Divider m="0.4375rem 0 0" />
        </Flex>
        <Swiper
          ref={sliderRef}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            if (
              sliderTitleRef.current &&
              swiper.activeIndex >
                // @ts-ignore
                sliderTitleRef.current.swiper.activeIndex
            ) {
              // @ts-ignore
              sliderTitleRef.current.swiper.slideNext();
            } else if (
              swiper.activeIndex <
              // @ts-ignore
              sliderTitleRef.current.swiper.activeIndex
            ) {
              // @ts-ignore
              sliderTitleRef.current.swiper.slidePrev();
            }

            setSliderIdx(swiper.activeIndex);
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <SwiperSlide>
            <Flex gap="1rem">
              <Table
                data={storeSaleData?.menu || []}
                actviePage={false}
                activeCheck={false}
                divide={3}
                registersPerPage={3}
                columns={columnMenu}
                tdH="1.5rem"
              />
              {brand && (
                <Table
                  data={storeSaleData?.menu || []}
                  actviePage={false}
                  activeCheck={false}
                  divide={3}
                  registersPerPage={3}
                  columns={columnMenu}
                  tdH="1.5rem"
                />
              )}
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex gap="1rem">
              <Table
                data={storeSaleData?.time || []}
                actviePage={false}
                activeCheck={false}
                divide={3}
                registersPerPage={3}
                columns={columnTime}
                tdH="1.5rem"
              />
              {brand && (
                <Table
                  data={storeSaleData?.time || []}
                  actviePage={false}
                  activeCheck={false}
                  divide={3}
                  registersPerPage={3}
                  columns={columnTime}
                  tdH="1.5rem"
                />
              )}
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex gap="1rem">
              <Table
                data={storeSaleData?.day || []}
                actviePage={false}
                activeCheck={false}
                divide={3}
                registersPerPage={3}
                columns={columnDay}
                tdH="1.5rem"
              />
              {brand && (
                <Table
                  data={storeSaleData?.day || []}
                  actviePage={false}
                  activeCheck={false}
                  divide={3}
                  registersPerPage={3}
                  columns={columnDay}
                  tdH="1.5rem"
                />
              )}
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex gap="1rem">
              <Table
                data={storeSaleData?.type || []}
                actviePage={false}
                activeCheck={false}
                divide={3}
                registersPerPage={3}
                columns={columnType}
                tdH="1.5rem"
              />
              {brand && (
                <Table
                  data={storeSaleData?.type || []}
                  actviePage={false}
                  activeCheck={false}
                  divide={3}
                  registersPerPage={3}
                  columns={columnType}
                  tdH="1.5rem"
                />
              )}
            </Flex>
          </SwiperSlide>
        </Swiper>
      </Flex>
    </Flex>
  );
};

const LineChart = ({ store, brand }: { store: any[]; brand: any[] }) => {
  const [gradient, setGradient] = useState({
    store: null,
    brand: null,
  });
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    // @ts-ignore
    const ctx = document.getElementById("saleChart").getContext("2d");
    const gradient01 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient01.addColorStop(0, "#ebff05b3");
    gradient01.addColorStop(1, "#ebff0500");

    const gradient02 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient02.addColorStop(0, "#94f2ffb3");
    gradient02.addColorStop(1, "#94f2ff00");
    setGradient({
      store: gradient01,
      brand: gradient02,
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "월별추이",
      },
    },
    elements: {
      line: {
        tension: 0.3,
        capBezierPoints: false,
      },
    },
  };
  const labels = [
    "02월",
    "03월",
    "04월",
    "05월",
    "06월",
    "07월",
    "08월",
    "09월",
    "10월",
    "11월",
    "12월",
    "01월",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "매장 매출",
        data: store,
        fill: true,
        backgroundColor: gradient.store,
        segment: {
          borderWidth: 1,
          borderColor: "#00000080",
        },
        pointStyle: "circle",
        pointBorderWidth: 1,
        pointRadius: 2,
        pointhoverRadius: 6,
        pointBackgroundColor: "#e4ff00",
        pointBorderColor: "#00000080",
      },
      {
        label: "브랜드 매출",
        data: brand,
        fill: true,
        backgroundColor: gradient.brand,
        segment: {
          borderWidth: 1,
          borderColor: "#00000080",
        },
        pointStyle: "circle",
        pointBorderWidth: 1,
        pointRadius: 2,
        pointhoverRadius: 6,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#00000080",
      },
    ],
  };

  return (
    <Flex w="100%" justify="center" flex={1}>
      <Line
        id="saleChart"
        options={options}
        // @ts-ignore
        data={data}
        style={{ width: "100%", height: "30vh" }}
      />
    </Flex>
  );
};

export default StoreSale;
