//  LIB
import { useEffect, useRef } from "react";
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
  List,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import ErpHistory from "@page/erp/history/ErpHistory";
import ListTable from "@components/table/ListTable";
import ErpBaseTable from "../ErpBaseTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
//  Hook
import useLocationState from "@hook/useLocationState";

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
    <Box
      overflowY="scroll"
      pl="1rem"
      __css={{
        "::-webkit-scrollbar": {
          w: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          borderRadius: "5",
          bg: `primary.reverse.bdColor`,
        },
      }}
    >
      <Button
        mb="2rem"
        key={`link-prev`}
        w="max-content"
        onClick={() => navigate(-1)}
      >
        {"< 매장리스트"}
      </Button>
      <Heading variant="outlet">매장상세 : {state.name || "매장이름"}</Heading>
      <List display="flex" gap="10rem" mb="2rem">
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title">매장명</Text>
          <Text textStyle="list.text">{state.name}</Text>
        </ListItem>
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title">매장코드</Text>
          <Text textStyle="list.text">{state.code}</Text>
        </ListItem>
      </List>
      <Tabs variant="detailPage">
        <TabList>
          <Tab key="tab-info" flexDirection="column">
            <Text>기본정보</Text>
          </Tab>
          <Tab key="tab-sale" flexDirection="column">
            <Text>매출정보</Text>
          </Tab>
          <Tab key="tab-history" flexDirection="column">
            <Text>히스토리</Text>
          </Tab>
          <Tab key="tab-doc" flexDirection="column">
            <Text>전자계약서</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <Flex flexDirection="column" gap="1rem">
              <Flex w="100%" justifyContent="flex-end">
                <ModalStoreEditor update={true} info={state} />
              </Flex>
              <Flex flexDirection="row" w="100%" gap="5rem">
                <div
                  id="map"
                  style={{
                    width: "50%",
                    height: "40rem",
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
          <TabPanel key="panel-upjong">
            <ErpBaseTable />
          </TabPanel>
          <TabPanel key="panel-area">
            <ErpHistory />
          </TabPanel>
          <TabPanel key="panel-area">전자계약서</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ErpStoreDetail;
