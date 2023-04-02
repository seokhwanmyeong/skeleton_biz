//  LIB
import { useMemo, useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchDocs from "@components/search/SearchDocs";
import Table from "@components/table/Table";
//  Form & Column
import { columnDocs } from "@components/table/column/erp";
import { IcoBtnDelete } from "@components/common/Btn";
import ModalDoxs from "@src/components/modal/erp/ModalDoxs";

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

  const removeStoreHandler = () => {
    setSelectData([]);
  };
  console.log("test");
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
    <Flex w="100%" h="100%" flexDirection="column" gap="0.5rem">
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
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalDoxs />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpDocs;
