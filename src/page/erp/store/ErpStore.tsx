//  LIB
import { useMemo, useState } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchStore from "@components/search/SearchStore";
import Table from "@components/table/Table";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import { IcoBtnDownload, IcoBtnDelete } from "@components/common/Btn";
//  Form & Column
import { columnStoreInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpStore = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initVal } = useMemo(
    () => ({
      initVal: {
        type: "total",
        text: "",
        areaCode: "",
        storeType: ["total"],
        storeRank: ["total"],
        openDate: "total",
      },
      column: columnStoreInfo,
    }),
    []
  );

  const searchHandler = () => {};

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1.25rem 0.75rem 1rem" flex="none">
        <Heading as={"h3"} variant="outlet">
          매장
        </Heading>
        <Divider m="1rem 0 1.25rem" color="font.title" />
        <SearchStore initVal={initVal} setValues={setTableData} />
      </Section>
      <Section p="0.625rem 0rem 1rem" h="100%">
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalStoreEditor update={false} />
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
        <Table
          data={tableData}
          actviePage={true}
          divide={5}
          columns={column}
          totalPage={totalPage}
          page={curPage}
          getSelectData={setSelectData}
          getPage={setCurPage}
        />
      </Section>
    </Flex>
  );
};

export default ErpStore;
