//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "./CustomCell";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index,
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
    header: "매장타입",
    cell: (info) => info.renderValue(),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "owner_name",
    header: "대표자명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "open_date",
    header: "개업일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "등록일",
    cell: (info) => info.getValue(),
  },
  // {
  //   header: "매장상세",
  //   cell: (info) => CustomModalCell(info.row.original),
  // },
];
