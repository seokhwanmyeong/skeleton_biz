// //  LIB
// import { Fragment, useRef, useMemo, useState, memo } from "react";
// import { Flex, Heading, Button } from "@chakra-ui/react";
// //  Components
// import ApiTable from "@components/table/ApiTable";
// import ModalRentEditor from "@components/modal/erp/ModalRentEditor";
// //  Form & Column
// import { formSearchRent } from "@page/erp/rent/form";
// import { mainTable } from "@page/erp/rent/column";
// //  Api & URL
// import { erpStoreApi } from "@api/bizApi/config";
// //  Util & Data
// import { exportFileCSV } from "@util/file/manageFile";

// const ErpRent = () => {
//   const refreshTable = useRef<any>();
//   const [selectData, setSelectData] = useState([]);
//   const { column, initReq, form } = useMemo(
//     () => ({
//       column: mainTable,
//       initReq: formSearchRent.initVal,
//       form: formSearchRent,
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
//         <ModalRentEditor update={false} />
//         <Button
//           onClick={() => exportFileCSV(selectData, mainTable, "매물리스트")}
//           isDisabled={selectData.length > 0 ? false : true}
//         >
//           다운로드
//         </Button>
//         <Button
//           onClick={removeStoreHandler}
//           isDisabled={selectData.length > 0 ? false : true}
//         >
//           매물삭제
//         </Button>
//       </Flex>
//     );
//   };

//   return (
//     <Fragment>
//       <Heading variant="outlet">매물</Heading>
//       <ApiTable
//         api={erpStoreApi.getData}
//         initReq={initReq}
//         form={form}
//         columns={column}
//         caption="BaseApiTable"
//         actviePage={true}
//         emptyData={{ text: "No Contents" }}
//         getSelectData={setSelectData}
//         ref={refreshTable}
//       >
//         <BtnGroup />
//       </ApiTable>
//     </Fragment>
//   );
// };

//  LIB
import { useMemo, useState } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
//  Components
import Section from "@components/common/Section";
import SearchRent from "@components/search/SearchRent";
import Table from "@components/table/Table";
import ModalRentEditor from "@components/modal/erp/ModalRentEditor";
import {
  IcoBtnDownload,
  IcoBtnDelete,
  IcoBtnEditor,
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
  const { column, initVal } = useMemo(
    () => ({
      initVal: {
        type: "rentName",
        text: "",
        areaCode: "",
        rentRank: ["total"],
        openDate: "total",
      },
      column: columnRentInfo,
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
          매물
        </Heading>
        <Divider m="1rem 0 1.25rem" color="font.title" />
        <SearchRent initVal={initVal} setValues={setTableData} />
      </Section>
      <Section p="0.625rem 0rem 1rem" h="100%">
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <ModalRentEditor update={false} />
          <IcoBtnEditor
            onClick={() => {
              navigate("/rent/create");
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

export default ErpRent;
