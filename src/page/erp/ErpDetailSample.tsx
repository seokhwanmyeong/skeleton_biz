//  LIB
import { useMemo, useState, useRef, useEffect, useId } from "react";
import {
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
//  Components
//  Components
import ListTable from "@components/table/ListTable";
import ErpBaseTable from "./ErpBaseTable";
import ApiTable from "@components/table/ApiTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import ModalXlsxController from "@components/modal/erp/ModalXlsxController";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";
import { csvStoreInfo } from "@util/data/fileCSV";

const ErpDetailSample = () => {
  const [apiData, setApiData] = useState([]);
  const [tab, setTab] = useState<any[]>([]);
  const [tabIdx, setTabIdx] = useState(0);

  const test = (info: any) => {
    const cellData = info.cell.row.original;
    const chkKeys = tab.map((li: any) => li.title);

    if (!chkKeys.includes(info.cell.row.original.name)) {
      const newList = [
        ...tab,
        {
          title: cellData?.name || "test",
          props: cellData,
          focus: true,
        },
      ];
      setTab(newList);
      console.log(newList.length);
      setTabIdx(newList.length);
    } else {
      setTabIdx(chkKeys.length);
    }
  };

  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  const DetailSample = ({ info }: any) => {
    const mapRef = useRef<any>();
    const uid = useId();
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
    console.log(info);

    useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = new naver.maps.Map(uid, {
          center: new naver.maps.LatLng(info.lat, info.lng),
          zoom: 13,
        });

        const marker = new naver.maps.Marker({
          position: { lat: info.lat, lng: info.lng },
          map: mapRef.current,
        });
      }
    }, [mapRef]);

    return (
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
                id={uid}
                style={{
                  width: "50%",
                  height: "25rem",
                }}
              ></div>
              <ListTable
                tableProps={{ w: "50%" }}
                data={info}
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
    );
  };

  return (
    <Flex flexDirection="column">
      <Tabs index={tabIdx}>
        <TabList>
          <Tab
            onClick={() => setTabIdx(0)}
            key="tab-info"
            flexDirection="column"
            w="20%"
          >
            <Text>매장</Text>
          </Tab>
          {tab.map((tabEle, idx) => {
            return (
              <Tab
                onClick={(e) => setTabIdx(idx + 1)}
                key={`tab-info-${tabEle.title}`}
                flexDirection="row"
                w="30%"
              >
                <Text>{tabEle.title}</Text>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTab(tab.filter((li: any) => li.title !== tabEle.title));
                    setTabIdx(idx);
                  }}
                >
                  X
                </Button>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          <TabPanel key="panel-pointer">
            <ApiTable
              api={erpStoreApi.getData}
              initReq={initReq}
              form={form}
              columns={column}
              caption="BaseApiTable"
              actviePage={true}
              emptyData={{ text: "No Contents" }}
              getTableData={setApiData}
              selectData={test}
            >
              <Flex gap={2}>
                <ModalStoreEditor update={false} />
                <ModalXlsxController csvInfo={csvStoreInfo} />
              </Flex>
            </ApiTable>
          </TabPanel>
          {tab.map((tab) => {
            console.log(tab);
            return (
              <TabPanel key={`tab-${tab.title}`}>
                <DetailSample info={tab.props} />
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index,
  },
  {
    accessorKey: "name",
    header: "매장명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "code",
    header: "매장코드",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "rank",
    header: "매장타입",
    cell: (info) => info.renderValue(),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "owner_name",
    header: "대표자명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "open_date",
    header: "개업일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "등록일",
    cell: (info) => info.getValue(),
  },
  {
    header: "매장상세",
    cell: (
      info: CellContext<any, unknown> & {
        selectData?: any;
      }
    ) => (
      <Button
        onClick={() => {
          info.selectData && info?.selectData(info);
        }}
      >
        상세보기
      </Button>
    ),
  },
];

export default ErpDetailSample;
