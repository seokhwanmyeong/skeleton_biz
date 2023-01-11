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

const ErpBrand = () => {
  const [apiData, setApiData] = useState([]);
  const { column } = useMemo(
    () => ({
      column: mainTable,
    }),
    []
  );

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Flex gap={2}>
          <ModalBrandStandEditor update={false} />
        </Flex>
        <BaseTable
          columns={column}
          caption="매출기준 리스트"
          actviePage={false}
          emptyData={{ text: "No Contents" }}
        />
      </Flex>
      <Flex flexDirection="column">
        <Flex gap={2}>
          <ModalBrandStandEditor update={false} />
        </Flex>
        <BaseTable
          columns={column}
          caption="입지기준 리스트"
          actviePage={false}
          emptyData={{ text: "No Contents" }}
        />
      </Flex>
    </Flex>
  );
};

export default ErpBrand;
