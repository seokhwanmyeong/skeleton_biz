//  LIB
import { Fragment, useMemo, useState, useRef } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { Link as RoutLink } from "react-router-dom";
//  Components
import ApiTable from "@components/table/ApiTable";
//  Form & Column
import { formSearchBsnsDis } from "@src/page/erp/bsnsDis/form";
import { mainTable } from "@src/page/erp/bsnsDis/column";
//  Api & URL
import { erpSaleApi } from "@api/bizApi/config";
//  Util
import { exportFileCSV } from "@util/file/manageFile";

const ErpBsnsDis = () => {
  const [selectData, setSelectData] = useState([]);
  const refreshTable = useRef<any>();
  const { column, initReq, form } = useMemo(
    () => ({
      column: mainTable,
      initReq: formSearchBsnsDis.initVal,
      form: formSearchBsnsDis,
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
        <Button as={RoutLink} to={"/maps"} data-text={"등록하기"}>
          등록하기
        </Button>
        <Button
          onClick={() => exportFileCSV(selectData, mainTable, "상권리스트")}
          isDisabled={selectData.length > 0 ? false : true}
        >
          다운로드
        </Button>
        <Button
          onClick={removeStoreHandler}
          isDisabled={selectData.length > 0 ? false : true}
        >
          상권삭제
        </Button>
      </Flex>
    );
  };

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
        getSelectData={setSelectData}
        ref={refreshTable}
      >
        <BtnGroup />
      </ApiTable>
    </Fragment>
  );
};

export default ErpBsnsDis;
