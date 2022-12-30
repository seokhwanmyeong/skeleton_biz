//  LIB
import { useState, useMemo } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
//  Components
import BaseTable from "@components/table/BaseTable";

type Sample = {
  date: string;
  name: string;
  age: number;
  gender: "man" | "woman";
  benefit: number;
  average: {
    man: number;
    woman: number;
  };
};

const baseTableSetting = () => {
  const columnHelper = createColumnHelper<Sample>();

  const tableOption = [
    {
      title: "매출순위",
      key: "benefit",
    },
    {
      title: "남성 매출 순위",
      key: "avgMan",
    },
    {
      title: "여성 매출 순위",
      key: "avgWoman",
    },
  ];

  const sortState = [
    {
      id: "benefit",
      desc: true,
    },
  ];

  const columntest = [
    columnHelper.accessor("date", {
      header: "날짜",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "이름",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
      header: "나이",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("gender", {
      header: "성별",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("benefit", {
      header: "매출액",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.group({
      header: "성별평균",
      columns: [
        columnHelper.accessor("average.man", {
          id: "avgMan",
          header: "남자",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("average.woman", {
          id: "avgWoman",
          header: "여자",
          cell: (info) => info.getValue(),
        }),
      ],
    }),
  ];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "날짜",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "이름",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "age",
      header: "나이",
      cell: (info) => info.renderValue(),
    },
    {
      accessorKey: "gender",
      header: "성별",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "benefit",
      header: "매출액",
      cell: (info) => info.renderValue(),
      enableSorting: true,
    },
    {
      id: "averageGender",
      header: "성별평균",
      columns: [
        {
          id: "avgMan",
          accessorKey: "average.man",
          header: "남자",
          cell: (info) => info.renderValue(),
        },
        {
          id: "avgWoman",
          accessorKey: "average.woman",
          header: "여자",
          cell: (info) => info.renderValue(),
        },
      ],
    },
  ];

  return {
    tableOption: tableOption,
    baseColumn: columns,
    initialSort: sortState,
  };
};

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
