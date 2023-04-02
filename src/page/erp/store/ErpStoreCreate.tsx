//  LIB
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import Section from "@components/common/Section";
import { IcoBtnBack } from "@components/common/Btn";
import FormStoreEditor from "@components/form/erp/FormStoreEditor";
import ModalStoreUpload from "@src/components/modal/erp/ModalStoreUpload";
//  Api & Query
import { IcoAppStore, IcoPlusSquare } from "@src/assets/icons/icon";
import { FormikValues } from "formik";
import { useNavigate } from "react-router-dom";

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
  const navitate = useNavigate();
  const submitRef = useRef<FormikValues>(null);
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [storeData, setStoreData] = useState<StoreInfo | undefined>({
    storeName: "",
    storeCode: "",
    storeStatus: "",
    storeRank: "",
    phone: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    addr: "",
    addrDetail: "",
    linkBsns: [],
  });

  const createStore = (value: StoreInfo) => {
    console.log("update click");
    submitRef?.current && submitRef.current.handleSubmit();
    navitate("/erp/store");
  };

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
      <Tabs variant="detailPage" index={0}>
        <Flex
          pos="relative"
          p="0"
          w="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <IcoBtnBack
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              w: "max-content",
            }}
            w="max-content"
          />
          <TabList>
            <Tab key="tab-info">
              <IcoPlusSquare />
              <Text>매장 등록</Text>
            </Tab>
          </TabList>
          <Flex position="absolute" top="0" right="0" gap="0.5rem">
            <ModalStoreUpload />
            <Button
              w="100px"
              variant="search"
              onClick={() => {
                storeData && createStore(storeData);
              }}
            >
              <IcoAppStore w="0.875rem" h="0.875rem" />
              <Text variant="search" color="#ffffff">
                완료
              </Text>
            </Button>
          </Flex>
          {/* {activeUpdate && (
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
          )} */}
          {/* <IcoBtnUpdate
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
            /> */}
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" h="100%" flexDirection="column" gap="1rem">
              <FormStoreEditor
                initVal={storeData}
                fixMode={true}
                setValues={setStoreData}
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
        </TabPanels>
      </Tabs>
      {/* <Flex
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
      </Tabs> */}
    </Section>
  );
};

export default ErpStoreCreate;
