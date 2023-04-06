//  LIB
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCubeQuery } from "@cubejs-client/react";
import {
  Flex,
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
} from "@chakra-ui/react";
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
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
// Import Swiper styles
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
//  Components
import Section from "@components/common/Section";
import { DashboardLi } from "@components/common/List";
import { Select } from "@components/common/Select";
import { IcoBtnNext, IcoBtnPrev } from "@components/common/Btn";
//  API & Query
import { querySaleDashboard } from "@api/cubeApi/query";
import sampleImg from "@assets/rentSample.png";

const ErpDashBoard = () => {
  const sliderStoreRef = useRef(null);
  const sliderSaleRef = useRef(null);
  const sliderClientRef = useRef(null);
  const sliderRentRef = useRef(null);
  const [notice, setNotic] = useState<any[]>([]);
  const [doc, setDoc] = useState<any[]>([]);
  const navigate = useNavigate();
  const { resultSet, error, isLoading } = useCubeQuery(
    querySaleDashboard.initQ
  );

  const swiper = useSwiper();

  const handlePrev = useCallback((num: number) => {
    if (num === 0) {
      if (!sliderStoreRef.current) return;
      // @ts-ignore
      sliderStoreRef.current.swiper.slidePrev();
    } else if (num === 1) {
      if (!sliderSaleRef.current) return;
      // @ts-ignore
      sliderSaleRef.current.swiper.slidePrev();
    } else if (num === 2) {
      if (!sliderClientRef.current) return;
      // @ts-ignore
      sliderClientRef.current.swiper.slidePrev();
    } else if (num === 3) {
      if (!sliderRentRef.current) return;
      // @ts-ignore
      sliderRentRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback((num: number) => {
    if (num === 0) {
      if (!sliderStoreRef.current) return;
      // @ts-ignore
      sliderStoreRef.current.swiper.slideNext();
    } else if (num === 1) {
      if (!sliderSaleRef.current) return;
      // @ts-ignore
      sliderSaleRef.current.swiper.slideNext();
    } else if (num === 2) {
      if (!sliderClientRef.current) return;
      // @ts-ignore
      sliderClientRef.current.swiper.slideNext();
    } else if (num === 3) {
      if (!sliderRentRef.current) return;
      // @ts-ignore
      sliderRentRef.current.swiper.slideNext();
    }
  }, []);

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
      <Flex
        w="100%"
        h="auto"
        direction={{ pc: "row", tablet: "column", mobile: "column" }}
        gap="0.75rem"
      >
        <Section p="0.75rem" w="100%" gap="0.5rem">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              공지
            </Heading>
            <Text variant="outlet">Notice</Text>
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
        <Section p="0.75rem" w="100%" gap="0.5rem">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              전자문서
            </Heading>
            <Text variant="outlet">Doc</Text>
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
      <Flex
        gap="0.75rem"
        w="100%"
        h="30%"
        direction={{ pc: "row", tablet: "column", mobile: "column" }}
        flexBasis="30%"
        flexGrow={1}
      >
        <Section p="0.75rem" w="55%" h="100%">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              매장
            </Heading>
            <Text variant="outlet">Store</Text>
          </Flex>
          <Flex w="100%" h="inherit">
            <Flex
              direction="column"
              w={{ pc: "50%", tablet: "100%", mobile: "100%" }}
              h="100%"
            >
              <Flex w="100%" h="100%" justify="center" align="center">
                <ChartBar
                  title="매장수"
                  data={[35, 25, 15, 10, 4]}
                  labels={["A", "B", "C", "D", "E"]}
                  labelText="매장수"
                  width="90%"
                  height="90%"
                />
              </Flex>
            </Flex>
            <Divider
              m="0 1.25rem"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex
              pos="relative"
              w={{ pc: "50%", tablet: "100%", mobile: "100%" }}
              h="100%"
              flex="none"
            >
              <Flex
                pos="absolute"
                top="40%"
                left="0"
                right="0"
                w="100%"
                justify="space-between"
                zIndex={2}
              >
                <IcoBtnPrev onClick={() => handlePrev(0)} />
                <IcoBtnNext
                  onClick={() => handleNext(0)}
                  style={{ top: "1px", transform: "rotate(180deg)" }}
                />
              </Flex>
              <Swiper
                loop={true}
                ref={sliderStoreRef}
                spaceBetween={0}
                slidesPerView={1}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SwiperSlide>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <ChartPie
                      title="매장타입"
                      data={[35, 25, 15, 10, 4]}
                      labels={["A", "B", "C", "D", "E"]}
                      labelText="매장타입"
                      width="80%"
                      height="90%"
                    />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <ChartPie
                      title="매장상태"
                      data={[35, 25, 15, 10, 4]}
                      labels={["입점", "휴점", "대기", "폐점", "기타"]}
                      labelText="매장상태"
                      width="80%"
                      height="90%"
                    />
                  </Flex>
                </SwiperSlide>
              </Swiper>
            </Flex>
          </Flex>
        </Section>
        <Section p="0.75rem" w="45%" h="100%">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              상권
            </Heading>
            <Text variant="outlet">BsnsD</Text>
          </Flex>
          <Flex w="100%" h="inherit">
            <Flex
              direction="column"
              w="50%"
              h="100%"
              justify="center"
              align="center"
            >
              <ChartPie
                title="상권타입"
                data={[35, 25, 15, 10, 4]}
                labels={["A", "B", "C", "D", "E"]}
                labelText="상권타입"
              />
            </Flex>
            <Divider
              m="0"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex
              direction="column"
              w="50%"
              h="100%"
              justify="center"
              align="center"
            >
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
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              매출
            </Heading>
            <Text variant="outlet">Sale</Text>
          </Flex>
          <Flex w="100%" h="100%" direction={"row"}>
            <Flex w="50%" h="100%" pos="relative">
              <Flex w="100%" h="100%" justify="center" align="center">
                <ChartBarHorizon width="100%" height="90%" />
              </Flex>
            </Flex>
            <Divider
              m="0 1rem"
              h="90%"
              orientation="vertical"
              borderColor="#26232380"
            />
            <Flex w="50%" h="100%" pos="relative" flex="none">
              <Flex
                pos="absolute"
                top="40%"
                left="0"
                right="0"
                w="100%"
                justify="space-between"
                zIndex={2}
              >
                <IcoBtnPrev onClick={() => handlePrev(1)} />
                <IcoBtnNext
                  onClick={() => handleNext(1)}
                  style={{ top: "1px", transform: "rotate(180deg)" }}
                />
              </Flex>
              <Swiper
                ref={sliderSaleRef}
                spaceBetween={0}
                slidesPerView={1}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <ChartPie
                      title="인기메뉴별"
                      data={[35, 25, 15, 10, 4]}
                      labels={["A", "B", "C", "D", "E"]}
                      labelText="인기메뉴"
                    />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide style={{ width: "100%", height: "100%" }}>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <ChartPie
                      title="주문방식별"
                      data={[55, 15, 3]}
                      labels={["배달", "포장", "테이블"]}
                      labelText="주문방식"
                    />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <LineChart width="90%" height="90%" />
                  </Flex>
                </SwiperSlide>
                <SwiperSlide>
                  <Flex w="100%" h="100%" justify="center" align="center">
                    <LineChart width="90%" height="90%" />
                  </Flex>
                </SwiperSlide>
              </Swiper>
            </Flex>
          </Flex>
        </Section>
        <Section p="0.75rem" w="calc(22.5% - 0.375rem)" h="100%">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              매물
            </Heading>
            <Text variant="outlet">Rent</Text>
          </Flex>
          <Flex w="100%" h="100%" pos="relative">
            <Flex
              pos="absolute"
              top="40%"
              left="0"
              right="0"
              w="100%"
              justify="space-between"
              zIndex={2}
            >
              <IcoBtnPrev onClick={() => handlePrev(3)} />
              <IcoBtnNext
                onClick={() => handleNext(3)}
                style={{ top: "1px", transform: "rotate(180deg)" }}
              />
            </Flex>
            <Swiper
              ref={sliderRentRef}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <SampleRent />
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <SampleRent />
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <SampleRent />
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <SampleRent />
                </Flex>
              </SwiperSlide>
            </Swiper>
          </Flex>
        </Section>
        <Section p="0.75rem" w="calc(22.5% - 0.375rem)" h="100%">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              고객
            </Heading>
            <Text variant="outlet">Client</Text>
          </Flex>
          <Flex w="100%" h="100%" pos="relative" flex="none">
            <Flex
              pos="absolute"
              top="40%"
              left="0"
              right="0"
              w="100%"
              justify="space-between"
              zIndex={2}
            >
              <IcoBtnPrev onClick={() => handlePrev(2)} />
              <IcoBtnNext
                onClick={() => handleNext(2)}
                style={{ top: "1px", transform: "rotate(180deg)" }}
              />
            </Flex>
            <Swiper
              ref={sliderClientRef}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <ChartPie
                    title="고객현황"
                    data={[35, 25, 15, 10]}
                    labels={["상담대기", "상담중", "상담완료", "종료"]}
                    labelText="고객현황"
                    width="80%"
                    height="90%"
                  />
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ width: "100%", height: "100%" }}>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <ChartPie
                    title="인기희망지역"
                    data={[35, 25, 35, 20, 54]}
                    labels={["서울", "인천", "경기도", "부산", "기타"]}
                    labelText="유입경로"
                    width="80%"
                    height="90%"
                  />
                </Flex>
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
  width,
  height,
}: {
  title: string;
  data: any[];
  labels: any[];
  labelText: string;
  width?: string;
  height?: string;
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        fullSize: true,
        position: "bottom" as const,
        labels: {
          padding: 10,
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 8,
          },
        },
      },
      title: {
        position: "bottom" as const,
        display: true,
        text: title,
        color: "#26232380",
        font: {
          family: "Roboto",
          size: 14,
          fontWeight: 700,
        },
      },
      layout: {
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
  return (
    <Flex
      width={width || "80%"}
      height={height || "90%"}
      justify="center"
      align="center"
    >
      <Pie data={dataSet} options={options} redraw={true} />
    </Flex>
  );
};

const ChartBar = ({
  title,
  data,
  labelText,
  width,
  height,
}: {
  title?: string;
  data: any[];
  labels: any[];
  labelText: string;
  width?: any;
  height?: any;
}) => {
  const [duration, setDuration] = useState("month6");
  const [label, setLabel] = useState([
    "9월",
    "10월",
    "11월",
    "12월",
    "1월",
    "2월",
  ]);
  const [sampleData, setData] = useState<any>({
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
  });
  const [dataSet, setDataSet] = useState<any>({
    labels: label,
    datasets: [
      {
        label: "A",
        data: label.map((date) => sampleData[date].A),
        backgroundColor: "#CAF0FF",
        borderRadius: 2,
      },
      {
        label: "B",
        data: label.map((date) => sampleData[date].B),
        backgroundColor: "#D9EE86",
        borderRadius: 2,
      },
      {
        label: "C",
        data: label.map((date) => sampleData[date].C),
        backgroundColor: "#EFA180",
        borderRadius: 2,
      },
      {
        label: "D",
        data: label.map((date) => sampleData[date].D),
        backgroundColor: "#6C6C70",
        borderRadius: 2,
      },
      {
        label: "E",
        data: label.map((date) => sampleData[date].E),
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
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        position: "top" as const,
        align: "end",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 5,
        },
      },
      title: {
        position: "bottom" as const,
        display: title ? true : false,
        text: title,
        color: "#26232380",
        font: {
          family: "Roboto",
          size: 14,
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

  useEffect(() => {
    if (duration === "month6") {
      let label = ["9월", "10월", "11월", "12월", "1월", "2월"];
      let sample: any = {
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
      setLabel(label);
      setData(sample);
      setDataSet({
        labels: label,
        datasets: [
          {
            label: "A",
            data: label.map((date) => sample[date].A),
            backgroundColor: "#CAF0FF",
            borderRadius: 2,
          },
          {
            label: "B",
            data: label.map((date) => sample[date].B),
            backgroundColor: "#D9EE86",
            borderRadius: 2,
          },
          {
            label: "C",
            data: label.map((date) => sample[date].C),
            backgroundColor: "#EFA180",
            borderRadius: 2,
          },
          {
            label: "D",
            data: label.map((date) => sample[date].D),
            backgroundColor: "#6C6C70",
            borderRadius: 2,
          },
          {
            label: "E",
            data: label.map((date) => sample[date].E),
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
      });
    } else if (duration === "month3") {
      let label = ["12월", "1월", "2월"];
      let sample: any = {
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
      setLabel(label);
      setData(sample);
      setDataSet({
        labels: label,
        datasets: [
          {
            label: "A",
            data: label.map((date) => sample[date].A),
            backgroundColor: "#CAF0FF",
            borderRadius: 2,
          },
          {
            label: "B",
            data: label.map((date) => sample[date].B),
            backgroundColor: "#D9EE86",
            borderRadius: 2,
          },
          {
            label: "C",
            data: label.map((date) => sample[date].C),
            backgroundColor: "#EFA180",
            borderRadius: 2,
          },
          {
            label: "D",
            data: label.map((date) => sample[date].D),
            backgroundColor: "#6C6C70",
            borderRadius: 2,
          },
          {
            label: "E",
            data: label.map((date) => sample[date].E),
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
      });
    } else if (duration === "monthDay") {
      let label: any = [];
      let sample: any = {};

      for (let i = 1; i <= 30; i++) {
        label.push(`${i}일`);
      }

      for (let i = 1; i <= 30; i++) {
        sample[`${i}일`] = {
          A: 100,
          B: 50,
          C: 30,
          D: 20,
          E: 50,
        };
      }

      setLabel(label);
      setData(sample);
      setDataSet({
        labels: label,
        datasets: [
          {
            label: "A",
            data: label.map((date: any) => sample[date].A),
            backgroundColor: "#CAF0FF",
            borderRadius: 2,
          },
          {
            label: "B",
            data: label.map((date: any) => sample[date].B),
            backgroundColor: "#D9EE86",
            borderRadius: 2,
          },
          {
            label: "C",
            data: label.map((date: any) => sample[date].C),
            backgroundColor: "#EFA180",
            borderRadius: 2,
          },
          {
            label: "D",
            data: label.map((date: any) => sample[date].D),
            backgroundColor: "#6C6C70",
            borderRadius: 2,
          },
          {
            label: "E",
            data: label.map((date: any) => sample[date].E),
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
      });
    } else return;
  }, [duration]);

  return (
    <Flex
      pos="relative"
      width={width || "100%"}
      height={height || "100%"}
      direction="column"
      align="flex-end"
    >
      <Select
        variant="search"
        data={[
          { text: "최근 6개월", value: "month6" },
          { text: "최근 3개월", value: "month3" },
          { text: "최근 한달", value: "monthDay" },
        ]}
        value={duration}
        opBaseTxt="text"
        opBaseId="value"
        opBaseKey="value"
        onChange={(val: any) => setDuration(val)}
        selectProps={{
          position: "absolute",
          top: "-3px",
          left: "-0.5rem",
          width: "40%",
          height: "1.3rem",
          lineHeight: "1.3rem",
          fontSize: "xs",
        }}
      />
      <Bar
        data={dataSet}
        // @ts-ignore
        options={options}
        style={{ width: "100%", height: "100%" }}
        redraw={true}
      />
    </Flex>
  );
};

const ChartBarHorizon = ({
  title,
  data,
  labelText,
  width,
  height,
}: {
  title?: string;
  data?: any[];
  labels?: any[];
  labelText?: string;
  width?: any;
  height?: any;
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
          font: {
            size: 8,
          },
        },
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: 0,
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
          font: {
            size: 8,
          },
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
          font: {
            size: 8,
          },
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
        // backgroundColor: "#CAF0FF",
        backgroundColor: "#EFA180",
        borderRadius: {
          topLeft: 100,
          bottomLeft: 100,
          topRight: 0,
          bottomRight: 0,
          borderSkipped: false,
        },
      },
      // {
      //   label: "B",
      //   data: labels.map((date) => sample[date].B),
      //   backgroundColor: "#D9EE86",
      //   borderRadius: {
      //     topLeft: 20,
      //     bottomLeft: 20,
      //     topRight: 0,
      //     bottomRight: 0,
      //   },
      // },
      // {
      //   label: "C",
      //   data: labels.map((date) => sample[date].C),
      //   backgroundColor: "#EFA180",
      //   borderRadius: {
      //     topLeft: 20,
      //     bottomLeft: 20,
      //     topRight: 0,
      //     bottomRight: 0,
      //   },
      // },
      // {
      //   label: "D",
      //   data: labels.map((date) => sample[date].D),
      //   backgroundColor: "#6C6C70",
      //   borderRadius: {
      //     topLeft: 20,
      //     bottomLeft: 20,
      //     topRight: 0,
      //     bottomRight: 0,
      //   },
      // },
    ],
  };

  return (
    <Flex width={width || "100%"} height={height || "100%"}>
      <Bar
        data={dataSet}
        // @ts-ignore
        options={options}
        style={{ width: "100%", height: "100%" }}
        redraw={true}
      />
    </Flex>
  );
};

const LineChart = ({ width, height }: { width?: any; height?: any }) => {
  const [gradient, setGradient] = useState(null);

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

  useEffect(() => {
    // @ts-ignore
    const ctx = document.getElementById("saleDay").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#ebff05b3");
    gradient.addColorStop(1, "#ebff0500");

    setGradient(gradient);
  }, []);

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
          size: 14,
          fontWeight: 700,
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
        capBezierPoints: false,
      },
    },
  };
  const labels = ["Mon", "Tue", "Thu", "Wed", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "요일별",
        data: [5000000, 2000000, 560000, 5000000, 3000000, 5000000, 10000000],
        fill: true,
        backgroundColor: gradient,
        segment: {
          borderWidth: 1,
          borderColor: "#00000080",
        },
        pointStyle: "circle",
        pointBorderWidth: 1,
        pointRadius: 3,
        pointhoverRadius: 6,
        pointBackgroundColor: "#e4ff0080",
        pointBorderColor: "#00000080",
      },
    ],
  };

  return (
    <Flex w={width || "100%"} h={height || "100%"} justify="center">
      <Line
        id="saleDay"
        options={options}
        // @ts-ignore
        data={data}
        style={{ width: "100%", height: "100%" }}
      />
    </Flex>
  );
};

const SampleRent = () => {
  return (
    <Flex
      p="0 1rem"
      w="80%"
      gap="0.75rem"
      alignItems="center"
      direction="column"
    >
      <Image w="8vh" h="8vh" src={sampleImg} />
      <List display="flex" flexDirection="column" w="100%" gap="0.375rem">
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
            flex="none"
          >
            준공기간
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            89.11.03 ~ 94.10.25
          </Text>
        </ListItem>
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
          >
            대장종류
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            건축물대장
          </Text>
        </ListItem>
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
          >
            지붕
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            시멘트
          </Text>
        </ListItem>
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
          >
            용도
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            근린생활시설
          </Text>
        </ListItem>
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
          >
            구조
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            철근콘크리트
          </Text>
        </ListItem>
        <ListItem
          w="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="flex-start"
          gap="0.5rem"
        >
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="strong"
            color="font.title"
          >
            연면적
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            textAlign="right"
            whiteSpace="break-spaces"
          >
            429.77 m
          </Text>
        </ListItem>
      </List>
    </Flex>
  );
};

export default ErpDashBoard;
