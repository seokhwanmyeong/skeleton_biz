//  LIB
import { useEffect, useRef, useMemo } from "react";
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
import ErpBaseTable from "./ErpBaseTable";
import ApiTable from "@src/components/table/ApiTable";
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
    name: "매장명",
    code: "매장코드",
    status: "매장상태",
    rank: "매장타입",
    phone: "매장연락처",
    biz_number: "사업자등록번호",
    owner_name: "대표자",
    owner_phone: "대표자 연락처",
    address: "주소",
    address_detail: "주소상세",
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
        {"< 매장리스트"}
      </Button>
      <Heading mb="2rem">매장상세 : {state.name || "매장이름"}</Heading>
      <Flex gap={5}>
        <Flex gap={2}>
          <Text>매장명 : </Text>
          <Text>{state.name}</Text>
        </Flex>
        <Flex gap={2}>
          <Text>매장코드 : </Text>
          <Text>{state.code}</Text>
        </Flex>
      </Flex>
      <hr style={{ margin: "1rem 0" }} />
      <Tabs>
        <TabList justifyContent="center">
          <Tab key="tab-info" flexDirection="column" w="30%">
            <Text>기본정보</Text>
          </Tab>
          <Tab key="tab-sale" flexDirection="column" w="30%">
            <Text>매출정보</Text>
          </Tab>
          <Tab key="tab-history" flexDirection="column" w="30%">
            <Text>히스토리</Text>
          </Tab>
          <Tab key="tab-doc" flexDirection="column" w="30%">
            <Text>전자계약서</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex flexDirection="row" w="100%" gap="1rem">
              <div
                id="map"
                style={{
                  width: "50%",
                  height: "25rem",
                }}
              ></div>
              <ListTable
                tableProps={{ w: "50%" }}
                data={state}
                listKeys={testKeys}
              />
            </Flex>
          </TabPanel>
          <TabPanel key="panel-upjong">
            <ErpBaseTable />
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
          <TabPanel key="panel-area">전자계약서</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default ErpStoreDetail;
