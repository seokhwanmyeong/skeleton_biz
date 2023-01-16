//  LIB
import { ColumnDef } from "@tanstack/react-table";
//  Components
import {
  CustomCellLinkView,
  CustomCellLinkUpdate,
} from "@page/erp/bsnsDis/CustomCell";

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "bsnsDisName",
    header: "상권명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "bsnsDisCode",
    header: "상권코드",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "bsnsDisStatus",
    header: "상태",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "bsnsDisLink",
    header: "연동매장명",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
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
