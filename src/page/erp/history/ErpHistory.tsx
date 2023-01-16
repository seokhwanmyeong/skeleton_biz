//  LIB
import { useMemo, useRef, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalHistoryEditor from "@components/modal/erp/ModalHistoryEditor";
//  Form & Column
import { formSearchHistory } from "@page/erp/history/form";
import { mainTable } from "@page/erp/history/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";

type TypeHistory = any;

const ErpHistory = (props: TypeHistory) => {
  const refreshTable = useRef<any>();
  const [selectData, setSelectData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchHistory.initVal,
      form: formSearchHistory,
    }),
    []
  );

  const BtnGroup = (props: any) => {
    const removeStoreHandler = () => {
      console.log(selectData);
      setSelectData([]);
      refreshTable?.current && refreshTable?.current?.focus();
    };

    return (
      <Flex gap={2}>
        <ModalHistoryEditor update={false} />
        <Button
          variant="reverse"
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          히스토리 삭제
        </Button>
      </Flex>
    );
  };

  return (
    <ApiTable
      api={erpStoreApi.getData}
      initReq={initReq}
      form={form}
      columns={column}
      actviePage={true}
      emptyData={{ text: "No Contents" }}
      getSelectData={setSelectData}
    >
      <BtnGroup />
    </ApiTable>
  );
};

export default ErpHistory;
