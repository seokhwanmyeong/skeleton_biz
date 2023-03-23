//  LIB
import { Fragment, useRef, useMemo, useState, memo } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalRentEditor from "@components/modal/erp/ModalRentEditor";
//  Form & Column
import { formSearchRent } from "@page/erp/rent/form";
import { mainTable } from "@page/erp/rent/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";

const ErpRent = () => {
  const refreshTable = useRef<any>();
  const [selectData, setSelectData] = useState([]);
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchRent.initVal,
      form: formSearchRent,
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
        <ModalRentEditor update={false} />
        <Button
          onClick={() => exportFileCSV(selectData, mainTable, "매물리스트")}
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          매물삭제
        </Button>
      </Flex>
    );
  };

  return (
    <Fragment>
      <Heading variant="outlet">매물</Heading>
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

export default ErpRent;
