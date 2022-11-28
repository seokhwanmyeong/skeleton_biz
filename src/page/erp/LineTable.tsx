//  Lib
import { useState } from "react";
import { Button } from "@chakra-ui/react";
//  Components
import Table from "@src/components/table/Table";
//  Data
import { LineTableSet } from "@util/data/erpTableData";

type Props = {};

const ErpLine = (props: Props) => {
  const [page, setPage] = useState(1);
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
      isDirectApi={false}
      variant="striped"
      caption="Test TABLE"
      totalRegisters={testData.length}
      page={page}
      columns={LineTableSet}
      data={testData}
      onPageChange={(page) => setPage(page)}
      emptyData={{ text: "No Contents" }}
    />
  );
};

export default ErpLine;
