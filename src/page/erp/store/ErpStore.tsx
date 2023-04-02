//  LIB
import { useMemo, useState, useEffect } from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchStore from "@components/search/SearchStore";
import Table from "@components/table/Table";
import {
  IcoBtnDownload,
  IcoBtnDelete,
  IcoBtnEditor,
} from "@components/common/Btn";
//  Form & Column
import { columnStoreInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";
import { useNavigate } from "react-router-dom";

const ErpStore = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    type: "total",
    text: "",
    areaCode: "",
    storeType: ["total"],
    storeRank: ["total"],
    openDate: "total",
  });
  const column = useMemo(() => columnStoreInfo, []);

  const searchHandler = (values: any) => {
    console.log(values);
    // setValues(values);
    setInitVal({ ...values, page: curPage });
  };

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    if (tableData.length === 0) {
      searchHandler({ ...initVal, page: curPage });
    }
  }, []);

  useEffect(() => {
    let sample = [];
    console.log("search start");

    for (let i = 0; i < 200; i++) {
      sample.push({
        id: "test",
        storeName: "종로종로",
        storeCode: "12314515",
        storeStatus: "입점",
        storeRank: "B",
        ownerName: "홍길동",
        openDate: "2022-88-88",
        addr: "경기도 김포시 풍무로 69번길 51",
      });
    }
    setTableData(sample);
    setTotalPage(sample.length);
  }, [initVal, curPage]);

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1rem 0.75rem 1.125rem" flex="none">
        <Flex pl="0.8125rem" align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            매장
          </Heading>
          <Text variant="outlet">Store</Text>
        </Flex>
        <Divider m="0.5rem 0 1rem" color="font.title" />
        <SearchStore
          initVal={{ ...initVal, page: curPage }}
          setValues={searchHandler}
        />
      </Section>
      <Table
        data={tableData.slice(
          Math.floor(curPage / 10),
          Math.floor(curPage / 10) + 10
        )}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getPage={setCurPage}
        getSelectData={setSelectData}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <IcoBtnEditor onClick={() => navigate("/erp/store/create")} />
          <IcoBtnDownload
            onClick={() =>
              exportFileCSV(selectData, columnStoreInfo, "매장리스트")
            }
            isDisabled={selectData.length > 0 ? false : true}
          />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpStore;
