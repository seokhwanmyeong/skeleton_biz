//  LIB
import { useMemo, useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchHistory from "@components/search/SearchHistory";
import Table from "@components/table/Table";
//  Form & Column
import { columnHistoryModal } from "@components/table/column/erp";
import ModalHistoryEditor from "@src/components/modal/erp/ModalHistoryEditor";
import Divider from "@src/components/common/Divider";
import { erpHistoryApi } from "@src/api/biz/config";

const ElementHistory = ({
  id,
  title,
}: {
  id: string | number;
  title?: string;
}) => {
  const { getHistoryStoreLi, getHistoryStoreDetail, createHistoryStore } =
    erpHistoryApi;
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [initVal, setInitVal] = useState<any>({
    historyType: "total",
    searchType: "title",
    text: "",
  });
  const column = useMemo(() => columnHistoryModal, []);

  const searchHandler = (values: any) => {
    console.log(values);
    const filter = {
      erpCode: id,
      pageNo: curPage,
      perPage: 10,
      ...values,
    };

    getHistoryStoreLi(filter).then((res): any => {
      console.log(res);
      if (res.totalCount) {
        setTotalPage(res.totalCount);
      }

      if (res.records && res.records.lenght > 0) {
        setTableData([...res.records]);
      }
    });

    setInitVal(values);
  };

  useEffect(() => {
    const filter = {
      erpCode: id,
      pageNo: curPage,
      perPage: 10,
      ...initVal,
    };

    getHistoryStoreLi(filter).then((res): any => {
      console.log(res);
      if (res.totalCount) {
        setTotalPage(res.totalCount);
      }

      if (res.records && res.records.lenght > 0) {
        setTableData([...res.records]);
      }
    });
  }, [curPage]);

  useEffect(() => {
    if (id) {
      getHistoryStoreLi({
        ...initVal,
        erpCode: id,
        pageNo: 1,
        perPage: 10,
      }).then((res): any => {
        console.log(res);
        if (res.totalCount) {
          setTotalPage(res.totalCount);
        }

        if (res.records && res.records.lenght > 0) {
          setTableData([...res.records]);
        }
      });
    }
  }, []);

  return (
    <Flex w="100%" h="75vh" flexDirection="column">
      <Flex w="100%" gap="0.5rem">
        <SearchHistory
          width="78%"
          initVal={initVal}
          setValues={setInitVal}
          onClick={searchHandler}
        />
        <ModalHistoryEditor />
      </Flex>
      <Divider m="1rem 0 0.75rem" />
      <Table
        data={tableData}
        actviePage={true}
        activeCheck={false}
        divide={5}
        registersPerPage={10}
        columns={column}
        totalPage={totalPage}
        page={curPage}
        getPage={setCurPage}
        getSelectData={setSelectData}
        tdH="1.5rem"
      />
    </Flex>
  );
};

export default ElementHistory;
