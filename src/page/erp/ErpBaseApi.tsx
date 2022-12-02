//  LIB
import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
//  Components
import TestTable from "@src/components/table/TestTable";

const ErpBaseApi = () => {
  return (
    <Flex flexDirection="column">
      <Heading>DashBoard</Heading>
      <TestTable />
    </Flex>
  );
};

export default ErpBaseApi;
