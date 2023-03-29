//  LIB
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useTheme,
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
//  Components
import ErpHistory from "@page/erp/history/ErpHistory";
import Section from "@components/common/Section";
import { IcoBtnBack, IcoBtnUpdate } from "@components/common/Btn";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Api & Query
import Table from "@src/components/table/Table";
import { columnStoreInfo } from "@src/components/table/column/erp";
import { Input } from "@src/components/common/Input";
//  Icon
import {
  IcoBars,
  IcoLineChart,
  IcoHistory,
  IcoAudit,
} from "@assets/icons/icon";
import { FormikValues } from "formik";

type StoreInfo = {
  storeName: string;
  storeCode: string;
  storeStatus: string;
  storeRank?: string;
  phone?: string;
  biz_number?: string;
  owner_name?: string;
  owner_phone?: string;
  addr: string;
  addrDetail?: string;
  linkBsns?: any[];
  center: {
    lat: number;
    lng: number;
  };
};

const ErpStoreDetail = ({
  id,
  activeBack = true,
  side = false,
}: {
  id?: string;
  activeBack?: boolean;
  side?: boolean;
}) => {
  const { location } = useLocationState();
  const state = location.state;
  const mapRef = useRef<any>();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [tabIdx, setTabIdx] = useState<number>(state?.tabIdx || 0);
  const [storeData, setStoreData] = useState<StoreInfo | undefined>(undefined);
  const submitRef = useRef<FormikValues>(null);

  const getStoreInfo = () => {
    console.log("click");
  };

  const updateStoreInfo = (value: StoreInfo) => {
    console.log("update click");
  };

  useEffect(() => {
    // console.log(state);
    if (state.id) {
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
        center: {
          lat: 37.5666805,
          lng: 126.9784147,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          storeData?.center.lat || 37.5666805,
          storeData?.center.lng || 126.9784147
        ),
        zoom: 13,
      });

      if (storeData?.center.lat && storeData?.center.lng) {
        const marker = new naver.maps.Marker({
          position: { lat: storeData.center.lat, lng: storeData.center.lng },
          map: mapRef.current,
        });
      }
    } else if (storeData?.center) {
      mapRef.current.setCenter(
        new naver.maps.LatLng(
          storeData.center.lat || 37.5666805,
          storeData.center.lng || 126.9784147
        )
      );

      if (storeData?.center.lat && storeData?.center.lng) {
        const marker = new naver.maps.Marker({
          position: { lat: storeData.center.lat, lng: storeData.center.lng },
          map: mapRef.current,
        });
      }
    }
  }, [mapRef, storeData]);

  const column = useMemo(() => columnStoreInfo, []);

  return (
    <Section p="1rem 0.75rem 3.75rem">
      <Tabs
        variant="detailPage"
        index={tabIdx}
        onChange={(index) => setTabIdx(index)}
      >
        <Flex
          pos="relative"
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          {activeBack && (
            <IcoBtnBack
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                w: "max-content",
              }}
              w="max-content"
            />
          )}
          <TabList>
            <Tab key="tab-info">
              <IcoBars />
              <Text>기본 정보</Text>
            </Tab>
            <Tab key="tab-sale">
              <IcoLineChart />
              <Text>매출</Text>
            </Tab>
            <Tab key="tab-history">
              <IcoHistory />
              <Text>히스토리 게시판</Text>
            </Tab>
            <Tab key="tab-doc">
              <IcoAudit />
              <Text>문서보관함</Text>
            </Tab>
          </TabList>
          <IcoBtnUpdate
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              w: "max-content",
            }}
            onClick={() => {
              if (activeUpdate) {
                submitRef?.current && submitRef.current.handleSubmit();
                setActiveUpdate(!activeUpdate);
              } else {
                setActiveUpdate(!activeUpdate);
              }
            }}
          />
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" h="100%" flexDirection="column" gap="1rem">
              <FormStoreEditor
                initVal={storeData}
                fixMode={activeUpdate}
                setValues={updateStoreInfo}
                update={true}
                ref={submitRef}
              >
                <div
                  id="map"
                  style={{
                    marginBottom: "4vw",
                    width: "100%",
                    height: "40%",
                  }}
                ></div>
              </FormStoreEditor>
            </Flex>
          </TabPanel>
          <TabPanel key="panel-upjong">
            <LineChart />
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <SwiperSlide style={{ padding: "3rem", width: "100%" }}>
                <Flex>
                  <Table data={[]} divide={5} columns={column} />
                  <Table data={[]} divide={5} columns={column} />
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ padding: "3rem", width: "100%" }}>
                test1
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel key="panel-area">
            <ErpHistory id="test" title={storeData?.storeName} />
          </TabPanel>
          <TabPanel key="panel-area">문서보관함</TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
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
    Legend
  );
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
  };
  const labels = [
    "202202",
    "202203",
    "202204",
    "202205",
    "202206",
    "202207",
    "202208",
    "202209",
    "202210",
    "202211",
    "202212",
    "202301",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "매출증가추이",
        data: [
          1000000, 2000000, 3000000, 5000000, 3000000, 5000000, 10000000,
          30000000, 2000000, 5000000, 3000000,
        ],
        fill: true,
        borderColor: "#D9D9D9",
        backgroundColor: [
          "rgba(235, 255, 5, 0.49) 10%",
          "rgba(56, 59, 61, 0) 98.46%)",
        ],
        // "linear-gradient(178.56deg, rgba(235, 255, 5, 0.49) 10%, rgba(56, 59, 61, 0) 98.46%)",
      },
    ],
  };

  return (
    <Flex w="100%" h="60%" justify="center">
      <Flex
        p="1rem"
        w="auto"
        minW="80%"
        h="100%"
        border="1px solid"
        borderColor="font.primary"
      >
        <Line
          options={options}
          data={data}
          style={{ width: "100%", height: "500px" }}
        />
      </Flex>
    </Flex>
  );
};

export default ErpStoreDetail;

// <Box
//     w="100%"
//     overflowY="scroll"
//     pl="1rem"
//     __css={{
//       "::-webkit-scrollbar": {
//         w: "5px",
//       },
//       "::-webkit-scrollbar-thumb": {
//         borderRadius: "5",
//         bg: `primary.reverse.bdColor`,
//       },
//     }}
//   ></Box>
