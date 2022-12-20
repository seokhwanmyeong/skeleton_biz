//  LIB
import { useState, useMemo } from "react";
import { Flex, Heading } from "@chakra-ui/react";
//  Components
import BaseTable from "@src/components/table/BaseTable";
//  Util
import { baseTableSetting, Sample } from "@util/data/erpTableData";

const ErpBaseTable = () => {
  const { tableOption, baseColumn, initialSort } = useMemo(
    () => baseTableSetting(),
    []
  );

  const sampleData: Sample[] = useMemo(
    () => [
      {
        date: "2022.12.01",
        name: "a",
        age: 24,
        gender: "man",
        benefit: 3500000,
        average: {
          man: 2500000,
          woman: 2400000,
        },
      },
      {
        date: "2022.12.01",
        name: "b",
        age: 21,
        gender: "man",
        benefit: 3000000,
        average: {
          man: 2200000,
          woman: 2400000,
        },
      },
      {
        date: "2022.12.02",
        name: "c",
        age: 22,
        gender: "man",
        benefit: 5000000,
        average: {
          man: 2100000,
          woman: 2200000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
      {
        date: "2022.12.02",
        name: "d",
        age: 25,
        gender: "woman",
        benefit: 400000,
        average: {
          man: 2200000,
          woman: 2000000,
        },
      },
    ],
    []
  );

  return (
    <Flex flexDirection="column">
      <Heading>DashBoard</Heading>
      <BaseTable
        actviePage={true}
        registersPerPage={10}
        columns={baseColumn}
        data={sampleData}
        tableOption={tableOption}
        initialSort={initialSort}
      />
    </Flex>
  );
};

export default ErpBaseTable;
