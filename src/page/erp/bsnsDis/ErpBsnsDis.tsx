//  LIB
import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import Section from "@components/common/Section";
import SearchBsns from "@components/search/SearchBsns";
import Table from "@components/table/Table";
import {
  IcoBtnDownload,
  IcoBtnDelete,
  IcoBtnEditor,
} from "@components/common/Btn";
//  Form & Column
import { columnBsnsInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpBsnsDis = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    type: "bsnsName",
    text: "",
    areaCode: "",
    bsnsType: ["total"],
  });
  const column = useMemo(() => columnBsnsInfo, []);

  const searchHandler = () => {};

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    let sample = [];
    console.log("search start");

    for (let i = 0; i < 10; i++) {
      sample.push({
        id: "test",
        bsnsName: "종로상권",
        bsnsCode: "12314515",
        bsnsStatus: "상권1",
        bsnsAddr: "경기도 김포시 풍무로 69번길 51",
        linkStore: "",
      });
    }
    setTableData(sample);
    setTotalPage(sample.length);
  }, [initVal, curPage]);

  return (
    <Flex w="100%" flexDirection="column" gap="0.5rem">
      <Section p="1rem 0.75rem 1.125rem" flex="none">
        <Flex pl="0.8125rem" align="flex-end" gap="0.25rem">
          <Heading as={"h3"} variant="outlet">
            상권
          </Heading>
          <Text variant="outlet">Bsns</Text>
        </Flex>
        <Divider m="0.5rem 0 1rem" color="font.title" />
        <SearchBsns initVal={initVal} setValues={setTableData} />
      </Section>
      <Table
        data={tableData}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getPage={setCurPage}
        getSelectData={setSelectData}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          align="center"
          gap="1.5rem"
        >
          <Button
            variant="upload"
            h="1.4rem"
            fontSize="xs"
            onClick={() => {
              navigate("/erp/bsns/detail");
            }}
          >
            상권레이어 설정
          </Button>
          <IcoBtnEditor
            onClick={() => {
              navigate("/maps");
            }}
          />
          <IcoBtnDownload
            onClick={() => exportFileCSV(selectData, columnBsnsInfo, "상권")}
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

export default ErpBsnsDis;
