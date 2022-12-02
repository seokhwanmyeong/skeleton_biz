//  LIB
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "@src/components/table/cutomCell/CustomModalCell";
//  Type
import { BaseColumns, Sample } from "@util/type/tableType";

const BaseTableSet: BaseColumns = [
  { Header: "날짜", accessor: "date" as const },
  { Header: "이름", accessor: "name" as const },
  { Header: "나이", accessor: "age" as const },
  { Header: "주소", accessor: "address" as const },
  { Header: "성별", accessor: "gender" as const },
  {
    Header: "상세보기",
    accessor: "detail" as const,
    Cell: (props: any) => CustomModalCell({ ...props }),
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

const baseTableSetting = () => {
  const columnHelper = createColumnHelper<Sample>();

  const tableOption = [
    {
      title: "매출순위",
      key: "benefit",
    },
    {
      title: "남성 매출 순위",
      key: "average.man",
    },
    {
      title: "여성 매출 순위",
      key: "average.woman",
    },
  ];

  const columns = [
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
      id: "averageGender",
      header: "성별평균",
      columns: [
        columnHelper.accessor("average.man", {
          header: "남자",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("average.woman", {
          header: "여자",
          cell: (info) => info.getValue(),
        }),
      ],
    }),
  ];

  const columntest: ColumnDef<any>[] = [
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
          accessorKey: "average.man",
          header: "남자",
          cell: (info) => info.renderValue(),
        },
        {
          accessorKey: "average.woman",
          header: "여자",
          cell: (info) => info.renderValue(),
        },
      ],
    },
  ];

  return {
    tableOption: tableOption,
    baseColumn: columntest,
  };
};

export { BaseTableSet, LineTableSet, baseTableSetting };
