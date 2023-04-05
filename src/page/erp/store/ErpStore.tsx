//  Lib
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchStore from "@components/search/SearchStore";
import Table from "@components/table/Table";
import { BtnEditor, BtnDownload, BtnDelete } from "@components/common/Btn";
import Divider from "@components/common/Divider";
//  Form & Column
import { columnStoreInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpStore = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [sampleData, setSampleData] = useState<any[]>([]);
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
    const current = sampleData.slice(
      Math.floor(curPage / 10),
      Math.floor(curPage / 10) + 10
    );
    setTableData(current);
  }, [initVal, curPage]);

  useEffect(() => {
    let sample = [];

    for (let i = 0; i < 100; i++) {
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
    setSampleData(sample);
    setTotalPage(sample.length);
  }, []);

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1rem 0.625rem 0.6875rem" flex="none">
        <Flex pl="0.875rem" align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            매장
          </Heading>
          <Text variant="outlet">Store</Text>
        </Flex>
        <Divider
          m="0.4375rem 0 0.8125rem"
          color="font.title"
          borderBottomWidth="2px"
        />
        <SearchStore
          initVal={{ ...initVal, page: curPage }}
          setValues={searchHandler}
        />
      </Section>
      <Section p="0.4375rem 0.625rem 0.875rem">
        <Flex pl="0.875rem" justify="space-between">
          <Flex align="flex-end" gap="0.25rem">
            <Heading as={"h3"} variant="outlet">
              검색 결과
            </Heading>
            <Text variant="outlet">Result</Text>
          </Flex>
          <Flex gap="0.5rem">
            <BtnEditor
              text="매장 추가하기"
              onClick={() => navigate("/erp/store/create")}
            />
            <BtnDownload
              onClick={() =>
                exportFileCSV(selectData, columnStoreInfo, "매장리스트")
              }
              isDisabled={selectData.length > 0 ? false : true}
            />
            <BtnDelete
              onClick={removeStoreHandler}
              isDisabled={selectData.length > 0 ? false : true}
            />
          </Flex>
        </Flex>
        <Divider m="0.4375rem 0 0" />
        <Table
          data={tableData}
          actviePage={true}
          divide={5}
          columns={column}
          totalPage={totalPage}
          page={curPage}
          getPage={setCurPage}
          getSelectData={setSelectData}
        />
      </Section>
    </Flex>
  );
};

export default ErpStore;
