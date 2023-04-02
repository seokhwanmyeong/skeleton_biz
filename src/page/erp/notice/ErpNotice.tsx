//  LIB
import { useMemo, useState, useEffect } from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchHistory from "@src/components/search/SearchHistory";
import Table from "@components/table/Table";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import { IcoBtnDownload, IcoBtnDelete } from "@components/common/Btn";
//  Form & Column
import { columnNotice } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpNotice = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    dataType: "total",
    searchType: "title",
    text: "",
  });
  const column = useMemo(() => columnNotice, []);

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

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1rem 0.75rem 1.125rem" flex="none">
        <Flex pl="0.8125rem" align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            공지사항
          </Heading>
          <Text variant="outlet">Notice</Text>
        </Flex>
        <Divider m="0.5rem 0 1rem" color="font.title" />
        <SearchHistory initVal={initVal} setValues={setTableData} />
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
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalStoreEditor update={false} />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpNotice;
