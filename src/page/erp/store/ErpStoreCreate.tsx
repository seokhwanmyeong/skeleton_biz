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
import { Swiper, SwiperSlide } from "swiper/react";
import ErpHistory from "@page/erp/history/ErpHistory";
import Section from "@components/common/Section";
import { IcoBtnBack, IcoBtnUpdate } from "@components/common/Btn";
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
import { Input } from "@src/components/common/Input";

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
};

const ErpStoreCreate = () => {
  const mapRef = useRef<any>();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | undefined>(undefined);
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [storeData, setStoreData] = useState<StoreInfo | undefined>({
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
  });

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5666805, 126.9784147),
        zoom: 13,
      });

      const marker = new naver.maps.Marker({
        position: { lat: 37.5666805, lng: 126.9784147 },
        map: mapRef.current,
      });
    }
  }, [mapRef]);

  return (
    <Section p="0.625rem 0.75rem 3.75rem">
      <Flex
        position="relative"
        w="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <IcoBtnBack position="absolute" top={0} left={0} w="max-content" />
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
        {/* {activeUpdate ? (
          <Input
            value={storeData ? storeData.storeCode : "12341234"}
            inputProps={{ w: "10rem" }}
            onChange={(val: any) => setCode(val)}
          />
        ) : (
          <Text variant="detailSub">
            매장코드 : {storeData ? storeData.storeCode : "12341234"}
          </Text>
        )} */}
      </Flex>
      <Divider m="1rem 0 1.375rem" color="font.title" />
      <Tabs variant="detailPage">
        <Flex w="100%" justifyContent="center">
          <TabList>
            <Tab key="tab-info" flexDirection="column">
              <Text>매장등록</Text>
            </Tab>
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" flexDirection="column" gap="1rem">
              <div
                id="map"
                style={{
                  padding: "0 3vw",
                  width: "100%",
                  height: "20vw",
                }}
              ></div>
              <FormStoreEditor
                initVal={{
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
                }}
                fixMode={activeUpdate}
                update={true}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpStoreCreate;
