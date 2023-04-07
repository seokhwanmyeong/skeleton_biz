//  LIB
import { useEffect, useMemo, useState } from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchClient from "@components/search/SearchClient";
import Table from "@components/table/Table";
import { IcoBtnDelete, BtnEditor } from "@components/common/Btn";
//  Form & Column
import { columnClientInfo } from "@components/table/column/erp";
//  Util & Data
import { useNavigate } from "react-router-dom";

const ErpClient = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initVal } = useMemo(
    () => ({
      initVal: {
        type: "clientName",
        text: "",
        areaCode: "",
        clientStatus: ["total"],
        clientPath: ["total"],
        registDate: "total",
      },
      column: columnClientInfo,
    }),
    []
  );

  const searchHandler = () => {};

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  useEffect(() => {
    let sample = [];
    console.log("search start");

    for (let i = 0; i < 10; i++) {
      sample.push({
        id: String(i),
        clientName: "김양일",
        clientPhone: "(010-0000-0000)",
        clientStatus: "상담중",
        clientPath: "상담중",
        hopeArea: "서울 특별시 용산구 동자동",
        createdAt: "2023-03-30",
        manager: "김양일",
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
            고객
          </Heading>
          <Text variant="outlet">Client</Text>
        </Flex>
        <Divider m="0.5rem 0 1rem" color="font.title" />
        <SearchClient initVal={initVal} setValues={setTableData} />
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
          gap="1.5rem"
        >
          <BtnEditor onClick={() => navigate("/erp/client/create")} />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpClient;
