import { useRef, useCallback } from "react";
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
import ChartStackBar from "@src/components/charts/ChartStackBar";
import { IcoBtnNext, IcoBtnPrev } from "@src/components/common/Btn";
import ChartLine from "@src/components/charts/ChartLine";

type Props = {};

const ReportCost = (props: Props) => {
  const sliderRef = useRef(null);

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

  return (
    <Flex p="0" w="34.25rem" h="100%" direction="column" gap="1rem">
      <Flex
        padding="1rem"
        w="100%"
        h="9.25rem"
        direction="column"
        justifyContent="flex-start"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
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
          top="40%"
          left="0"
          right="0"
          p="0.5rem"
          w="100%"
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
          <Flex
            padding="1rem"
            w="100%"
            direction="column"
            justifyContent="center"
            bgColor="rgba(255, 255, 255, 0.69)"
            boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
            border="1px solid"
            borderRadius="base"
          >
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
          </Flex>
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "100%" }}>
          <Flex
            pos="relative"
            padding="1rem"
            w="100%"
            direction="column"
            justifyContent="center"
            bgColor="rgba(255, 255, 255, 0.69)"
            boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
            border="1px solid"
            borderRadius="base"
          >
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
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};

export default ReportCost;
