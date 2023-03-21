//  LIB
import { useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
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
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initQ, totalQ, form } = useMemo(
    () => ({
      column: columnStoreInfo,
      initQ: queryStoreList.initQ,
      totalQ: queryStoreList.totalQ,
      form: formSearchStore,
    }),
    []
  );

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  return (
    <Flex flexDirection="column" gap="0.5rem">
      <Section>
        <Heading variant="outlet">매장</Heading>
        <Search
          initQ={initQ}
          totalQ={totalQ}
          page={curPage}
          setTotal={setTotalPage}
          setQueryData={setTableData}
        />
      </Section>
      <Section>
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
        <TableCube
          actviePage={true}
          data={tableData}
          columns={column}
          totalReg={totalPage}
          page={curPage}
          getSelectData={setSelectData}
          getPage={setCurPage}
        />
      </Section>
    </Flex>
  );
};

export default ErpStore;
