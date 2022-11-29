//  Components
import BaseTable from "@components/table/BaseTable";
//  Data
import { BaseTableSet } from "@util/data/erpTableData";

const ErpBase = () => {
  const testData = [
    {
      date: "2022-11-21",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-22",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-23",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
    {
      date: "2022-11-24",
      name: "test",
      age: 123,
      address: "testsetsetsetsetsetsetsetstsetset",
      gender: "man",
    },
  ];

  return (
    <>
      <BaseTable
        actviePage={true}
        caption="BaseTable"
        totalRegisters={testData.length}
        columns={BaseTableSet}
        data={testData}
        emptyData={{ text: "No Contents" }}
        variant="striped"
      />
    </>
  );
};

export default ErpBase;
