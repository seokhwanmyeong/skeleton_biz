//  LIB
import { Fragment, useRef, useMemo, useState, memo } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import Search from "@components/search/Search";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpBranch = () => {
  const navigate = useNavigate();
  const refreshTable = useRef<any>();
  const [selectData, setSelectData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  const onRowClickHandler = (row: any) => {
    navigate("/erp/store/detail", { state: { ...row.original } });
  };

  const BtnGroup = (props: any) => {
    const removeStoreHandler = () => {
      console.log(selectData);
      setSelectData([]);
      refreshTable?.current && refreshTable?.current?.focus();
    };

    const exportFileHandler = () => {
      exportFileCSV(selectData, mainTable, "매장리스트");
    };

    return (
      <Flex gap={2}>
        <ModalStoreEditor update={false} />
        <Button
          onClick={exportFileHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          매장삭제
        </Button>
      </Flex>
    );
  };

  return (
    <Fragment>
      <Heading variant="outlet">매장</Heading>
      <Search />
      <ApiTable
        api={erpStoreApi.getData}
        initReq={initReq}
        form={form}
        columns={column}
        caption="BaseApiTable"
        actviePage={true}
        emptyData={{ text: "No Contents" }}
        getSelectData={setSelectData}
        onDoubleClick={onRowClickHandler}
        ref={refreshTable}
      >
        <BtnGroup />
      </ApiTable>
    </Fragment>
  );
};

export default ErpBranch;
