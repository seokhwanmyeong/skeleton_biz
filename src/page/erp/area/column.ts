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
    accessorKey: "tradeAreaName",
    header: "상권명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tradeAreaCode",
    header: "상권코드",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tradeAreaState",
    header: "상태",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tradeAreaStore",
    header: "연동매장명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tradeAreaStore",
    header: "주소",
    cell: (info) => info.getValue(),
  },
  {
    header: "상권분석",
    cell: (info) => CustomCellLinkView(info),
  },
  {
    header: "수정",
    cell: (info) => CustomCellLinkUpdate(info),
  },
];
