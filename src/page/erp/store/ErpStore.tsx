//  LIB
import { useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import Search from "@components/search/Search";
import TableCube from "@components/table/TableCube";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { columnStoreInfo } from "@components/table/column/erp";
//  Api & URL
import { queryStoreList } from "@src/api/cubeApi/query";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpStore = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initQ, form } = useMemo(
    () => ({
      column: columnStoreInfo,
      initQ: queryStoreList.initQ,
      form: formSearchStore,
    }),
    []
  );

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  console.log(tableData);

  return (
    <Flex flexDirection="column" gap="3rem" overflow="hidden">
      <Heading variant="outlet">매장</Heading>
      <Search initQ={initQ} setQueryData={setTableData} />
      <Flex gap={2}>
        <ModalStoreEditor update={false} />
        <Button
          variant="reverse"
          onClick={() =>
            exportFileCSV(selectData, columnStoreInfo, "매장리스트")
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
          매장삭제
        </Button>
      </Flex>
      <TableCube
        actviePage={true}
        data={tableData}
        columns={column}
        getSelectData={setSelectData}
        getPage={setCurPage}
      />
    </Flex>
  );
};

export default ErpStore;
