//  LIB
import { Fragment, useRef, useMemo, useState, memo } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalClientEditor from "@components/modal/erp/ModalClientEditor";
//  Form & Column
import { formSearchClient } from "@page/erp/client/form";
import { mainTable } from "@page/erp/client/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpClient = () => {
  const refreshTable = useRef<any>();
  const [selectData, setSelectData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchClient.initVal,
      form: formSearchClient,
    }),
    []
  );

  const BtnGroup = (props: any) => {
    const removeStoreHandler = () => {
      console.log(selectData);
      setSelectData([]);
      refreshTable?.current && refreshTable?.current?.focus();
    };

    const exportFileHandler = () => {
      exportFileCSV(selectData, mainTable, "고객리스트");
    };

    return (
      <Flex gap={2}>
        <ModalClientEditor update={false} />
        <Button
          variant="reverse"
          onClick={() => exportFileHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          variant="reverse"
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          고객삭제
        </Button>
      </Flex>
    );
  };

  return (
    <Fragment>
      <Heading variant="outlet">고객</Heading>
      <ApiTable
        api={erpStoreApi.getData}
        initReq={initReq}
        form={form}
        columns={column}
        caption="BaseApiTable"
        actviePage={true}
        emptyData={{ text: "No Contents" }}
        getSelectData={setSelectData}
        ref={refreshTable}
      >
        <BtnGroup />
      </ApiTable>
    </Fragment>
  );
};

export default ErpClient;
