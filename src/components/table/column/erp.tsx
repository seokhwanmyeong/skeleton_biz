//  Lib
import { Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

const columnStoreInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 140,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeStatus"], {
    id: "storeStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeRank"], {
    id: "storeRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.ownerName"], {
    id: "ownerName",
    header: "대표자명",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.openDate"], {
    id: "openDate",
    header: "개업일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.addr"], {
    id: "addr",
    header: "주소",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    minSize: 200,
  }),
  columnHelper.display({
    header: "매장상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/store/detail"}
        state={info.row.original}
        data-text={"상세보기"}
      >
        상세보기
      </Button>
    ),
    enableResizing: false,
    size: 100,
  }),
];

const columnSaleInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 140,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeRank"], {
    id: "storeRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.openDate"], {
    id: "openDate",
    header: "개업일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["Sales.avg"], {
    id: "avg",
    header: "평균매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  // columnHelper.accessor((row: any) => row["Sales.avgD"], {
  //   id: "avgD",
  //   header: "평균일매출",
  //   cell: (info) => info.getValue(),
  //   enableResizing: false,
  //   size: 100,
  // }),
  // columnHelper.accessor((row: any) => row["Sales.avgM"], {
  //   id: "avgM",
  //   header: "평균월매출",
  //   cell: (info) => info.getValue(),
  //   enableResizing: false,
  //   size: 100,
  // }),
  columnHelper.accessor((row: any) => row["Sales.sum"], {
    id: "sum",
    header: "누적매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "매출상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/store/detail"}
        state={info.row.original}
        data-text={"상세보기"}
      >
        상세보기
      </Button>
    ),
    enableResizing: false,
    size: 100,
  }),
];

const columnRentInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["Rent.storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 140,
  }),
  columnHelper.accessor((row: any) => row["Rent.storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["Rent.storeStatus"], {
    id: "storeStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["Rent.storeRank"], {
    id: "storeRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["Rent.addr"], {
    id: "addr",
    header: "주소",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    minSize: 200,
  }),
  columnHelper.accessor((row: any) => row["Rent.openDate"], {
    id: "openDate",
    header: "개업일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "매장상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/store/detail"}
        state={info.row.original}
        data-text={"상세보기"}
      >
        상세보기
      </Button>
    ),
    enableResizing: false,
    size: 100,
  }),
  // {
  //   accessorKey: "owner_name",
  //   header: "대표자명",
  //   cell: (info) => info.getValue(),
  // },
  // {
  //   accessorKey: "created_at",
  //   header: "등록일",
  //   cell: (info) => info.getValue(),
  // },
];

export { columnStoreInfo, columnSaleInfo, columnRentInfo };
