//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "@page/erp/store/CustomCell";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index + 1,
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
    accessorKey: "rank",
    header: "타입",
    cell: (info) => info.renderValue(),
  },
  {
    accessorKey: "openDate",
    header: "개업일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saleAvgM",
    header: "평균월매출",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saleAvgD",
    header: "평균일매출",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "saleSum",
    header: "누적매출",
    cell: (info) => info.getValue(),
  },
  {
    header: "매장상세",
    cell: (info) => CustomModalCell(info.row.original),
  },
];
