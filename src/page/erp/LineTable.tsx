//  Lib
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
//  Components
import Table from "@src/components/table/Table";
//  Data
import { LineTableSet } from "@util/data/erpTableData";

type Props = {};

const ErpLine = (props: Props) => {
  const testData = [
    {
      date: "2022-11-22",
      title: "test",
      writer: "testsetsetsetsetsetsetsetstsetset",
    },
    {
      date: "2022-11-22",
      title: "test",
      writer: "testsetsetsetsetsetsetsetstsetset",
    },
    {
      date: "2022-11-22",
      title: "test",
      writer: "testsetsetsetsetsetsetsetstsetset",
    },
    {
      date: "2022-11-22",
      title: "test",
      writer: "testsetsetsetsetsetsetsetstsetset",
    },
  ];

  const TestCustom = (props: any) => {
    return (
      <Button
        onClick={() => {
          console.log(props.data);
        }}
      >
        수정 {props.dataIdx}
      </Button>
    );
  };

  return (
    <Table
      variant="striped"
      tableType="base"
      tableSet={LineTableSet}
      caption="ERP Line Table"
      data={testData}
      customCell={{
        detail: <TestCustom />,
      }}
    />
  );
};

export default ErpLine;
