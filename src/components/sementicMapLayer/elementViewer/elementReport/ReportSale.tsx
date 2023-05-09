//  Lib
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Highlight,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
//  Component
import ChartLine from "@components/charts/ChartLine";
import ChartStackBar from "@components/charts/ChartStackBar";
import { IcoBtnNext, IcoBtnPrev } from "@components/common/Btn";

type Props = {};

const ReportSale = ({ data }: any) => {
  const sliderRef = useRef(null);
  const [labelLine, setLabelLine] = useState<any[]>([]);
  const [chartLineData, setChartLineData] = useState<any[]>([]);
  const [labelBar, setLabelBar] = useState<any[]>([]);
  const [chartBarMData, setChartBarMData] = useState<any[]>([]);
  const [chartBarWData, setChartBarWData] = useState<any[]>([]);
  const [textArr, setTextArr] = useState<any>({
    avgSalesAmt: null,
    salesAmtTop20: null,
    salesAmtBottom20: null,
    medianSalesAmt: null,
    gender: null,
    age: null,
    day: null,
    time: null,
  });

  const handlePrev = useCallback((num: number) => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback((num: number) => {
    if (!sliderRef.current) return;
    // @ts-ignore
    sliderRef.current.swiper.slideNext();
  }, []);

  const ageText: { [x: number]: string } = {
    0: "10대 이하",
    1: "10대",
    2: "20대",
    3: "30대",
    4: "40대",
    5: "50대",
    6: "60대 이상",
  };

  const dayText: { [x: number]: string } = {
    0: "월요일",
    1: "화요일",
    2: "수요일",
    3: "목요일",
    4: "금요일",
    5: "토요일",
    6: "일요일",
  };

  const timeText: { [x: number]: string } = {
    0: "06-09",
    1: "09-12",
    2: "12-15",
    3: "15-18",
    4: "18-21",
    5: "21-24",
    6: "24-06",
  };

  useEffect(() => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      const list = data[i];
      if (
        list.avgSalesAmt &&
        list.salesAmtTop20 &&
        list.salesAmtBottom20 &&
        list.medianSalesAmt &&
        list.salesGenderPer &&
        list.salesAgePer &&
        list.salesDayPer &&
        list.salesHourPer
      ) {
        const gender = list.salesGenderPer
          .split(",")
          .map((str: any) => Number(str));
        const age = list.salesAgePer.split(",").map((str: any) => Number(str));
        const day = list.salesDayPer.split(",").map((str: any) => Number(str));
        const time = list.salesHourPer
          .split(",")
          .map((str: any) => Number(str));
        const ageIdx = age[Math.max(...age)];
        const dayIdx = day[Math.max(...day)];
        const timeIdx = time[Math.max(...time)];

        setTextArr({
          avgSalesAmt: list.avgSalesAmt,
          salesAmtTop20: list.salesAmtTop20,
          salesAmtBottom20: list.salesAmtBottom20,
          medianSalesAmt: list.medianSalesAmt,
          gender: gender[0] > gender[1] ? "남성" : "여성",
          age: ageText[ageIdx],
          day: dayText[dayIdx],
          time: timeText[timeIdx],
        });
        break;
      }
    }

    const chartLineLabel: string[] = [];
    const chartLineData: number[] = [];
    const chartBarLabel: string[] = [];
    const chartBarMData: number[] = [];
    const chartBarWData: number[] = [];

    data.map(
      (yearData: {
        cost: number;
        avgSalesAmt: number;
        salesGenderPer: string;
        yyyymm: string;
      }) => {
        const key = yearData.yyyymm.slice(2, 6).replace(/(.{2})/, "$1.");
        let manRto = 0;
        let womanRto = 0;

        const genderRto = yearData.salesGenderPer.split(",");
        if (yearData?.salesGenderPer && genderRto[0] && genderRto[1]) {
          manRto = Number(genderRto[0]);
          womanRto = Number(genderRto[1]);
        }

        chartLineLabel.push(key);
        chartLineData.push(yearData.avgSalesAmt);
        chartBarLabel.push(key);
        chartBarMData.push(yearData.cost * manRto);
        chartBarWData.push(yearData.cost * womanRto);
      }
    );

    setLabelLine(chartLineLabel);
    setChartLineData(chartLineData);
    setLabelBar(chartBarLabel);
    setChartBarMData(chartBarMData);
    setChartBarWData(chartBarWData);
  }, [data]);

  return (
    <Flex p="0" w="100%" h="100%" direction="column" gap="1rem">
      <Flex
        padding="1rem"
        w="100%"
        h="9.25rem"
        direction="column"
        justifyContent="flex-start"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Heading
          w="100%"
          textStyle="base"
          fontWeight="strong"
          fontSize="md"
          lineHeight="1.25rem"
          color="font.primary"
        >
          매출 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["3,032만원", "4,736만원"]}
                styles={{
                  w: "100%",
                  textStyle: "base",
                  fontSize: "sm",
                  fontWeight: "strong",
                  lineHeight: "1.75rem",
                  color: "primary.type10",
                  textDecoration: "underline",
                }}
              >
                선택 영역의 평균 매출은 3,032만원 입니다. 상위 20% 매출 -
                4,736만원 ,
              </Highlight>
            </Text>
          </ListItem>
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["1,736만원", "2,736만원"]}
                styles={{
                  w: "100%",
                  textStyle: "base",
                  fontSize: "sm",
                  fontWeight: "strong",
                  lineHeight: "1.75rem",
                  color: "primary.type10",
                  textDecoration: "underline",
                }}
              >
                하위 20% 매출 - 1,736만원 , 중간값 - 2,736만원 입니다.
              </Highlight>
            </Text>
          </ListItem>
          <ListItem w="100%" display="flex" gap="4rem">
            <Text
              w="100%"
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.75rem"
            >
              <Highlight
                query={["남성", "화요일", "14~18시"]}
                styles={{
                  w: "100%",
                  textStyle: "base",
                  fontSize: "sm",
                  fontWeight: "strong",
                  lineHeight: "1.75rem",
                  color: "primary.type10",
                  textDecoration: "underline",
                }}
              >
                주요 매출 구성은 남성, 40대, 화요일, 14~18시 입니다.
              </Highlight>
            </Text>
          </ListItem>
        </List>
      </Flex>
      <Flex
        padding="1rem"
        w="100%"
        direction="column"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Swiper
          loop={true}
          ref={sliderRef}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          style={{ width: "100%" }}
        >
          <Flex
            pos="absolute"
            top="50%"
            left="-1%"
            right="0"
            w="102%"
            justify="space-between"
            zIndex={2}
          >
            <IcoBtnPrev
              width="2rem"
              height="2rem"
              svgprop={{ width: "2rem", height: "2rem" }}
              onClick={() => handlePrev(0)}
            />
            <IcoBtnNext
              width="2rem"
              height="2rem"
              svgprop={{ width: "2rem", height: "2rem" }}
              onClick={() => handleNext(0)}
              style={{ top: "1px", transform: "rotate(180deg)" }}
            />
          </Flex>
          <SwiperSlide>
            <Flex>
              <Heading
                w="100%"
                textStyle="base"
                fontWeight="strong"
                fontSize="md"
                lineHeight="1.25rem"
                color="font.primary"
              >
                월별 추이
              </Heading>
              <Flex align="center" gap="0.25rem">
                <Text
                  textStyle="base"
                  fontSize="0.625rem"
                  fontWeight="regular"
                  color="font.secondary"
                  whiteSpace="nowrap"
                  lineHeight="1px"
                >
                  단위 : 만원
                </Text>
              </Flex>
            </Flex>
            <Divider
              m="0.5rem 0"
              borderBottomWidth="2px"
              borderColor="neutral.gray6"
            />
            <ChartLine
              p="0 2rem"
              height="15rem"
              options={{
                plugins: {
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                    beginAtZero: false,
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                  },
                  y: {
                    stacked: true,
                  },
                },
                elements: {
                  line: {
                    tension: 0.1,
                    capBezierPoints: false,
                  },
                },
              }}
              data={{
                labels: [
                  "22.02",
                  "22.03",
                  "22.04",
                  "22.05",
                  "22.06",
                  "22.07",
                  "22.08",
                  "22.09",
                  "22.10",
                  "22.11",
                  "22.12",
                  "23.01",
                ],
                datasets: [
                  {
                    label: "월별",
                    data: [
                      500, 1000, 3000, 200, 500, 300, 500, 1000, 3000, 200, 500,
                      300,
                    ],
                    borderColor: "#AD8B00",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    segment: {
                      borderWidth: 1,
                      borderColor: "#AD8B00",
                    },
                    pointStyle: "circle",
                    pointBorderWidth: 1,
                    pointRadius: 3,
                    pointhoverRadius: 6,
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderColor: "#AD8B00",
                  },
                ],
              }}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100%", height: "100%" }}>
            <Flex justify="space-between" align="center">
              <Heading
                w="100%"
                textStyle="base"
                fontWeight="strong"
                fontSize="md"
                lineHeight="1.25rem"
                color="font.primary"
              >
                성별 연령대 추이
              </Heading>
              <Flex align="center" gap="0.75rem">
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#36CFC9"
                    borderRadius="2px"
                  />
                  <Text
                    textStyle="base"
                    fontSize="0.625rem"
                    fontWeight="regular"
                    color="font.secondary"
                    whiteSpace="nowrap"
                    lineHeight="1px"
                  >
                    남자
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#FF7A45"
                    borderRadius="2px"
                  />
                  <Text
                    textStyle="base"
                    fontSize="0.625rem"
                    fontWeight="regular"
                    color="font.secondary"
                    whiteSpace="nowrap"
                    lineHeight="1px"
                  >
                    여자
                  </Text>
                </Flex>
                <Text
                  textStyle="base"
                  fontSize="0.625rem"
                  fontWeight="regular"
                  color="font.secondary"
                  whiteSpace="nowrap"
                  lineHeight="1px"
                >
                  단위 : 명
                </Text>
              </Flex>
            </Flex>
            <Divider
              m="0.5rem 0"
              borderBottomWidth="2px"
              borderColor="neutral.gray6"
            />
            <ChartStackBar
              p="0 2rem"
              height="15rem"
              options={{
                plugins: {
                  title: {
                    display: false,
                    text: "성별 연령대별 추이",
                  },
                  legend: {
                    display: false,
                    position: "bottom" as const,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                    beginAtZero: false,
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
              data={{
                labels: ["20대", "30대", "40대", "50대", "60대이상"],
                datasets: [
                  {
                    label: "남자",
                    data: [300, 500, 1000, 500, 300],
                    backgroundColor: "#36CFC9",
                    barThickness: 40,
                  },
                  {
                    label: "여자",
                    data: [1000, 500, 1200, 100, 100],
                    backgroundColor: "#FF7A45",
                    barThickness: 40,
                  },
                ],
              }}
            />
          </SwiperSlide>
        </Swiper>
      </Flex>
    </Flex>
  );
};

export default ReportSale;
