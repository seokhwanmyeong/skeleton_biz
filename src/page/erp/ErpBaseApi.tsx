//  LIB
import { useMemo } from "react";
import { Flex, Heading } from "@chakra-ui/react";
//  Components
import ApiTable from "@src/components/table/ApiTable";
//  Util
import { BaseTableSet } from "@util/data/erpTableData";

const ErpBaseApi = () => {
  const columnSet = useMemo(() => BaseTableSet, []);

  return (
    <Flex flexDirection="column">
      <Heading>DashBoard</Heading>
      <ApiTable
        url="/rate"
        initialReq={{
          date: "",
          name: "",
          age: 0,
          address: "",
          gender: "woman",
        }}
        reqType={{}}
        resType={{}}
        caption="BaseApiTable"
        actviePage={true}
        registersPerPage={5}
        columns={columnSet}
        emptyData={{ text: "No Contents" }}
        // variant="striped"
      />
    </Flex>
  );
};

export default ErpBaseApi;
