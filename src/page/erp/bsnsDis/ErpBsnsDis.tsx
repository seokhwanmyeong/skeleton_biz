//  LIB
import { useMemo, useState } from "react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
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
  const { column, initVal } = useMemo(
    () => ({
      initVal: {
        type: "bsnsName",
        text: "",
        areaCode: "",
        bsnsType: ["total"],
      },
      column: columnBsnsInfo,
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
          상권
        </Heading>
        <Divider m="1rem 0 1.25rem" color="font.title" />
        <SearchBsns initVal={initVal} setValues={setTableData} />
      </Section>
      <Section p="0.625rem 0rem 1rem" h="100%">
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          align="center"
          gap="1.5rem"
        >
          <Button
            variant={"upload"}
            onClick={() => {
              navigate("/bsns/detail");
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

export default ErpBsnsDis;
