//  LIB
import { useContext, useEffect, useRef, useState } from "react";
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
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import BaseTable from "@components/table/BaseTable";
//  Hook
import useLocationState from "@hook/useLocationState";
import { CubeContext } from "@cubejs-client/react";
//  Api & Query
import { queryStoreInfo, queryStoreSale } from "@api/cubeApi/query";
import { ResultSet } from "@cubejs-client/core";
import { transDataKey } from "@src/services/cube/transformer";

const testKeys = {
  storeName: "매장명",
  storeCode: "매장코드",
  storeStatus: "매장상태",
  storeRank: "매장타입",
  phone: "매장연락처",
  biz_number: "사업자등록번호",
  owner_name: "대표자",
  owner_phone: "대표자 연락처",
  addr: "주소",
  addrDetail: "주소상세",
};

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

const ErpStoreDetail = () => {
  const { cubejsApi } = useContext(CubeContext);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | undefined>(undefined);
  const navigate = useNavigate();
  const { location } = useLocationState();
  const mapRef = useRef<any>();
  const state = location.state;
  const storeCode = state[`StoreInfo.storeCode`];
  console.log(storeCode);
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
      <Heading variant="outlet">
        매장상세 : {storeInfo && storeInfo.storeName}
      </Heading>
      <List display="flex" gap="10rem" mb="2rem">
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title">매장명</Text>
          <Text textStyle="list.text">{storeInfo && storeInfo.storeName}</Text>
        </ListItem>
        <ListItem display="flex" gap="3rem">
          <Text textStyle="list.title">매장코드</Text>
          <Text textStyle="list.text">{storeInfo && storeInfo.storeCode}</Text>
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
                <ModalStoreEditor update={true} info={storeInfo} />
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
                  data={storeInfo || {}}
                  listKeys={testKeys}
                />
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel key="panel-upjong">
            {/* <BaseTable
              actviePage={true}
              registersPerPage={10}
              columns={baseColumn}
              data={sampleData}
              tableOption={tableOption}
              initialSort={initialSort}
            /> */}
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
