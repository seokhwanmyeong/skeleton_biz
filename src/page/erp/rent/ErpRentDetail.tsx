//  LIB
import { useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
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
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import ListTable from "@components/table/ListTable";
import ApiTable from "@components/table/ApiTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import ModalRentEditor from "@components/modal/erp/ModalRentEditor";
//  Hook
import useLocationState from "@hook/useLocationState";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";

const ErpStoreDetail = () => {
  const navigate = useNavigate();
  const { location } = useLocationState();
  const mapRef = useRef<any>();
  const state = location.state;
  const testKeys = {
    rentName: "매물명",
    rentRank: "매물타입",
    address: "주소",
    addressDetail: "주소상세",
    expectDay: "입점가능일",
    sector: "현업종",
    size: "실평수",
    floor: "층수",
    rentalFee: "임대료",
    deposit: "보증금",
    premium: "권리금",
    managementFee: "관리비",
  };

  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(state.lat, state.lng),
        zoom: 13,
      });

      const marker = new naver.maps.Marker({
        position: { lat: state.lat, lng: state.lng },
        map: mapRef.current,
      });
    }
  }, [mapRef]);

  return (
    <Flex flexDirection="column">
      <Button
        mb="1rem"
        key={`link-prev`}
        w="max-content"
        onClick={() => navigate(-1)}
      >
        {"< 매물리스트"}
      </Button>
      <Heading mb="2rem">매물상세 : {state.name || "매물이름"}</Heading>
      <Flex gap={5}>
        <Flex gap={2}>
          <Text textStyle="list.title">매물명 : </Text>
          <Text textStyle="list.text">{state.name}</Text>
        </Flex>
        <Flex gap={2}>
          <Text textStyle="list.title">매물코드 : </Text>
          <Text textStyle="list.text">{state.code}</Text>
        </Flex>
      </Flex>
      <hr style={{ margin: "1rem 0" }} />
      <Tabs>
        <TabList justifyContent="left">
          <Tab key="tab-info" flexDirection="column" w="20%">
            <Text>기본정보</Text>
          </Tab>
          <Tab key="tab-history" flexDirection="column" w="20%">
            <Text>히스토리</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex flexDirection="column" gap="1rem">
              <Flex w="100%" justifyContent="flex-end" gap="1rem">
                <ModalRentEditor update={true} info={state} />
                <ModalStoreEditor update={false} info={state} />
              </Flex>
              <Flex flexDirection="row" w="100%" gap="3rem">
                <div
                  id="map"
                  style={{
                    width: "50%",
                    height: "50rem",
                  }}
                ></div>
                <ListTable
                  tableProps={{ w: "50%" }}
                  data={state}
                  listKeys={testKeys}
                />
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel key="panel-area">
            <ApiTable
              api={erpStoreApi.getData}
              initReq={initReq}
              form={form}
              columns={column}
              actviePage={true}
              emptyData={{ text: "No Contents" }}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ErpStoreDetail;
