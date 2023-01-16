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
    accessorKey: "clientName",
    header: "고객명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "clientPhone",
    header: "고객연락처",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "clientStep",
    header: "고객 상태",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "path",
    header: "유입경로",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "memberName",
    header: "담당자",
    cell: (info) => info.getValue(),
  },
  {
    header: "고객상세",
    cell: (info) => CustomModalCell(info.row.original),
  },
];
