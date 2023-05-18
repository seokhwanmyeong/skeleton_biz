//  LIB
import { useMemo, useState, useEffect } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchHistory from "@components/search/SearchHistory";
import Table from "@components/table/Table";
//  Form & Column
import { columnHistoryModal } from "@components/table/column/erp";
import ModalHistoryEditor from "@components/modal/map/ModalHistoryEditor";
import Divider from "@src/components/common/Divider";
import { erpHistoryApi } from "@api/bizSub/config";
import { BtnEditor } from "@components/common/Btn";

const ElementHistory = ({
  id,
  title,
  category,
}: {
  id: string | number;
  title?: string;
  category: "store" | "unsold" | "customer";
}) => {
  const { getHistoryList } = erpHistoryApi;
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      ...values,
      category: category,
      categoryId: id,
      pageNo: curPage,
      perPage: 10,
    };

    getHistoryList(filter).then((res): any => {
      console.log(res);
      return;
      if (res.totalCount) {
        setTotalPage(res.totalCount);
      }
      if (res.records && res.records.lenght > 0) {
        setTableData([...res.records]);
      }
    });

    setInitVal(values);
  };

  const refresh = () => {
    getHistoryList({
      ...initVal,
      category: category,
      categoryId: id,
      pageNo: 1,
      perPage: 10,
    }).then((res) => {
      console.log(res);
      return;
      if (res.totalCount) {
        setTotalPage(res.totalCount);
      }
      if (res.records && res.records.lenght > 0) {
        setTableData([...res.records]);
      }
    });
  };

  useEffect(() => {
    const filter = {
      ...initVal,
      category: category,
      categoryId: id,
      pageNo: curPage,
      perPage: 10,
    };

    getHistoryList(filter).then((res): any => {
      console.log(res);
      return;
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
      getHistoryList({
        ...initVal,
        category: category,
        categoryId: id,
        pageNo: 1,
        perPage: 10,
      }).then((res): any => {
        console.log(res);
        return;
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
        <BtnEditor
          onClick={onOpen}
          text="히스토리 추가하기"
          variant="search"
          lineHeight="-1px"
        />
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
      <ModalHistoryEditor
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fixMode={true}
        refresh={refresh}
      />
    </Flex>
  );
};

export default ElementHistory;
