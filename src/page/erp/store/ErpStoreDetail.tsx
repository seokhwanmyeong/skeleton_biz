//  LIB
import { useEffect, useRef, useState, useMemo } from "react";
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
import { motion } from "framer-motion";
//  Components
import Section from "@components/common/Section";
import ErpHistory from "@page/erp/history/ErpHistory";
import ErpDocs from "@page/erp/docs/ErpDocs";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
import { IcoBtnBack, IcoBtnUpdate, IcoBtnClose } from "@components/common/Btn";
import { Select } from "@components/common/Select";
import Divider from "@components/common/Divider";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Util
import { columnStoreInfo } from "@components/table/column/erp";
//  Icon
import {
  IcoBars,
  IcoLineChart,
  IcoHistory,
  IcoAudit,
} from "@assets/icons/icon";

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
  const navigate = useNavigate();
  const { location } = useLocationState();
  const state = location.state;
  const mapRef = useRef<any>();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [tabIdx, setTabIdx] = useState<number>(state?.tabIdx || 0);
  const [storeData, setStoreData] = useState<StoreInfo | undefined>(undefined);
  const submitRef = useRef<FormikValues>(null);
  const column = useMemo(() => columnStoreInfo, []);
  const [brand, setBrand] = useState(null);

  const getStoreInfo = () => {
    console.log("click");
  };

  const updateStoreInfo = (value: StoreInfo) => {
    console.log("update click");
  };

  useEffect(() => {
    // console.log(state);
    if (state?.id) {
      if (state.tabIdx) {
        setTabIdx(state.tabIdx);
      }

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
    } else {
      navigate("/erp/store");
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

  return (
    <Section
      p={
        tabIdx === 2 || tabIdx === 3
          ? "1rem 0rem 3.75rem"
          : "1rem 0.75rem 3.75rem"
      }
      borderRadius={(tabIdx === 2 || tabIdx === 3) && "0"}
      boxShadow={(tabIdx === 2 || tabIdx === 3) && "none"}
      bg={(tabIdx === 2 || tabIdx === 3) && "none"}
      overflow={(tabIdx === 2 || tabIdx === 3) && "visible"}
    >
      <Tabs
        variant="detailPage"
        index={tabIdx}
        onChange={(index) => setTabIdx(index)}
      >
        <Flex
          pos="relative"
          p={tabIdx === 2 || 3 ? "0 0.75rem" : "0"}
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
                left: tabIdx === 2 || tabIdx === 3 ? "1.25rem" : "0.5rem",
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
            <Tab key="tab-sale" isDisabled={activeUpdate}>
              <IcoLineChart />
              <Text>매출</Text>
            </Tab>
            <Tab key="tab-history" isDisabled={activeUpdate}>
              <IcoHistory />
              <Text>히스토리 게시판</Text>
            </Tab>
            <Tab key="tab-doc" isDisabled={activeUpdate}>
              <IcoAudit />
              <Text>문서보관함</Text>
            </Tab>
          </TabList>
          {activeUpdate && (
            <IcoBtnClose
              style={{
                position: "absolute",
                top: 0,
                right: "2rem",
                w: "max-content",
              }}
              onClick={() => {
                setActiveUpdate(!activeUpdate);
              }}
            />
          )}
          {tabIdx === 0 && (
            <IcoBtnUpdate
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                w: "max-content",
              }}
              isActive={activeUpdate}
              onClick={() => {
                if (activeUpdate) {
                  submitRef?.current && submitRef.current.handleSubmit();
                  setActiveUpdate(!activeUpdate);
                } else {
                  setActiveUpdate(!activeUpdate);
                }
              }}
            />
          )}
          <Divider m="0 0 1.25rem" />
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
            <Flex p="0 1rem" w="100%" justify="flex-end">
              <Select
                data={[
                  { text: "브랜드1", value: "1" },
                  { text: "브랜드2", value: "2" },
                  { text: "브랜드3", value: "3" },
                  { text: "브랜드4", value: "4" },
                ]}
                // value={getFieldProps("clientStatus").value}
                opBaseTxt="text"
                opBaseId="value"
                opBaseKey="value"
                onChange={(val: any) => {
                  setBrand(val);
                }}
                selectProps={{
                  w: "auto",
                }}
              />
            </Flex>
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
              <SwiperSlide
                style={{
                  padding: "1rem 0 3rem",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Flex gap="1rem">
                  <Sample />
                  {brand && <Sample />}
                </Flex>
              </SwiperSlide>
              <SwiperSlide style={{ padding: "3rem", width: "100%" }}>
                test1
              </SwiperSlide>
            </Swiper>
          </TabPanel>
          <TabPanel key="panel-area" overflow={"visible"}>
            <ErpHistory id="test" title={storeData?.storeName} />
          </TabPanel>
          <TabPanel key="panel-area" overflow={"visible"}>
            <ErpDocs id="test" />
          </TabPanel>
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
        label: "매출증가추이",
        data: [
          1000000, 20000000, 30000000, 5000000, 3000000, 5000000, 10000000,
          30000000, 2000000, 5000000, 3000000, 2000000,
        ],
        fill: true,
        borderColor: "#D9D9D9",
        backgroundColor: "#e4ff0080",
        // "linear-gradient(178.56deg, rgba(235, 255, 5, 0.49) 10%, rgba(56, 59, 61, 0) 98.46%)",
      },
      {
        label: "매출증가추이",
        data: [
          2000000, 80000000, 5000000, 5000000, 30000000, 8000000, 10000000,
          30000000, 2000000, 5000000, 5000000, 2000000,
        ],
        fill: true,
        borderColor: "#D9D9D9",
        backgroundColor: "#0037ff80",
        // "linear-gradient(178.56deg, rgba(235, 255, 5, 0.49) 10%, rgba(56, 59, 61, 0) 98.46%)",
      },
    ],
  };

  return (
    <Flex w="100%" h="60%" justify="center">
      <Line
        options={options}
        data={data}
        style={{ width: "100%", height: "500px" }}
      />
    </Flex>
  );
};

const Sample = () => {
  const initVal = [
    { rank: 1, menu: "test1", sale: "1000000", ratio: "30%" },
    { rank: 2, menu: "test2", sale: "900000", ratio: "28%" },
    { rank: 3, menu: "test3", sale: "800000", ratio: "26%" },
  ];
  return (
    <Flex pt="3rem" direction="column" w="100%" h="100%">
      <Flex w="100%" mb="1rem">
        <Text
          w="25%"
          textAlign="center"
          fontWeight="strong"
          fontSize="xs"
          lineHeight="1.0625rem"
        >
          순위
        </Text>
        <Text
          w="25%"
          textAlign="center"
          fontWeight="strong"
          fontSize="xs"
          lineHeight="1.0625rem"
        >
          메뉴
        </Text>
        <Text
          w="25%"
          textAlign="center"
          fontWeight="strong"
          fontSize="xs"
          lineHeight="1.0625rem"
        >
          매출
        </Text>
        <Text
          w="25%"
          textAlign="center"
          fontWeight="strong"
          fontSize="xs"
          lineHeight="1.0625rem"
        >
          비율
        </Text>
      </Flex>
      <Flex h="100%" direction="column">
        {initVal?.map((li: any, idx: number) => {
          console.log(li);
          return (
            <Flex
              mb="0.5rem"
              h="2.5rem"
              border="1px solid"
              borderColor="#D8D8DC"
              borderRadius="12px"
              align="center"
            >
              <Flex w="25%" justify="center" fontWeight="regular" fontSize="xs">
                <Flex fontWeight="regular" fontSize="xs">
                  {li.rank}
                </Flex>
              </Flex>
              <Flex w="25%" justify="center">
                <Flex fontWeight="regular" fontSize="xs">
                  {li.menu}
                </Flex>
              </Flex>
              <Flex w="25%" justify="center">
                <Flex fontWeight="regular" fontSize="xs">
                  {li.sale}
                </Flex>
              </Flex>
              <Flex w="25%" justify="center">
                <Flex fontWeight="regular" fontSize="xs">
                  {li.ratio}
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ErpStoreDetail;
