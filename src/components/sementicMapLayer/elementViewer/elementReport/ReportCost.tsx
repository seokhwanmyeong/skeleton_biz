import { useRef, useCallback, useState, useEffect } from "react";
import {
  Divider,
  Flex,
  Heading,
  Highlight,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IcoBtnNext, IcoBtnPrev } from "@src/components/common/Btn";
import ChartLine from "@src/components/charts/ChartLine";

type Props = {};

const ReportCost = ({ data }: any) => {
  const sliderRef = useRef(null);
  const [labelCnt, setLabelCnt] = useState<any[]>([]);
  const [chartCntData, setChartCntData] = useState<any[]>([]);
  const [labelAmt, setLabelAmt] = useState<any[]>([]);
  const [chartAmtData, setChartAmtData] = useState<any[]>([]);
  const [textArr, setTextArr] = useState<{
    useCnt: number | null;
    cost: number | null;
  }>({
    useCnt: null,
    cost: null,
  });

  console.log(data);
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

  useEffect(() => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const list = data[data.length - 1 - i];
      if (list.useCnt && list.cost) {
        setTextArr({
          useCnt: list.useCnt,
          cost: list.cost,
        });
        break;
      }
    }
    const chartCntLabel: string[] = [];
    const chartCntData: string[] = [];
    const chartAmtLabel: string[] = [];
    const chartAmtData: string[] = [];

    data.map((yearData: any) => {
      const key = yearData.yyyymm.slice(2, 6).replace(/(.{2})/, "$1.");

      chartCntLabel.push(key);
      chartCntData.push(yearData.useCnt);
      chartAmtLabel.push(key);
      chartAmtData.push(yearData.cost);
    });

    setLabelCnt(chartCntLabel);
    setChartCntData(chartCntData);
    setLabelAmt(chartAmtLabel);
    setChartAmtData(chartAmtData);
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
          소비 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {textArr?.cost && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${(textArr?.cost || 0).toLocaleString("ko-KR")}원`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    borderBottom: "1px solid",
                    borderColor: "primary.type9",
                  }}
                >
                  {`선택 영역의 결제 금액은 ${(
                    textArr?.cost || 0
                  ).toLocaleString("ko-KR")}원 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {textArr?.useCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[
                    `${(textArr?.useCnt || 0).toLocaleString("ko-KR")}건`,
                  ]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    borderBottom: "1px solid",
                    borderColor: "primary.type9",
                  }}
                >
                  {`결제 건수는 ${(textArr?.useCnt || 0).toLocaleString(
                    "ko-KR"
                  )}건 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
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
                월별 추이 결제 금액
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
                  단위 : 원
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
                labels: labelAmt,
                datasets: [
                  {
                    label: "월별",
                    data: chartAmtData,
                    borderColor: "#08979C",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    segment: {
                      borderWidth: 1,
                      borderColor: "#08979C",
                    },
                    pointStyle: "circle",
                    pointBorderWidth: 1,
                    pointRadius: 3,
                    pointhoverRadius: 6,
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderColor: "#08979C",
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
                월별 추이 결제 건수
              </Heading>
              <Flex align="center" gap="0.75rem">
                <Text
                  textStyle="base"
                  fontSize="0.625rem"
                  fontWeight="regular"
                  color="font.secondary"
                  whiteSpace="nowrap"
                  lineHeight="1px"
                >
                  단위 : 건
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
                labels: labelCnt,
                datasets: [
                  {
                    label: "월별",
                    data: chartCntData,
                    borderColor: "#D4380D",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    segment: {
                      borderWidth: 1,
                      borderColor: "#D4380D",
                    },
                    pointStyle: "circle",
                    pointBorderWidth: 1,
                    pointRadius: 3,
                    pointhoverRadius: 6,
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderColor: "#D4380D",
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

export default ReportCost;
