//  LIB
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "@src/components/table/cutomCell/CustomModalCell";
//  Type
import { BaseColumns, Sample } from "@util/type/tableType";

const BaseTableSet: ColumnDef<any>[] = [
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
    enableSorting: true,
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "gender",
    header: "성별",
    cell: (info) => info.getValue(),
  },
  {
    header: "상세보기",
    cell: (info) => CustomModalCell({ ...info }),
  },
];

const LineTableSet = [
  { Header: "날짜", accessor: "date" as const, colSpan: 2 },
  { Header: "매출총액", accessor: "total" as const },
  { Header: "구역", accessor: "blockCode" as const },
  {
    Header: "성별",
    columns: [
      { Header: "남자", accessor: "average.gender.man" as const },
      { Header: "여자", accessor: "average.gender.woman" as const },
    ],
  },
  {
    Header: "나이대",
    columns: [
      { Header: "10대", accessor: "average.age.10th" as const },
      { Header: "20대", accessor: "average.age.20th" as const },
      { Header: "30대", accessor: "average.age.30th" as const },
      { Header: "40대", accessor: "average.age.40th" as const },
      { Header: "50대", accessor: "average.age.50th" as const },
      { Header: "60대 이상", accessor: "average.age.60th" as const },
    ],
  },
  {
    Header: "수정",
    accessor: "detail" as const,
    Cell: (props: any) => CustomModalCell({ ...props }),
  },
];

const erp01TableSetting = () => {
  const tableOption = [
    {
      title: "날짜",
      key: "date",
    },
    {
      title: "이름",
      key: "name",
    },
    {
      title: "나이",
      key: "age",
    },
  ];

  const sortState = [
    {
      id: "date",
      desc: true,
    },
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
      enableSorting: true,
    },
    {
      accessorKey: "address",
      header: "주소",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "gender",
      header: "성별",
      cell: (info) => info.getValue(),
    },
    {
      header: "상세보기",
      cell: (info) => CustomModalCell({ ...info }),
    },
  ];

  return {
    tableOption: tableOption,
    baseColumn: columns,
    initialSort: sortState,
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

export { BaseTableSet, LineTableSet, erp01TableSetting, baseTableSetting };
