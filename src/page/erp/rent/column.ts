//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import CustomModalCell from "./CustomCell";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "rentName",
    header: "매물명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "rentCode",
    header: "매물코드",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "rentRank",
    header: "타입",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "rentalFee",
    header: "임대료",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "deposit",
    header: "보증금",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "premium",
    header: "권리금",
    cell: (info) => info.getValue(),
  },
  {
    header: "매물상세",
    cell: (info) => CustomModalCell(info.row.original),
  },
];
