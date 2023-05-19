import { useRef, useCallback, useEffect, useState } from "react";
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

type Props = any;

const ReportPop = ({ data }: Props) => {
  const sliderRef = useRef(null);
  const [ageMan, setAgeMan] = useState<any>(null);
  const [ageWoman, setAgeWoman] = useState<any>(null);
  const [day, setDay] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const [max, setMax] = useState<any>(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      const man =
        data?.inflowCustM20 +
        data?.inflowCustM30 +
        data?.inflowCustM40 +
        data?.inflowCustM50 +
        data?.inflowCustM60;

      const woman =
        data?.inflowCustW20 +
        data?.inflowCustW30 +
        data?.inflowCustW40 +
        data?.inflowCustW50 +
        data?.inflowCustW60;

      const age = {
        "20대": data?.inflowCustW20 + data?.inflowCustM20,
        "30대": data?.inflowCustW30 + data?.inflowCustM30,
        "40대": data?.inflowCustW40 + data?.inflowCustM40,
        "50대": data?.inflowCustW50 + data?.inflowCustM50,
        "60대": data?.inflowCustW60 + data?.inflowCustM60,
      };
      const ageManGroup = {
        "20대": data?.inflowCustM20,
        "30대": data?.inflowCustM30,
        "40대": data?.inflowCustM40,
        "50대": data?.inflowCustM50,
        "60대": data?.inflowCustM60,
      };
      const ageWomanGroup = {
        "20대": data?.inflowCustW20,
        "30대": data?.inflowCustW30,
        "40대": data?.inflowCustW40,
        "50대": data?.inflowCustW50,
        "60대": data?.inflowCustW60,
      };
      const dayGroup = {
        월요일: data?.inflowMon || 0,
        화요일: data?.inflowTue || 0,
        수요일: data?.inflowWed || 0,
        목요일: data?.inflowThu || 0,
        금요일: data?.inflowFri || 0,
        토요일: data?.inflowSat || 0,
        일요일: data?.inflowSun || 0,
      };
      const timeGroup = {
        "07-10": data?.inflow0710 || 0,
        "10-12": data?.inflow1012 || 0,
        "12-14": data?.inflow1214 || 0,
        "14-18": data?.inflow1418 || 0,
        "18-21": data?.inflow1821 || 0,
      };

      const ageVal = Object.values(age);
      const maxAge = Math.max.apply(null, ageVal);
      const ageIdx = ageVal.indexOf(maxAge);

      const dayVal = Object.values(dayGroup);
      const maxDay = Math.max.apply(null, dayVal);
      const dayIdx = dayVal.indexOf(maxDay);

      const timeVal = Object.values(timeGroup);
      const maxTime = Math.max.apply(null, timeVal);
      const timeIdx = timeVal.indexOf(maxTime);

      setAgeMan(ageManGroup);
      setAgeWoman(ageWomanGroup);
      setDay(dayGroup);
      setTime(timeGroup);
      setMax({
        sex: man > woman ? "남성" : "여성",
        age: Object.keys(age)[ageIdx],
        day: Object.keys(dayGroup)[dayIdx],
        time: Object.keys(timeGroup)[timeIdx],
      });
    }
  }, [data]);

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
  console.log(max);
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
          유동 인구 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {data?.inflowCustCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${data?.inflowCustCnt.toLocaleString("ko-KR")}명`]}
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
                  {`선택 영역의 일 평균 유동인구수는 ${data.inflowCustCnt.toLocaleString(
                    "ko-KR"
                  )}명
                  입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {max && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${max.sex}, ${max.age}`]}
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
                  {max.day || max.time
                    ? `성별/연령별 유동인구수는 ${max.sex}, ${max.age} 이며`
                    : `성별/연령별 유동인구수는 ${max.sex}, ${max.age} 입니다`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {max && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${max.day}, ${max.time}`]}
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
                  {`요일/시간대별 유동인구수는 ${max.day}, ${max.time}시 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
        </List>
      </Flex>
      <Flex
        pos="relative"
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
            {ageMan && ageWoman && (
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
                  labels: [...Object.keys(ageMan)],
                  datasets: [
                    {
                      label: "남자",
                      data: [...Object.values(ageMan)],
                      backgroundColor: "#36CFC9",
                      barThickness: 36,
                    },
                    {
                      label: "여자",
                      data: [...Object.values(ageWoman)],
                      backgroundColor: "#FF7A45",
                      barThickness: 36,
                    },
                  ],
                }}
              />
            )}
          </SwiperSlide>
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
                요일대별 추이
              </Heading>
            </Flex>
            <Divider
              m="0.5rem 0"
              borderBottomWidth="2px"
              borderColor="neutral.gray6"
            />
            {day && (
              <ChartStackBar
                p="0 2rem"
                height="15rem"
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "요일 시간대별 추이",
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
                  labels: [
                    "월요일",
                    "화요일",
                    "수요일",
                    "목요일",
                    "금요일",
                    "토요일",
                    "일요일",
                  ],
                  datasets: [
                    {
                      label: "07~10시",
                      data: [...Object.values(day)],
                      backgroundColor: "#FADB14",
                      barThickness: 28,
                    },
                  ],
                }}
              />
            )}
          </SwiperSlide>
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
                시간대별 추이
              </Heading>
              {/* <Flex align="center" gap="0.25rem">
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#FF8E61"
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
                    07~10시
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#474747"
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
                    10~12시
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#54D7D2"
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
                    12~14시
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#595959"
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
                    14~18시
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Box
                    w="0.5rem"
                    h="0.5rem"
                    background="#FADB14"
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
                    18~21시
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
              </Flex> */}
            </Flex>
            <Divider
              m="0.5rem 0"
              borderBottomWidth="2px"
              borderColor="neutral.gray6"
            />
            {time && (
              <ChartStackBar
                p="0 2rem"
                height="15rem"
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "요일 시간대별 추이",
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
                  labels: [...Object.keys(time)],
                  datasets: [
                    {
                      label: "시간대",
                      data: [...Object.values(time)],
                      backgroundColor: "#262626",
                      barThickness: 36,
                    },
                  ],
                }}
              />
            )}
          </SwiperSlide>
        </Swiper>
      </Flex>
    </Flex>
  );
};

export default ReportPop;
