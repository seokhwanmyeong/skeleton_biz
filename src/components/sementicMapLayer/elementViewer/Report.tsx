//  LIB
import { useState } from "react";
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
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
//  Component
import { Select } from "@components/common/Select";
import ChartStackBar from "@src/components/charts/ChartStackBar";
import ViewList from "@src/components/sementicMapLayer/elementViewer/ViewList";
import ChartLine from "@src/components/sementicMapLayer/elementViewer/ChartLine";
import ChartLineGroup from "@src/components/sementicMapLayer/elementViewer/ChartLineGroup";

const Report = () => {
  const [double, setDouble] = useState<boolean>(false);

  return (
    <Flex
      p="3rem 3rem"
      w="1000px"
      borderLeft="1px solid #ededed"
      bgColor="primary.main.bg"
      overflow="hidden"
      transition="0.3s"
      flexDirection="column"
      zIndex={100}
    >
      <Heading mb="2rem" variant="outlet">
        Report
      </Heading>
      <List display="flex" justifyContent="space-between" mb="2rem">
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title" fontSize="md">
            영역
          </Text>
          <Text textStyle="list.text" fontSize="md">
            다각형
          </Text>
        </ListItem>
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title" fontSize="md">
            업종
          </Text>
          <Text textStyle="list.text" fontSize="md">
            대분류{">"}중분류{">"}소분류
          </Text>
        </ListItem>
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title" fontSize="md" w="-webkit-fill-available">
            비교기준
          </Text>
          <Select
            data={[
              { text: "없음", val: "null" },
              { text: "탑5", val: "true" },
              { text: "하위5", val: "true" },
            ]}
            opBaseTxt={"text"}
            opBaseId={"val"}
            opBaseKey={"val"}
            onChange={(val: any) => {
              val === "null" ? setDouble(false) : setDouble(true);
            }}
          />
        </ListItem>
      </List>
      <Tabs variant="unstyled" w="100%">
        <TabList
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
          gridTemplateRows="1fr 1fr"
          gap="0.5rem"
        >
          <Tab
            w="auto"
            gridRow="1 / 3"
            gridColumn="1"
            borderRadius="5px"
            _selected={{ color: "white", bg: "blue.500" }}
          >
            전체요약
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            유동인구
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            주거인구
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            직장인구
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            세대수
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            업종
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            매출
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            소비
          </Tab>
          <Tab
            w="auto"
            borderRadius="5px"
            _selected={{ color: "white", bg: "green.400" }}
          >
            지역정보
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex gap="2rem">
              <ViewList />
              {double && <ViewList />}
            </Flex>
          </TabPanel>
          <TabPanel width="100%">
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 일 평균 유동인구수는 2,032명 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["454점"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      성별/연령별 유동인구수는 남성, 40대 이며
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem
                  w="100%"
                  textAlign="center"
                  m={"1rem 0"}
                  display="flex"
                  gap="1rem"
                >
                  <Text w="100%" textStyle="list.text" fontSize="md">
                    요일/시간대별 유동인구수는 화요일, 14시~18시 입니다.
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide style={{ width: "100%" }}>
                <ChartLine />
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "성별 연령대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
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
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "여자",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(75, 192, 192)",
                      },
                    ],
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "요일 시간대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  data={{
                    labels: [
                      "07~10시",
                      "10~12시",
                      "12~14시",
                      "14~18시",
                      "18~21시",
                    ],
                    datasets: [
                      {
                        label: "월요일",
                        data: [300, 500, 1000, 500, 300],
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "화요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(85, 192, 192)",
                      },
                      {
                        label: "수요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(25, 192, 152)",
                      },
                      {
                        label: "목요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(95, 192, 162)",
                      },
                      {
                        label: "금요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(115, 192, 172)",
                      },
                      {
                        label: "토요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(135, 192, 182)",
                      },
                      {
                        label: "일요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(155, 132, 192)",
                      },
                    ],
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 주거 인구수는 2,032명 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["454점"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      성별/연령별 주거 인구수는 남성, 40대 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide style={{ width: "100%" }}>
                <ChartLine />
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "성별 연령대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
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
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "여자",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(75, 192, 192)",
                      },
                    ],
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 직장 인구수는 2,032명 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["454점"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      성별/연령별 직장 인구수는 남성, 40대 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide style={{ width: "100%" }}>
                <ChartLine />
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "성별 연령대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
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
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "여자",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(75, 192, 192)",
                      },
                    ],
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 세대수는 2,032세대 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["아파트- 9,736", "비아파트- 7,832"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      세대수 유형은 아파트- 9,736 세대 / 비아파트- 7,832 세대
                      입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: false,
                        text: "성별 연령대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  data={{
                    labels: ["part1", "part2", "part3", "part4", "part5"],
                    datasets: [
                      {
                        label: "아파트",
                        data: [300, 500, 1000, 500, 300],
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "비아파트",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(75, 192, 192)",
                      },
                    ],
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 동종 업종수는 2,032세대 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["3.5", "분식/떡볶이"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      평균 운영 연수는 3.5년 이며 매출 성장 업종은 분식/떡볶이
                      입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <ChartLine />
                {double && <ChartLine />}
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["3,032"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 평균 매출은 3,032 만원 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["4,736", "1,736", "2,987"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      상위 20% 매출 - 4,736 만원 , 하위 20% 매출 - 1,736 만원
                      중간값 - 2,987 만원 입니다
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem
                  w="100%"
                  textAlign="center"
                  m={"1rem 0"}
                  display="flex"
                  gap="1rem"
                >
                  <Text w="100%" textStyle="list.text" fontSize="md">
                    <Highlight
                      query={["남성", "40대", "화요일", "14시~18시"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      주요 매출 구성은 남성, 40대, 화요일, 14시~18시 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide style={{ width: "100%" }}>
                <ChartLine />
                {double && <ChartLine />}
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "성별 연령대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
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
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "여자",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(75, 192, 192)",
                      },
                    ],
                  }}
                />
                {double && (
                  <ChartStackBar
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "성별 연령대별 추이",
                        },
                        legend: {
                          position: "bottom" as const,
                        },
                      },
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true,
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
                          backgroundColor: "rgb(255, 99, 132)",
                        },
                        {
                          label: "여자",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(75, 192, 192)",
                        },
                      ],
                    }}
                  />
                )}
              </SwiperSlide>
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "요일 시간대별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  data={{
                    labels: [
                      "07~10시",
                      "10~12시",
                      "12~14시",
                      "14~18시",
                      "18~21시",
                    ],
                    datasets: [
                      {
                        label: "월요일",
                        data: [300, 500, 1000, 500, 300],
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                      {
                        label: "화요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(85, 192, 192)",
                      },
                      {
                        label: "수요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(25, 192, 152)",
                      },
                      {
                        label: "목요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(95, 192, 162)",
                      },
                      {
                        label: "금요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(115, 192, 172)",
                      },
                      {
                        label: "토요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(135, 192, 182)",
                      },
                      {
                        label: "일요일",
                        data: [1000, 500, 1200, 100, 100],
                        backgroundColor: "rgb(155, 132, 192)",
                      },
                    ],
                  }}
                />
                {double && (
                  <ChartStackBar
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "요일 시간대별 추이",
                        },
                        legend: {
                          position: "bottom" as const,
                        },
                      },
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                        },
                      },
                    }}
                    data={{
                      labels: [
                        "07~10시",
                        "10~12시",
                        "12~14시",
                        "14~18시",
                        "18~21시",
                      ],
                      datasets: [
                        {
                          label: "월요일",
                          data: [300, 500, 1000, 500, 300],
                          backgroundColor: "rgb(255, 99, 132)",
                        },
                        {
                          label: "화요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(85, 192, 192)",
                        },
                        {
                          label: "수요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(25, 192, 152)",
                        },
                        {
                          label: "목요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(95, 192, 162)",
                        },
                        {
                          label: "금요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(115, 192, 172)",
                        },
                        {
                          label: "토요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(135, 192, 182)",
                        },
                        {
                          label: "일요일",
                          data: [1000, 500, 1200, 100, 100],
                          backgroundColor: "rgb(155, 132, 192)",
                        },
                      ],
                    }}
                  />
                )}
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["13,000"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역의 평균 결제 금액은 13,000 원 이며
                    </Highlight>
                  </Text>
                </ListItem>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["313"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      평균 결제 건수는 313 건 입니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <ChartLineGroup />
                {double && <ChartLineGroup />}
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel>
            <Flex
              justifyContent="center"
              border="1px solid"
              padding="1rem"
              borderRadius="5px"
              mb="3rem"
            >
              <List>
                <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
                  <Text
                    w="100%"
                    textAlign="center"
                    textStyle="list.text"
                    fontSize="md"
                  >
                    <Highlight
                      query={["(2)", "(23)", "(1)", "(12)"]}
                      styles={{
                        fontWeight: "900",
                        color: "#6363f1",
                      }}
                    >
                      선택 영역내 학교 (2), 직장수 (23), 지하철 (1), 버스정류장
                      (12) 가 있습니다.
                    </Highlight>
                  </Text>
                </ListItem>
              </List>
            </Flex>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <ChartStackBar
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "유형별 추이",
                      },
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  data={{
                    labels: ["학교", "직장수", "지하철", "버스정류장"],
                    datasets: [
                      {
                        label: "추이량",
                        data: [300, 500, 1000, 500],
                        backgroundColor: "rgb(255, 99, 132)",
                      },
                    ],
                  }}
                />
                {double && (
                  <ChartStackBar
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "유형별 추이",
                        },
                        legend: {
                          position: "bottom" as const,
                        },
                      },
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                        },
                      },
                    }}
                    data={{
                      labels: ["학교", "직장수", "지하철", "버스정류장"],
                      datasets: [
                        {
                          label: "추이량",
                          data: [300, 500, 1000, 500],
                          backgroundColor: "rgb(255, 99, 132)",
                        },
                      ],
                    }}
                  />
                )}
              </SwiperSlide>
            </Swiper>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const SummaryBox = ({
  text,
  keyPoint,
}: {
  text: string[];
  keyPoint: string[];
}) => {
  return (
    <List>
      {text.map(() => {
        return (
          <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
            <Text
              w="100%"
              textAlign="center"
              textStyle="list.text"
              fontSize="md"
            >
              <Highlight
                query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
                styles={{
                  fontWeight: "900",
                  color: "#6363f1",
                }}
              >
                선택 영역의 일 평균 유동인구수는 2,032명 입니다.
              </Highlight>
            </Text>
          </ListItem>
        );
      })}
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="4rem">
        <Text w="100%" textAlign="center" textStyle="list.text" fontSize="md">
          <Highlight
            query={["2,032", "남성", "40대", "화요일", "14시~18시"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            선택 영역의 일 평균 유동인구수는 2,032명 입니다.
          </Highlight>
        </Text>
      </ListItem>
      <ListItem w="100%" m={"1rem 0"} display="flex" gap="1rem">
        <Text w="100%" textAlign="center" textStyle="list.text" fontSize="md">
          <Highlight
            query={["454점"]}
            styles={{
              fontWeight: "900",
              color: "#6363f1",
            }}
          >
            성별/연령별 유동인구수는 남성, 40대 이며
          </Highlight>
        </Text>
      </ListItem>
      <ListItem
        w="100%"
        textAlign="center"
        m={"1rem 0"}
        display="flex"
        gap="1rem"
      >
        <Text w="100%" textStyle="list.text" fontSize="md">
          요일/시간대별 유동인구수는 화요일, 14시~18시 입니다.
        </Text>
      </ListItem>
    </List>
  );
};

export default Report;
