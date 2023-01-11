//  LIB
import { Fragment, useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalAreaEditor from "@components/modal/erp/ModalAreaEditor";
//  Form & Column
import { formSearchArea } from "@page/erp/area/form";
import { mainTable } from "@page/erp/area/column";
//  Api & URL
import { erpSaleApi } from "@api/bizApi/config";
//  Util
import { exportFileCSV } from "@util/file/manageFile";

const ErpArea = () => {
  const [apiData, setApiData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchArea.initVal,
      form: formSearchArea,
    }),
    []
  );

  return (
    <Fragment>
      <Heading variant="outlet">상권</Heading>
      <ApiTable
        api={erpSaleApi.getData}
        initReq={initReq}
        form={form}
        columns={column}
        caption="BaseApiTable"
        actviePage={true}
        emptyData={{ text: "No Contents" }}
        getTableData={setApiData}
      >
        <Flex gap={2}>
          <ModalAreaEditor update={false} />
          <Button
            variant="reverse"
            onClick={() => exportFileCSV(apiData, mainTable, "매출리스트")}
            isDisabled={apiData.length > 0 ? false : true}
          >
            DownLoad Data
          </Button>
        </Flex>
      </ApiTable>
    </Fragment>
  );
};

export default ErpArea;
