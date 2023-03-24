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
  columnHelper.accessor((row: any) => row["storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 140,
  }),
  columnHelper.accessor((row: any) => row["storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["storeStatus"], {
    id: "storeStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["storeRank"], {
    id: "storeRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["ownerName"], {
    id: "ownerName",
    header: "대표자명",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["openDate"], {
    id: "openDate",
    header: "개업일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["addr"], {
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
    size: 50,
  }),
  columnHelper.accessor((row: any) => row["StoreInfo.storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 80,
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
  // columnHelper.accessor((row: any) => row["Sales.avg"], {
  //   id: "avg",
  //   header: "평균매출",
  //   cell: (info) => info.getValue(),
  //   enableResizing: false,
  //   size: 100,
  // }),
  columnHelper.accessor((row: any) => row["Sales.avgM"], {
    id: "avgM",
    header: "평균월매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["Sales.avgD"], {
    id: "avgD",
    header: "평균일매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
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

const columnBsnsInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 50,
  }),
  columnHelper.accessor((row: any) => row["bsnsName"], {
    id: "bsnsName",
    header: "상권명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["bsnsCode"], {
    id: "bsnsCode",
    header: "상권코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["bsnsStatus"], {
    id: "bsnsStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["linkStore"], {
    id: "linkStore",
    header: "연동매장명",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["bsnsAddress"], {
    id: "bsnsAddress",
    header: "주소",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "상세보기",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/maps"}
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
  columnHelper.accessor((row: any) => row["rentName"], {
    id: "rentName",
    header: "매물명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["rentCode"], {
    id: "rentCode",
    header: "매물코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["rentRank"], {
    id: "rentRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["addr"], {
    id: "addr",
    header: "주소",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    minSize: 180,
  }),
  columnHelper.accessor((row: any) => row["openDate"], {
    id: "openDate",
    header: "등록일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["rentFee"], {
    id: "rentFee",
    header: "임대료",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["reCharge"], {
    id: "reCharge",
    header: "보증금",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["rightFee"], {
    id: "rightFee",
    header: "권리금",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "매물상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/rent/detail"}
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

const columnClientInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["clientName"], {
    id: "clientName",
    header: "고객명(전화번호)",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["clientStatus"], {
    id: "clientStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["clientPath"], {
    id: "clientPath",
    header: "유입경로",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["addr"], {
    id: "addr",
    header: "희망지역",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    minSize: 180,
  }),
  columnHelper.accessor((row: any) => row["openDate"], {
    id: "openDate",
    header: "등록일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.display({
    header: "고객상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/client/detail"}
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

const columnHistory = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["type"], {
    id: "type",
    header: "구분",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["title"], {
    id: "title",
    header: "제목",
    cell: (info) => info.getValue(),
    minSize: 160,
  }),
  columnHelper.accessor((row: any) => row["createdAt"], {
    id: "createdAt",
    header: "작성일",
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["writer"], {
    id: "writer",
    header: "작성자",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["img"], {
    id: "img",
    header: "사진첨부",
    cell: (info) => (info.getValue().length > 0 ? "Y" : "N"),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.display({
    header: "상세보기",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp"}
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

const columnStoreSale = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 140,
  }),
  columnHelper.accessor((row: any) => row["storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["storeStatus"], {
    id: "storeStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
];

export {
  columnStoreInfo,
  columnSaleInfo,
  columnBsnsInfo,
  columnRentInfo,
  columnClientInfo,
  columnHistory,
};
