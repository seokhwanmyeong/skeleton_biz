//  LIB
import { Fragment, useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//  Components
import ApiTable from "@components/table/ApiTable";
import ModalStoreEditor from "@components/modal/erp/ModalStoreEditor";
import ModalXlsxController from "@components/modal/erp/ModalXlsxController";
//  Form & Column
import { formSearchStore } from "@page/erp/store/form";
import { mainTable } from "@page/erp/store/column";
//  Api & URL
import { erpStoreApi } from "@api/bizApi/config";
//  Util & Data
import { exportFileCSV } from "@util/file/manageFile";
import { csvStoreInfo } from "@util/data/fileCSV";

const ErpBranch = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [slctList, setSlctList] = useState([]);
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

  const removeStoreHandler = (list: any) => {
    console.log(list);
  };

  return (
    <Fragment>
      <Heading variant="outlet">매장</Heading>
      <ApiTable
        api={erpStoreApi.getData}
        initReq={initReq}
        form={form}
        columns={column}
        caption="BaseApiTable"
        actviePage={true}
        emptyData={{ text: "No Contents" }}
        getTableData={setApiData}
        selectData={removeStoreHandler}
        onDoubleClick={onRowClickHandler}
      >
        <Flex gap={2}>
          <ModalStoreEditor update={false} />
          <ModalXlsxController csvInfo={csvStoreInfo} />
          <Button
            variant="reverse"
            onClick={() => exportFileCSV(apiData, mainTable, "매장리스트")}
            isDisabled={apiData.length > 0 ? false : true}
          >
            DownLoad Data
          </Button>
          <Button
            variant="reverse"
            onClick={() => removeStoreHandler(slctList)}
            isDisabled={slctList.length > 0 ? false : true}
          >
            매장삭제
          </Button>
        </Flex>
      </ApiTable>
    </Fragment>
  );
};

export default ErpBranch;
