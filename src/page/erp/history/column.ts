//  LIB
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

// const CustomModalCell = (info: any) => {
//   return (
//     <Button
//       variant={"reverse"}
//       as={Link}
//       to={"/erp/client/detail"}
//       state={info}
//       data-text={"상세보기"}
//     >
//       상세보기
//     </Button>
//   );
// };

export const mainTable: ColumnDef<any>[] = [
  {
    header: "번호",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "historyType",
    header: "구분",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "title",
    header: "제목",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "등록일",
    cell: (info) => info.renderValue(),
  },
  {
    accessorKey: "writer",
    header: "작성자",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "img",
    header: "이미지",
    cell: (info) => (info.getValue() && info.getValue().length > 0 ? "O" : "X"),
  },
  // {
  //   header: "상세보기",
  //   cell: (info) => CustomModalCell(info.row.original),
  // },
  // {
  //   header: "관리",
  //   cell: (info) => CustomModalCell(info.row.original),
  // },
];
