//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import { CustomCellLinkView, CustomCellLinkUpdate } from "./CustomCell";
import { Link } from "react-router-dom";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index,
  },
  {
    accessorKey: "title",
    header: "제목",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "represent",
    header: "대표설정",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "writer",
    header: "작성자",
    cell: (info) => info.getValue(),
  },
];
