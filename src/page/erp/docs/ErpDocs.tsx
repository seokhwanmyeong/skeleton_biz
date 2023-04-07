//  LIB
import { useMemo, useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchDocs from "@components/search/SearchDocs";
import Table from "@components/table/Table";
//  Form & Column
import { columnDocs } from "@components/table/column/erp";
import { BtnDelete } from "@components/common/Btn";
import ModalDoxs from "@components/modal/erp/ModalDoxs";
import Divider from "@components/common/Divider";

const ErpDocs = ({ id, title }: { id: string | number; title?: string }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [samplePageData, setSample] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    text: "",
  });
  const column = useMemo(() => columnDocs, []);

  const searchHandler = (values: any) => {
    console.log(values);
    // setValues(values);
    setInitVal({ ...values, page: curPage });
  };

  const removeDocsHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    console.log("search start");
    let sample = [];

    for (let i = 0; i < 10; i++) {
      sample.push({
        id: i,
        title: `문서${i}`,
        file: ["testsetdsgtstsetestsdsdsdfsssffffff"],
        createdAt: "2022.12.28",
      });
    }
    setTableData(sample);
    setTotalPage(sample.length);
  }, [initVal, curPage]);

  useEffect(() => {
    if (tableData) {
      setSample(
        tableData.slice(Math.floor(curPage / 10), Math.floor(curPage / 10) + 10)
      );
    }
  }, []);

  useEffect(() => {
    if (tableData) {
      setSample(
        tableData.slice(Math.floor(curPage / 10), Math.floor(curPage / 10) + 10)
      );
    }
  }, [curPage]);

  return (
    <Flex w="100%" h="100%" flexDirection="column">
      <Flex mb="1rem" p="0rem 1.65625rem 0rem" w="100%" direction="column">
        {title && (
          <Flex
            position="relative"
            mb="0.875rem"
            w="100%"
            justify="center"
            align="center"
            direction="column"
          >
            <Heading as="h3" mb="2rem" variant="detailTitle">
              {title}
            </Heading>
          </Flex>
        )}
        <SearchDocs initVal={initVal} setValues={setTableData} />
      </Flex>
      <Flex pl="0.875rem" justify="space-between">
        <Flex align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            검색 결과
          </Heading>
          <Text variant="outlet">Result</Text>
        </Flex>
        <Flex gap="0.5rem">
          <ModalDoxs />
          <BtnDelete
            onClick={removeDocsHandler}
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
        flowHeight={false}
      />
    </Flex>
  );
};

export default ErpDocs;
