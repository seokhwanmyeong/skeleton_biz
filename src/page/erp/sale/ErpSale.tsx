//  LIB
import { Fragment, useMemo, useState, useRef } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalSaleEditor from "@components/modal/erp/ModalSaleEditor";
//  Form & Column
import { formSearchSale } from "@page/erp/sale/form";
import { mainTable } from "@page/erp/sale/column";
//  Api & URL
import { erpSaleApi } from "@api/bizApi/config";
//  Util
import { exportFileCSV } from "@util/file/manageFile";

const ErpSale = () => {
  const [selectData, setSelectData] = useState([]);
  const refreshTable = useRef<any>();
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchSale.initVal,
      form: formSearchSale,
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
        <ModalSaleEditor />
        <Button
          variant="reverse"
          onClick={() => exportFileCSV(selectData, mainTable, "매출리스트")}
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          variant="reverse"
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          매출삭제
        </Button>
      </Flex>
    );
  };

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
        activeSummary={true}
        emptyData={{ text: "No Contents" }}
        getSelectData={setSelectData}
        ref={refreshTable}
      >
        <BtnGroup />
      </ApiTable>
    </Fragment>
  );
};

export default ErpSale;
