//  LIB
import { useState, useMemo } from "react";
import { Flex, Heading } from "@chakra-ui/react";
//  Components
import TestTable from "@src/components/table/TestTable";
import { CheckBoxTag } from "@src/components/common/CheckBox";
//  Util
import { baseTableSetting } from "@util/data/erpTableData";
//  Type
import { Sample } from "@util/type/tableType";

const ErpBaseTable = () => {
  const [option, setOption] = useState("");

  const tableSetting = useMemo(() => {
    const { tableOption, baseColumn } = baseTableSetting();

    return { tableOption, baseColumn };
  }, []);

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
          man: 2500000,
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
          man: 2500000,
          woman: 2400000,
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
      {tableSetting.tableOption.map((item: { title: string; key: string }) => {
        const { title, key } = item;

        return (
          <CheckBoxTag
            isChecked={option === key}
            key={key}
            value={key}
            title={title}
            onChange={() => setOption(key)}
          />
        );
      })}
      <TestTable columns={tableSetting.baseColumn} data={sampleData} />
    </Flex>
  );
};

export default ErpBaseTable;
