//  LIB
import { Fragment, useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import ModalXlsxController from "@components/modal/erp/ModalXlsxController";
//  Form & Column
import { formSearchSale } from "@page/erp/sale/form";
import { mainTable } from "@page/erp/sale/column";
//  Api & URL
import { erpSaleApi } from "@api/bizApi/config";
//  Util
import { exportFileCSV } from "@util/file/manageFile";
import { csvStoreSale } from "@util/data/fileCSV";

const ErpSale = () => {
  const [apiData, setApiData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchSale.initVal,
      form: formSearchSale,
    }),
    []
  );

  return (
    <Fragment>
      <Heading variant="outlet">매출</Heading>
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
          <ModalXlsxController csvInfo={csvStoreSale} />
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

export default ErpSale;
