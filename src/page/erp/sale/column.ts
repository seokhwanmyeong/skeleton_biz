//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "@components/table/cutomCell/CustomModalCell";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => {
      console.log(info);
      return info.getValue();
    },
  },
  {
    accessorKey: "name",
    header: "매장명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "code",
    header: "매장코드",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "open_date",
    header: "개업일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saleAvg",
    header: "기간 평균 매출",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saleSum",
    header: "기간 누적 매출",
    cell: (info) => info.getValue(),
  },
  {
    header: "매장상세",
    cell: (info) => CustomModalCell(info.row.original),
  },
];
