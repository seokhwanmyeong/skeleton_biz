//  LIB
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
//  Components
import ErpHistory from "@page/erp/history/ErpHistory";
import Table from "@components/table/Table";
import Section from "@components/common/Section";
import { IcoBtnBack, IcoBtnUpdate, IcoBtnClose } from "@components/common/Btn";
import FormRentEditore from "@components/form/erp/FormRentEditore";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Util
import { columnRentNear } from "@components/table/column/erp";
//  Icon
import { IcoBars, IcoHistory } from "@assets/icons/icon";
import { useNavigate } from "react-router-dom";

type RentInfo = {
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

const ErpRentDetail = ({
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
  const [rentData, setRentData] = useState<any | undefined>(undefined);
  const [nearStore, setNearby] = useState<any>([]);
  const submitRef = useRef<FormikValues>(null);
  const column = useMemo(() => columnRentNear, []);

  const getStoreInfo = () => {
    console.log("click");
  };

  const updateRentInfo = (value: any) => {
    console.log("update click");
  };

  useEffect(() => {
    // console.log(state);
    if (state?.id) {
      if (state.tabIdx) {
        setTabIdx(state.tabIdx);
      }

      setRentData({
        rentName: "종로매물",
        rentCode: "12314515",
        rentRank: "rankA",
        upjong: "커피",
        addr: "서울특별시 용산구 동자동 366 트윈시티",
        openDate: "2023-03-01",
        size: 30,
        floor: 3,
        rentFee: 1000000,
        reCharge: 10000000,
        rightFee: 10000000,
        manageFee: 300000,
        center: {
          lat: 37.5666805,
          lng: 126.9784147,
        },
      });
      setNearby([
        {
          storeName: "종로2",
          addr: "테스트",
          distance: "000km",
          lat: 37.6666605,
          lng: 126.9782147,
        },
        {
          storeName: "종로3",
          addr: "테스트2",
          distance: "000km",
          lat: 37.9616605,
          lng: 126.9182147,
        },
        {
          storeName: "종로4",
          addr: "테스트2",
          distance: "000km",
          lat: 38.2616605,
          lng: 126.9182147,
        },
        {
          storeName: "종로5",
          addr: "테스트2",
          distance: "000km",
          lat: 38.9616605,
          lng: 126.9182147,
        },
      ]);
    } else {
      navigate("/erp/store");
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          rentData?.center.lat || 37.5666805,
          rentData?.center.lng || 126.9784147
        ),
        zoom: 13,
      });

      if (rentData?.center.lat && rentData?.center.lng) {
        const marker = new naver.maps.Marker({
          position: { lat: rentData.center.lat, lng: rentData.center.lng },
          map: mapRef.current,
        });
      }
    } else if (rentData?.center) {
      mapRef.current.setCenter(
        new naver.maps.LatLng(
          rentData.center.lat || 37.5666805,
          rentData.center.lng || 126.9784147
        )
      );

      if (rentData?.center.lat && rentData?.center.lng) {
        const marker = new naver.maps.Marker({
          position: { lat: rentData.center.lat, lng: rentData.center.lng },
          map: mapRef.current,
        });
      }
    }

    if (nearStore.length !== 0) {
      nearStore.map((li: any) => {
        const marker = new naver.maps.Marker({
          position: { lat: li.lat, lng: li.lng },
          map: mapRef.current,
        });
      });
    }
  }, [mapRef, rentData]);

  return (
    <Section
      p={tabIdx === 1 ? "1rem 0rem 3.75rem" : "1rem 0.75rem 3.75rem"}
      borderRadius={tabIdx === 1 && "0"}
      boxShadow={tabIdx === 1 && "none"}
      bg={tabIdx === 1 && "none"}
      overflow={tabIdx === 1 && "visible"}
    >
      <Tabs
        variant="detailPage"
        index={tabIdx}
        onChange={(index) => setTabIdx(index)}
      >
        <Flex
          pos="relative"
          p={tabIdx === 1 ? "0 0.75rem" : "0"}
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <IcoBtnBack
            style={{
              position: "absolute",
              top: 0,
              left: tabIdx === 1 ? "0.75rem" : 0,
              w: "max-content",
            }}
            w="max-content"
          />
          <TabList>
            <Tab key="tab-info">
              <IcoBars />
              <Text>기본 정보</Text>
            </Tab>
            <Tab key="tab-history" isDisabled={activeUpdate}>
              <IcoHistory />
              <Text>히스토리 게시판</Text>
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
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex
              p="0 3vw 1vw"
              h="100%"
              flexDirection="column"
              gap="1rem"
              justify="space-between"
            >
              <FormRentEditore
                initVal={rentData}
                fixMode={activeUpdate}
                setValues={updateRentInfo}
                update={true}
                ref={submitRef}
              >
                <div
                  id="map"
                  style={{
                    marginBottom: "4vw",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </FormRentEditore>
              {!activeUpdate && (
                <Flex h="35%">
                  <Table
                    data={nearStore}
                    actviePage={false}
                    divide={5}
                    columns={column}
                    flowHeight={true}
                  />
                </Flex>
              )}
            </Flex>
          </TabPanel>
          <TabPanel key="panel-area" overflow={"visible"}>
            <ErpHistory id="test" title={rentData?.rentName} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpRentDetail;
