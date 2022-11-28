//  Lib
import { useState } from "react";
import { Button } from "@chakra-ui/react";
//  Components
import Table from "@src/components/table/Table";
//  Data
import { BaseTableSet } from "@util/data/erpTableData";

type Props = {};

const ErpBase = (props: Props) => {
  const [page, setPage] = useState(1);
  const testData = [
    {
      date: "2022-11-21",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-22",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-23",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      info: "man",
    },
  ];

  const TestCustom = (props: any) => {
    return (
      <Button
        onClick={() => {
          console.log(props.data);
        }}
      >
        button: {props.dataIdx}
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
      columns={BaseTableSet}
      data={testData}
      onPageChange={(page) => setPage(page)}
      emptyData={{ text: "No Contents" }}
    />
  );
};

export default ErpBase;
