//  LIB
import { useState, useMemo, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
  List,
  ListItem,
  useTheme,
} from "@chakra-ui/react";
import { useCubeQuery } from "@cubejs-client/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
  registerables,
  scales,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
//  Components
import Section from "@components/common/Section";
import { DashboardLi } from "@components/common/List";
//  API & Query
import { querySaleDashboard } from "@api/cubeApi/query";
//  Util
import { cubeChartHandler } from "@services/cube/transformer";
import { transMarginData } from "@util/data/testData";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const ErpDashBoard = () => {
  const [notice, setNotic] = useState<any[]>([]);
  const [doc, setDoc] = useState<any[]>([]);
  const navigate = useNavigate();
  const { resultSet, error, isLoading } = useCubeQuery(
    querySaleDashboard.initQ
  );

  const swiper = useSwiper();

  useEffect(() => {
    setNotic([
      { title: "공지사항입니다.", createdAt: "2023/03/01" },
      { title: "공지사항입니다.", createdAt: "2023/03/01" },
      { title: "공지사항입니다.", createdAt: "2023/03/01" },
      { title: "공지사항입니다.", createdAt: "2023/03/01" },
      { title: "공지사항입니다.", createdAt: "2023/03/01" },
    ]);

    setDoc([
      { title: "전자문서입니다.", createdAt: "2023/03/01" },
      { title: "전자문서입니다.", createdAt: "2023/03/01" },
      { title: "전자문서입니다.", createdAt: "2023/03/01" },
      { title: "전자문서입니다.", createdAt: "2023/03/01" },
      { title: "전자문서입니다.", createdAt: "2023/03/01" },
    ]);
  }, []);

  return (
    <Flex w="100%" h="100%" direction="column" gap="0.5rem">
      <Flex w="100%" h="auto" gap="0.75rem">
        <Section p="0.75rem" w="100%">
          <Flex mb="1rem" w="100%" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>공지</Heading>
            <Text variant="sectionSub">Notice</Text>
          </Flex>
          <DashboardLi
            cate="notice"
            textKey="title"
            subKey="createdAt"
            data={notice}
            onClick={(props: any) => {
              console.log(props);
              navigate("/erp/notice");
            }}
          />
        </Section>
        <Section p="0.75rem" w="100%">
          <Flex mb="1rem" w="100%" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>전자문서</Heading>
            <Text variant="sectionSub">Doc</Text>
          </Flex>
          <DashboardLi
            cate="docs"
            textKey="title"
            subKey="createdAt"
            data={doc}
            onClick={(props: any) => {
              console.log(props);
            }}
          />
        </Section>
      </Flex>
      <Flex gap="0.75rem" w="100%" h="30%" flexBasis="30%" flexGrow={1}>
        <Section p="0.75rem" w="55%" h="100%">
          <Flex mb="1rem" w="100%" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>매장</Heading>
            <Text variant="sectionSub">Store</Text>
          </Flex>
          <Flex w="100%" h="inherit">
            <Flex direction="column" pt="1rem" pb="1rem" w="60%" h="100%">
              <ChartBar
                title="매장수"
                data={[35, 25, 15, 10, 4]}
                labels={["A", "B", "C", "D", "E"]}
                labelText="매장수"
              />
            </Flex>
            <Divider
              m="0 1.25rem"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex w="40%" h="100%" flex="none">
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <button onClick={() => swiper.slideNext()}>
                  Slide to the next slide
                </button>
                <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                  <ChartPie
                    title="매장타입"
                    data={[35, 25, 15, 10, 4]}
                    labels={["A", "B", "C", "D", "E"]}
                    labelText="매장타입"
                  />
                </SwiperSlide>
                <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                  <ChartPie
                    title="매장상태"
                    data={[35, 25, 15, 10, 4]}
                    labels={["입점", "휴점", "대기", "폐점", "기타"]}
                    labelText="매장상태"
                  />
                </SwiperSlide>
              </Swiper>
            </Flex>
          </Flex>
        </Section>
        <Section p="0.75rem" w="45%" h="100%">
          <Flex mb="1rem" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>상권</Heading>
            <Text variant="sectionSub">Area</Text>
          </Flex>
          <Flex padding="5%" w="100%" h="inherit">
            <Flex direction="column" pt="1rem" pb="1rem" w="50%" h="100%">
              <ChartPie
                title="상권타입"
                data={[35, 25, 15, 10, 4]}
                labels={["A", "B", "C", "D", "E"]}
                labelText="상권타입"
              />
            </Flex>
            <Divider
              m="0 1.25rem"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex direction="column" pt="1rem" pb="1rem" w="50%" h="100%">
              <ChartPie
                title="상권타입"
                data={[35, 25, 15, 10, 4]}
                labels={["A", "B", "C", "D", "E"]}
                labelText="상권타입"
              />
            </Flex>
          </Flex>
        </Section>
      </Flex>
      <Flex gap="0.75rem" w="100%" h="30%" flexBasis="30%" flexGrow={1}>
        <Section p="0.75rem" w="55%" h="100%">
          <Flex mb="1rem" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>매출</Heading>
            <Text variant="sectionSub">Sale</Text>
          </Flex>
          <Flex w="100%" h="100%" direction={"row"}>
            <Flex p="1rem" w="50%">
              <ChartBarHorizon />
            </Flex>
            <Divider
              m="0 1rem"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex w="50%">
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                  <ChartPie
                    title="인기메뉴별"
                    data={[35, 25, 15, 10, 4]}
                    labels={["A", "B", "C", "D", "E"]}
                    labelText="인기메뉴"
                  />
                </SwiperSlide>
                <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                  <ChartPie
                    title="주문방식별"
                    data={[55, 15, 3]}
                    labels={["배달", "포장", "테이블"]}
                    labelText="주문방식"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <LineChart />
                </SwiperSlide>
                <SwiperSlide>
                  <LineChart />
                </SwiperSlide>
              </Swiper>
            </Flex>
          </Flex>
        </Section>
        <Section p="0.75rem" w="calc(22.5% - 0.375rem)" h="100%">
          <Flex mb="1rem" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>매물</Heading>
            <Text variant="sectionSub">Rent</Text>
          </Flex>
          <Flex w="100%">
            <Accordion
              variant="dashboardRent"
              allowMultiple={false}
              defaultIndex={[0]}
              w="100%"
            >
              <AccordionItem>
                <AccordionButton>매물1</AccordionButton>
                <AccordionPanel>
                  <Flex gap="0.75rem" alignItems="center">
                    <Image
                      w="2.3125rem"
                      h="2.3125rem"
                      src="/src/assets/rentSample.png"
                    />
                    <List
                      display="flex"
                      flexDirection="column"
                      w="100%"
                      gap="0.375rem"
                    >
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          준공기간
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          89.11.03~94.10.25
                        </Text>
                      </ListItem>
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          대장종류
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          건축물대장
                        </Text>
                      </ListItem>
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          지붕
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          시멘트
                        </Text>
                      </ListItem>
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          용도
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          근린생활시설
                        </Text>
                      </ListItem>
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          구조
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          철근콘크리트
                        </Text>
                      </ListItem>
                      <ListItem
                        w="100%"
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="strong"
                          color="font.title"
                        >
                          연면적
                        </Text>
                        <Text
                          fontFamily="main"
                          fontSize="0.5rem"
                          fontWeight="regular"
                          color="font.primary"
                        >
                          429.77 m
                        </Text>
                      </ListItem>
                    </List>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>매물2</AccordionButton>
                <AccordionPanel>
                  <Image
                    w="2.3125rem"
                    h="2.3125rem"
                    src="/src/assets/rentSample.png"
                  />
                  <List
                    display="flex"
                    flexDirection="column"
                    w="100%"
                    gap="0.375rem"
                  >
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        준공기간
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        89.11.03~94.10.25
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        대장종류
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        건축물대장
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        지붕
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        시멘트
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        용도
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        근린생활시설
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        구조
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        철근콘크리트
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        연면적
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        429.77 m
                      </Text>
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>매물3</AccordionButton>
                <AccordionPanel>
                  <Image
                    w="2.3125rem"
                    h="2.3125rem"
                    src="/src/assets/rentSample.png"
                  />
                  <List
                    display="flex"
                    flexDirection="column"
                    w="100%"
                    gap="0.375rem"
                  >
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        준공기간
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        89.11.03~94.10.25
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        대장종류
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        건축물대장
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        지붕
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        시멘트
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        용도
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        근린생활시설
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        구조
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        철근콘크리트
                      </Text>
                    </ListItem>
                    <ListItem
                      w="100%"
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="strong"
                        color="font.title"
                      >
                        연면적
                      </Text>
                      <Text
                        fontFamily="main"
                        fontSize="0.5rem"
                        fontWeight="regular"
                        color="font.primary"
                      >
                        429.77 m
                      </Text>
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Section>
        <Section p="0.75rem" w="calc(22.5% - 0.375rem)" h="100%">
          <Flex mb="1rem" align="flex-end" gap="4px">
            <Heading variant={"sectionTitle"}>고객</Heading>
            <Text variant="sectionSub">Client</Text>
          </Flex>
          <Flex w="100%" h="100%">
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                <ChartPie
                  title="고객현황"
                  data={[35, 25, 15, 10]}
                  labels={["상담대기", "상담중", "상담완료", "종료"]}
                  labelText="고객현황"
                />
              </SwiperSlide>
              <SwiperSlide style={{ padding: "5%", width: "100%" }}>
                <ChartPie
                  title="인기희망지역"
                  data={[35, 25, 35, 20, 54]}
                  labels={["서울", "인천", "경기도", "부산", "기타"]}
                  labelText="유입경로"
                />
              </SwiperSlide>
            </Swiper>
          </Flex>
        </Section>
      </Flex>
    </Flex>
  );
};

const ChartPie = ({
  title,
  data,
  labels,
  labelText,
}: {
  title: string;
  data: any[];
  labels: any[];
  labelText: string;
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        fullSize: true,
        position: "bottom" as const,
        labels: {
          padding: 10,
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        position: "bottom" as const,
        display: true,
        text: title,
        color: "#26232380",
        font: {
          family: "Roboto",
          size: 12,
          fontWeight: 700,
        },
      },
      layout: {
        padding: {
          bottom: 0,
        },
      },
    },
    layout: {
      padding: {
        bottom: 5,
      },
    },
  };

  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: labelText,
        data: data,
        backgroundColor: [
          "#CAF0FF",
          "#D9EE86",
          "#EFA180",
          "#6C6C70",
          "#AEAEB2",
        ],
        borderWidth: 0,
      },
    ],
  };
  return <Pie data={dataSet} options={options} redraw={true} />;
};

const ChartBar = ({
  title,
  data,
  labelText,
}: {
  title?: string;
  data: any[];
  labels: any[];
  labelText: string;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ...registerables
  );

  const sample: { [key: string]: any } = {
    "9월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
    "10월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
    "11월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
    "12월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
    "1월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
    "2월": {
      A: 100,
      B: 50,
      C: 30,
      D: 20,
      E: 50,
    },
  };

  const labels = ["9월", "10월", "11월", "12월", "1월", "2월"];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        position: "bottom" as const,
        display: title ? true : false,
        text: title,
        color: "#26232380",
        font: {
          family: "Roboto",
          size: 12,
          fontWeight: 700,
        },
      },
      layout: {
        padding: {
          bottom: 0,
        },
      },
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
    scales: {
      x: {
        z: 1,
        border: {
          width: 1,
          color: "#000000",
        },
        ticks: {
          display: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: "A",
        data: labels.map((date) => sample[date].A),
        backgroundColor: "#CAF0FF",
        borderRadius: 2,
      },
      {
        label: "B",
        data: labels.map((date) => sample[date].B),
        backgroundColor: "#D9EE86",
        borderRadius: 2,
      },
      {
        label: "C",
        data: labels.map((date) => sample[date].C),
        backgroundColor: "#EFA180",
        borderRadius: 2,
      },
      {
        label: "D",
        data: labels.map((date) => sample[date].D),
        backgroundColor: "#6C6C70",
        borderRadius: 2,
      },
      {
        label: "E",
        data: labels.map((date) => sample[date].E),
        backgroundColor: "#AEAEB2",
        borderRadius: 2,
      },
    ],
    scales: {
      display: false,
      y: {
        beginAtZero: false,
      },
    },
  };
  return (
    <Bar
      data={dataSet}
      options={options}
      style={{ width: "100%", height: "100%" }}
      redraw={true}
    />
  );
};

const ChartBarHorizon = ({
  title,
  data,
  labelText,
}: {
  title?: string;
  data?: any[];
  labels?: any[];
  labelText?: string;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ...registerables
  );

  const sample: { [key: string]: any } = {
    "1월": {
      A: 1000000,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "2월": {
      A: 100000,
      B: 5000,
      C: 300000,
      D: 2000,
      E: 5000,
    },
    "3월": {
      A: 100000,
      B: 5000,
      C: 300000,
      D: 2000,
      E: 5000,
    },
    "4월": {
      A: 300000,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "5월": {
      A: 1000000,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "6월": {
      A: 5000900,
      B: 5000900,
      C: 3000900,
      D: 200800,
      E: 500000,
    },
    "7월": {
      A: 100000,
      B: 5000,
      C: 300000,
      D: 2000,
      E: 5000,
    },
    "8월": {
      A: 5000900,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "9월": {
      A: 1000000,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "10월": {
      A: 1000000,
      B: 500000,
      C: 300000,
      D: 200000,
      E: 5000000,
    },
    "11월": {
      A: 100000,
      B: 5000,
      C: 300000,
      D: 2000,
      E: 5000,
    },
    "12월": {
      A: 100000,
      B: 5000,
      C: 300000,
      D: 2000,
      E: 5000,
    },
  };

  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: 50,
      },
    },
    scales: {
      x: {
        position: "top" as const,
        border: {
          display: false,
          borderColor: "#F1F1F2",
        },
        ticks: {
          // display: false,
          borderColor: "#F1F1F2",
        },
        grid: {
          drawBorder: false,
          border: {
            borderColor: "#F1F1F2",
          },
          // display: false,
        },
      },
      y: {
        border: {
          borderColor: "#F1F1F2",
        },
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawBorder: true,
          display: true,
        },
      },
    },
  };

  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: "A",
        data: labels.map((date) => sample[date].A),
        backgroundColor: "#CAF0FF",
        borderRadius: {
          topLeft: 100,
          bottomLeft: 100,
          topRight: 0,
          bottomRight: 0,
          borderSkipped: false,
        },
      },
      {
        label: "B",
        data: labels.map((date) => sample[date].B),
        backgroundColor: "#D9EE86",
        borderRadius: {
          topLeft: 20,
          bottomLeft: 20,
          topRight: 0,
          bottomRight: 0,
        },
      },
      {
        label: "C",
        data: labels.map((date) => sample[date].C),
        backgroundColor: "#EFA180",
        borderRadius: {
          topLeft: 20,
          bottomLeft: 20,
          topRight: 0,
          bottomRight: 0,
        },
      },
      {
        label: "D",
        data: labels.map((date) => sample[date].D),
        backgroundColor: "#6C6C70",
        borderRadius: {
          topLeft: 20,
          bottomLeft: 20,
          topRight: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  return (
    <Bar
      data={dataSet}
      options={options}
      style={{ width: "100%", height: "100%" }}
      redraw={true}
    />
  );
};

const LineChart = () => {
  const theme = useTheme();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    ...registerables
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "요일별",
        position: "bottom" as const,
        color: "#26232380",
        font: {
          family: "Roboto",
          size: 12,
          fontWeight: 700,
        },
      },
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         min: 0,
    //         stepSize: 1000000,
    //         fontSize: 14,
    //       },
    //     },
    //   ],
    // },
  };
  const labels = ["Mon", "Tue", "Thu", "Wed", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "요일별",
        data: [5000000, 2000000, 560000, 5000000, 3000000, 5000000, 10000000],
        fill: true,
        borderWidth: 1,
        borderColor: "rgba(41, 45, 48, 0.8)",
        backgroundColor: `${theme.colors.primary.type7}40`,
      },
    ],
  };

  return (
    <Flex w="100%" h="100%" justify="center">
      <Flex p="0 0 1.2rem" w="100%" h="100%">
        <Line
          options={options}
          data={data}
          style={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  );
};

export default ErpDashBoard;
