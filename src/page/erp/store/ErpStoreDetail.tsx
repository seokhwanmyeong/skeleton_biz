//  LIB
import { useContext, useEffect, useRef, useState, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
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
import { Line, Bar } from "react-chartjs-2";
//  Components
import ErpHistory from "@page/erp/history/ErpHistory";
import ListTable from "@components/table/ListTable";
import Section from "@components/common/Section";
import { IcoBtnUpdate } from "@components/common/Btn";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
//  Hook
import useLocationState from "@hook/useLocationState";
import { CubeContext } from "@cubejs-client/react";
//  Api & Query
import { queryStoreInfo, queryStoreSale } from "@api/cubeApi/query";
import { ResultSet } from "@cubejs-client/core";
import { transDataKey } from "@services/cube/transformer";
import Table from "@src/components/table/Table";
import { columnStoreInfo } from "@src/components/table/column/erp";

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
  const { cubejsApi } = useContext(CubeContext);
  const navigate = useNavigate();
  const { location } = useLocationState();
  const mapRef = useRef<any>();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | undefined>(undefined);
  const [center, setCenter] = useState({ lat: null, lng: null });
  const state = location.state;
  const storeCode = state?.[`StoreInfo.storeCode`] || id;
  const [activeUpdate, setActiveUpdate] = useState(false);
  // console.log(storeCode);

  useEffect(() => {
    if (storeCode) {
      cubejsApi
        .load({
          ...queryStoreInfo.initQ,
          filters: [
            {
              member: "StoreInfo.storeCode",
              operator: "equals",
              values: [String(storeCode)],
            },
          ],
        })
        .then((res: ResultSet<any>) => {
          const data = transDataKey<StoreInfo>(res.tablePivot());
          console.log(data);
          setStoreInfo(data[0]);
        });
      cubejsApi
        .load(
          queryStoreSale.initQ.map((query) => ({
            ...query,
            filters: [
              {
                member: "StoreInfo.storeCode",
                operator: "equals",
                values: [String(storeCode)],
              },
            ],
          }))
        )
        .then((res) => {
          console.log(res);
          console.log(res.decompose().map((l) => console.log(l.rawData())));
        });
    }
  }, [storeCode]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        // center: new naver.maps.LatLng(state.lat, state.lng),
        zoom: 13,
      });

      // const marker = new naver.maps.Marker({
      //   position: { lat: state.lat, lng: state.lng },
      //   map: mapRef.current,
      // });
    }
  }, [mapRef]);

  const column = useMemo(() => columnStoreInfo, []);

  return (
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
    <Section p="0.625rem 0.75rem 3.75rem">
      <Flex
        position="relative"
        w="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Button
          key={`link-prev`}
          onClick={() => navigate(-1)}
          position="absolute"
          top={0}
          left={0}
          w="max-content"
        >
          {"< 매장리스트"}
        </Button>
        <Flex align="center" gap="0.5rem">
          <Heading as="h3" mb="2rem" variant="detailTitle">
            {storeInfo ? storeInfo.storeName : "종로점"}
          </Heading>
          <IcoBtnUpdate
            onClick={() => {
              setActiveUpdate(!activeUpdate);
            }}
          />
        </Flex>
        <Text variant="detailSub">
          매장코드 : {storeInfo ? storeInfo.storeCode : "12341234"}
        </Text>
      </Flex>
      <Divider m="1rem 0 1.375rem" color="font.title" />
      <Tabs variant="detailPage">
        <Flex w="100%" justifyContent="center">
          <TabList>
            <Tab key="tab-info" flexDirection="column">
              <Text>기본정보</Text>
            </Tab>
            <Tab key="tab-sale" flexDirection="column">
              <Text>매출정보</Text>
            </Tab>
            <Tab key="tab-history" flexDirection="column">
              <Text>히스토리 게시판</Text>
            </Tab>
            <Tab key="tab-doc" flexDirection="column">
              <Text>문서보관함</Text>
            </Tab>
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex flexDirection="column" gap="1rem">
              <div
                id="map"
                style={{
                  width: "100%",
                  height: "400px",
                }}
              ></div>
              <FormStoreEditor
                initVal={{
                  storeStatus: "입점",
                  storeRank: "A타입",
                  phone: "010-8277-8260",
                  biz_number: "01-524-64211-21",
                  owner_name: "홍길동",
                  owner_phone: "010-8277-8260",
                  addr: "경기도 김포시 풍무로 69번길 51 102동 101호",
                  linkBsns: [
                    { name: "종로상권1", code: "1234" },
                    { name: "종로상권2", code: "12345" },
                  ],
                }}
                fixMode={activeUpdate}
                update={true}
              />
              {/* <ListTable
                tableProps={{ w: "100%" }}
                isDivide={true}
                data={
                  storeInfo || {
                    storeStatus: "입점",
                    storeRank: "A타입",
                    phone: "010-8277-8260",
                    biz_number: "01-524-64211-21",
                    owner_name: "홍길동",
                    owner_phone: "010-8277-8260",
                    addr: "경기도 김포시 풍무로 69번길 51 102동 101호",
                    linkBsns: [
                      { name: "종로상권1", code: "1234" },
                      { name: "종로상권2", code: "12345" },
                    ],
                  }
                }
              /> */}
            </Flex>
          </TabPanel>
          <TabPanel key="panel-upjong">
            <LineChart />
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
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
            <ErpHistory id={""} />
          </TabPanel>
          <TabPanel key="panel-area">전자계약서</TabPanel>
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
        backgroundColor: `${theme.colors.primary.type7}40`,
      },
    ],
  };

  return (
    <Flex w="100%" h="50%" justify="center">
      <Flex
        p="1rem"
        w="auto"
        minW="50%"
        h="100%"
        border="1px solid"
        borderColor="font.primary"
      >
        <Line options={options} data={data} updateMode={"resize"} />
      </Flex>
    </Flex>
  );
};

export default ErpStoreDetail;
