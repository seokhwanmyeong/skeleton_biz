//  LIB
import { Fragment, useMemo, useState, useRef } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import Search from "@components/search/Search";
import TableCube from "@components/table/TableCube";
import ModalSaleEditor from "@components/modal/erp/ModalSaleEditor";
//  Form & Column
import { columnSaleInfo } from "@components/table/column/erp";
//  Api & URL
import { querySaleList } from "@src/api/cubeApi/query";
//  Util
import { exportFileCSV } from "@util/file/manageFile";

const ErpSale = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initQ, totalQ } = useMemo(
    () => ({
      column: columnSaleInfo,
      initQ: querySaleList.initQ,
      totalQ: querySaleList.totalQ,
      // form: formSearchStore,
    }),
    []
  );
  const removeStoreHandler = () => {
    setSelectData([]);
  };
  console.log(tableData);

  return (
    <Flex flexDirection="column" gap="3rem" overflow="hidden">
      <Heading variant="outlet">매출</Heading>
      <Search
        initQ={initQ}
        totalQ={totalQ}
        page={curPage}
        setTotal={setTotalPage}
        setQueryData={setTableData}
      />
      <Flex gap={2}>
        <ModalSaleEditor />
        <Button
          variant="reverse"
          onClick={() =>
            exportFileCSV(selectData, columnSaleInfo, "매출리스트")
          }
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          variant="reverse"
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          매출삭제
        </Button>
      </Flex>
      <TableCube
        actviePage={true}
        data={tableData}
        columns={column}
        totalReg={totalPage}
        page={curPage}
        getSelectData={setSelectData}
        getPage={setCurPage}
      />
    </Flex>
  );
};

export default ErpSale;
