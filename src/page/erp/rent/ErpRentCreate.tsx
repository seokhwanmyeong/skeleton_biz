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
//  Api & Query
import { IcoAppStore, IcoPlusSquare } from "@src/assets/icons/icon";
import { FormikValues } from "formik";
import { useNavigate } from "react-router-dom";
import FormRentEditore from "@src/components/form/erp/FormRentEditore";

export type RentInfo = {
  rentName: string;
  rentType?: "A" | "B" | "C" | "D" | "E";
  curUpjong: string;
  size: number;
  floor: number;
  rentalFee: number;
  depositFee: number;
  premiumFee: number;
  manageFee: number;
  img?: [];
  lat: number;
  lng: number;
};

const ErpRentCreate = () => {
  const navitate = useNavigate();
  const submitRef = useRef<FormikValues>(null);
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [rentData, setRentData] = useState<RentInfo>({
    rentName: "",
    rentType: undefined,
    curUpjong: "",
    size: 0,
    floor: 0,
    rentalFee: 0,
    depositFee: 0,
    premiumFee: 0,
    manageFee: 0,
    img: [],
    lat: 0,
    lng: 0,
  });

  const createRent = (value: any) => {
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
              <Text>매물 등록</Text>
            </Tab>
          </TabList>
          <Flex position="absolute" top="0" right="0" gap="0.5rem">
            <Button
              w="100px"
              variant="search"
              onClick={() => {
                rentData && createRent(rentData);
              }}
            >
              <IcoAppStore w="0.875rem" h="0.875rem" />
              <Text variant="search" color="#ffffff">
                완료
              </Text>
            </Button>
          </Flex>
          <Divider m="0 0 1.25rem" borderBottomWidth="2px" color="font.title" />
        </Flex>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex p="0 3vw" h="100%" flexDirection="column" gap="1rem">
              <FormRentEditore
                initVal={rentData}
                fixMode={true}
                setValues={setRentData}
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
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default ErpRentCreate;
