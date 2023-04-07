//  LIB
import { useMemo, useState, useEffect } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchStore from "@components/search/SearchStore";
import Table from "@components/table/Table";
import { IcoBtnDownload, IcoBtnDelete } from "@components/common/Btn";
//  Form & Column
import { columnStoreInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpSmart = () => {
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
      <Section p="1.25rem 0.75rem 1rem" flex="none">
        <Heading as={"h3"} variant="outlet">
          공지사항
        </Heading>
        <Divider m="1rem 0 1.25rem" color="font.title" />
        <SearchStore
          initVal={{ ...initVal, page: curPage }}
          setValues={searchHandler}
        />
      </Section>
      <Section p="0.625rem 0rem 1rem" h="100%">
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
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
        />
      </Section>
    </Flex>
  );
};

export default ErpSmart;
