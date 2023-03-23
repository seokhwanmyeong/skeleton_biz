// //  LIB
// import { useMemo, useRef, useState } from "react";
// import { Button, Flex } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// //  Components
// import ApiTable from "@components/table/ApiTable";
// import ModalHistoryEditor from "@components/modal/erp/ModalHistoryEditor";
// //  Form & Column
// import { formSearchHistory } from "@page/erp/history/form";
// import { mainTable } from "@page/erp/history/column";
// //  Api & URL
// import { erpStoreApi } from "@api/bizApi/config";

// type TypeHistory = any;

// const ErpHistory = (props: TypeHistory) => {
//   const refreshTable = useRef<any>();
//   const [selectData, setSelectData] = useState([]);
//   const { column, initReq, form } = useMemo(
//     () => ({
//       column: mainTable,
//       initReq: formSearchHistory.initVal,
//       form: formSearchHistory,
//     }),
//     []
//   );

//   const BtnGroup = (props: any) => {
//     const removeStoreHandler = () => {
//       console.log(selectData);
//       setSelectData([]);
//       refreshTable?.current && refreshTable?.current?.focus();
//     };

//     return (
//       <Flex gap={2}>
//         <ModalHistoryEditor update={false} />
//         <Button
//           onClick={removeStoreHandler}
//           isDisabled={selectData.length > 0 ? false : true}
//         >
//           히스토리 삭제
//         </Button>
//       </Flex>
//     );
//   };

//   return (
//     <ApiTable
//       api={erpStoreApi.getData}
//       initReq={initReq}
//       form={form}
//       columns={column}
//       actviePage={true}
//       emptyData={{ text: "No Contents" }}
//       getSelectData={setSelectData}
//     >
//       <BtnGroup />
//     </ApiTable>
//   );
// };

//  LIB
import { useMemo, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import SearchHistory from "@components/search/SearchHistory";
import Table from "@components/table/Table";
//  Form & Column
import { columnHistory } from "@components/table/column/erp";

const ErpHistory = ({ id }: { id?: string | number }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const { column, initVal } = useMemo(
    () => ({
      initVal: {
        dataType: "total",
        searchType: "title",
        text: "",
      },
      column: columnHistory,
    }),
    []
  );

  const searchHandler = () => {};

  const removeStoreHandler = () => {
    setSelectData([]);
  };

  return (
    <Flex w="100%" h="100%" flexDirection="column" gap="0.5rem">
      <Flex p="0rem 1.65625rem 0.5rem" w="100%" justify="flex-end" gap="0.5rem">
        <SearchHistory initVal={initVal} setValues={setTableData} />
        <Button
          w="7rem"
          variant={"historyAdd"}
          onClick={() => {
            navigate("/bsns/detail");
          }}
        >
          히스토리 작성
        </Button>
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
    </Flex>
  );
};

export default ErpHistory;
