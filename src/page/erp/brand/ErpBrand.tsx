//  LIB
import { useMemo, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
//  Components
import BaseTable from "@components/table/BaseTable";
import ModalBrandStandEditor from "@components/modal/erp/ModalBrandStandEditor";
//  Form & Column
import { mainTable } from "@page/erp/brand/column";
//  Api & URL
import { erpSaleApi } from "@api/bizApi/config";
import Table from "@src/components/table/Table";
import { columnBrand } from "@src/components/table/column/erp";
import { IcoBtnDelete, BtnEditor } from "@src/components/common/Btn";
import { useNavigate } from "react-router-dom";

const ErpBrand = () => {
  const navigate = useNavigate();
  const [selectData, setSelectData] = useState<any>([]);
  const [apiData, setApiData] = useState([]);
  const column = useMemo(() => columnBrand, []);

  const tableData = [
    { title: "브랜드묶음1", represent: true, createdAt: "2023-02-12" },
    { title: "브랜드묶음2", represent: false, createdAt: "2023-02-12" },
    { title: "브랜드묶음3", represent: false, createdAt: "2023-02-12" },
    { title: "브랜드묶음4", represent: false, createdAt: "2023-02-12" },
    { title: "브랜드묶음5", represent: false, createdAt: "2023-02-12" },
  ];

  const removeStoreHandler = () => {
    console.log("click");
  };

  return (
    <Flex flexDirection="column" w="100%" h="fit-content">
      <Table
        data={tableData}
        actviePage={false}
        divide={5}
        columns={column}
        getSelectData={setSelectData}
      >
        <Flex
          p="0rem 1.65625rem 0.5rem"
          w="100%"
          justify="flex-end"
          gap="1.5rem"
        >
          <BtnEditor onClick={() => navigate("/erp/brand/create")} />
          <IcoBtnDelete
            onClick={removeStoreHandler}
            isDisabled={selectData.length > 0 ? false : true}
          />
        </Flex>
      </Table>
    </Flex>
  );
};

export default ErpBrand;
