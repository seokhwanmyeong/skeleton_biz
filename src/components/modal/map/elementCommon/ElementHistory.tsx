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
  const [curPage, setCurPage] = useState<number>(0);
  const [initVal, setInitVal] = useState<any>({
    brandCode: "3",
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
      if (res.data && res.data.length > 0) {
        setTableData(res.data);
        setTotalPage(res.data.length);
      }
    });

    setInitVal(values);
  };

  const refresh = () => {
    getHistoryList({
      ...initVal,
      category: category,
      categoryId: id,
      pageNo: curPage,
      perPage: 10,
    }).then((res) => {
      console.log(res);
      if (res.data && res.data.length > 0) {
        setTableData(res.data);
        setTotalPage(res.data.length);
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
      if (res.data && res.data.length > 0) {
        setTableData(res.data);
        setTotalPage(res.data.length);
      }
    });
  }, [curPage]);

  useEffect(() => {
    if (id) {
      getHistoryList({
        ...initVal,
        category: category,
        categoryId: id,
        pageNo: curPage,
        perPage: 10,
      }).then((res): any => {
        // if (res.totalCount) {
        //   setTotalPage(res.totalCount);
        // }

        if (res.data && res.data.length > 0) {
          setTableData(res.data);
          setTotalPage(res.data.length);
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
        page={curPage + 1}
        getPage={setCurPage}
        getSelectData={setSelectData}
        trH="10%"
        tdH="10%"
      />
      <ModalHistoryEditor
        id={id}
        category={category}
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
