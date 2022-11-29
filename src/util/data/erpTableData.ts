import { BaseTable } from "@util/type/tableType";
import CustomModalCell from "@src/components/table/cutomCell/CustomModalCell";

const BaseTableSet: BaseTable = [
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

const LineTableSet: BaseTable = [
  { Header: "날짜", accessor: "date" as const },
  { Header: "이름", accessor: "title" as const },
  { Header: "나이", accessor: "writer" as const },
  { Header: "수정", accessor: "detail" as const },
];

export { BaseTableSet, LineTableSet };
