//  LIB
import { useEffect, useMemo, useState } from "react";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchRent from "@components/search/SearchRent";
import Table from "@components/table/Table";
import ModalRentEditor from "@components/modal/erp/ModalRentEditor";
import {
  IcoBtnDownload,
  IcoBtnDelete,
  BtnEditor,
} from "@components/common/Btn";
//  Form & Column
import { columnRentInfo } from "@components/table/column/erp";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";
import { useNavigate } from "react-router-dom";

const ErpRent = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    type: "rentName",
    text: "",
    areaCode: "",
    rentRank: ["total"],
    openDate: "total",
  });
  const column = useMemo(() => columnRentInfo, []);

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
        rentName: "종로매물",
        rentCode: "12314515",
        rentRank: "rankA",
        addr: "서울특별시 용산구 동자동 366 트윈시티",
        openDate: "2023-03-01",
        rentFee: 1000000,
        reCharge: 10000000,
        rightFee: 10000000,
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
            매물
          </Heading>
          <Text variant="outlet">Rent</Text>
        </Flex>
        <Divider m="0.5rem 0 1rem" color="font.title" />
        <SearchRent initVal={initVal} setValues={setTableData} />
      </Section>
      <Table
        data={tableData}
        actviePage={true}
        divide={5}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getSelectData={setSelectData}
        getPage={setCurPage}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalRentEditor update={false} />
          <BtnEditor
            onClick={() => {
              navigate("/erp/rent/create");
            }}
          />
          <IcoBtnDownload
            onClick={() =>
              exportFileCSV(selectData, columnRentInfo, "매물리스트")
            }
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

export default ErpRent;
