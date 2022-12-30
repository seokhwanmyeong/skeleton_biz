//  LIB
import { useMemo, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalStoreHandler from "./ModalStoreHandler";
import ModalStoreXlsx from "./ModalStoreXlsx";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util
import { exportFileCSV } from "@util/file/manageFile";

const ErpBranch = () => {
  const [apiData, setApiData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchStore.initVal,
      form: formSearchStore,
    }),
    []
  );

  return (
    <Flex flexDirection="column">
      <ApiTable
        api={erpStoreApi.getData}
        initReq={initReq}
        form={form}
        columns={column}
        caption="BaseApiTable"
        actviePage={true}
        emptyData={{ text: "No Contents" }}
        getTableData={setApiData}
      >
        <Flex gap={2}>
          <ModalStoreHandler update={false} />
          <ModalStoreXlsx />
          <Button
            variant="reverse"
            onClick={() => exportFileCSV(apiData, mainTable)}
            isDisabled={apiData.length > 0 ? false : true}
          >
            DownLoad Data
          </Button>
        </Flex>
      </ApiTable>
    </Flex>
  );
};

export default ErpBranch;
