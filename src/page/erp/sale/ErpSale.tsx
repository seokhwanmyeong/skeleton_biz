//  LIB
import { useMemo, useState, useEffect } from "react";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchSale from "@components/search/SearchSale";
import Table from "@components/table/Table";
import ModalSaleEditor from "@components/modal/erp/ModalSaleEditor";
import { IcoBtnDownload, IcoBtnDelete } from "@components/common/Btn";
//  Form & Column
import { columnSaleInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";
import { IcoHome, IcoWon } from "@src/assets/icons/icon";

const ErpSale = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    type: "avgM",
    rangeAmount: {
      start: 0,
      end: 0,
    },
    areaCode: "",
    storeRank: ["total"],
    rangeDate: "total",
  });
  const column = useMemo(() => columnSaleInfo, []);

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

    for (let i = 0; i < 10; i++) {
      sample.push({
        id: String(i),
        storeName: "종로종로",
        storeCode: "12314515",
        storeRank: "B",
        openDate: "2022-88-88",
        avgM: "3000000",
        avgD: "100000",
        sum: "9000000",
      });
    }
    setTableData(sample);
    setTotalPage(sample.length);
  }, [initVal, curPage]);

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1.25rem 0.75rem 1rem" flex="none">
        <Heading as={"h3"} variant="outlet">
          매출
        </Heading>
        <Divider m="1rem 0 1.25rem" color="font.title" />
        <SearchSale initVal={initVal} setValues={setTableData} />
      </Section>
      <Section
        p="1.25rem 4.6875rem 1rem"
        flex="none"
        justify="space-between"
        direction="row"
      >
        <Flex direction="column">
          <Flex mb="0.5rem" align="center" gap="0.5rem">
            <Box w="6px" h="6px" borderRadius="100px" bgColor="#FF4D4F"></Box>
            <Heading as={"h4"} variant="cardTitle">
              매장수
            </Heading>
          </Flex>
          <Flex pl="0.825rem" align="center" gap="0.5rem">
            <IcoHome w="1.5rem" h="1.5rem" position="relative" top="-1px" />
            <Text variant="cardContent">540</Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex mb="0.5rem" align="center" gap="0.5rem">
            <Box w="6px" h="6px" borderRadius="100px" bgColor="#FF4D4F"></Box>
            <Heading as={"h4"} variant="cardTitle">
              평균 월매출 (KRW)
            </Heading>
          </Flex>
          <Flex pl="0.825rem" align="center" gap="0.5rem">
            <IcoWon />
            <Text variant="cardContent">112,893.00</Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex mb="0.5rem" align="center" gap="0.5rem">
            <Box w="6px" h="6px" borderRadius="100px" bgColor="#FF4D4F"></Box>
            <Heading as={"h4"} variant="cardTitle">
              평균 DLF매출 (KRW)
            </Heading>
          </Flex>
          <Flex pl="0.825rem" align="center" gap="0.5rem">
            <IcoWon />
            <Text variant="cardContent">112,893.00</Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex mb="0.5rem" align="center" gap="0.5rem">
            <Box w="6px" h="6px" borderRadius="100px" bgColor="#FF4D4F"></Box>
            <Heading as={"h4"} variant="cardTitle">
              평균 누적 매출 (KRW)
            </Heading>
          </Flex>
          <Flex pl="0.825rem" align="center" gap="0.5rem">
            <IcoWon />
            <Text variant="cardContent">112,893.00</Text>
          </Flex>
        </Flex>
      </Section>
      <Table
        data={tableData}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getSelectData={setSelectData}
        getPage={setCurPage}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalSaleEditor />
          <IcoBtnDownload
            onClick={() =>
              exportFileCSV(selectData, columnSaleInfo, "매출리스트")
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

export default ErpSale;
