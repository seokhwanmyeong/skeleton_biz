//  Lib
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import FormHistoryEditor from "@src/components/form/erp/FormHistoryEditor";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IcoBtnBsns,
  IcoBtnBsnsFix,
  IcoBtnClose,
  IcoBtnDownload,
  IcoBtnUpdate,
} from "@src/components/common/Btn";
import { useState } from "react";
//  Util
import { csvStoreSale } from "@util/data/fileCSV";
import { exportFormCsv } from "@util/file/manageFile";

const columnHelper = createColumnHelper();

const columnStoreInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 60,
  }),
  columnHelper.accessor((row: any) => row["storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["storeStatus"], {
    id: "storeStatus",
    header: "상태",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 60,
  }),
  columnHelper.accessor((row: any) => row["storeRank"], {
    id: "storeRank",
    header: "타입",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 60,
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
    size: 120,
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
  columnHelper.accessor((row: any) => row["storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["storeCode"], {
    id: "storeCode",
    header: "매장코드",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["storeRank"], {
    id: "storeRank",
    header: "타입",
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
  // columnHelper.accessor((row: any) => row["Sales.avg"], {
  //   id: "avg",
  //   header: "평균매출",
  //   cell: (info) => info.getValue(),
  //   enableResizing: false,
  //   size: 100,
  // }),
  columnHelper.accessor((row: any) => row["avgM"], {
    id: "avgM",
    header: "평균월매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["avgD"], {
    id: "avgD",
    header: "평균일매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["sum"], {
    id: "sum",
    header: "누적매출",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "매출상세",
    cell: (info: any) => {
      return (
        <Button
          variant="linkBtn"
          as={Link}
          to={"/erp/store/detail"}
          state={{ ...info.row.original, tabIdx: 1 }}
          data-text={"상세보기"}
        >
          상세보기
        </Button>
      );
    },
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
  columnHelper.accessor((row: any) => row["bsnsAddr"], {
    id: "bsnsAddr",
    header: "주소",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "마켓 데이터",
    cell: (info: any) => <IcoBtnBsns propsData={info} />,
    enableResizing: false,
    size: 100,
  }),
  columnHelper.display({
    header: "수정",
    cell: (info: any) => {
      const navigate = useNavigate();
      return (
        <IcoBtnUpdate
          onClick={() => {
            navigate("/maps");
          }}
        />
      );
    },
    enableResizing: false,
    size: 100,
  }),
];

const columnRentInfo = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["rentName"], {
    id: "rentName",
    header: "매물명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: false,
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
    minSize: 160,
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

const columnRentNear = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["storeName"], {
    id: "storeName",
    header: "매장명",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["addr"], {
    id: "addr",
    header: "주소",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.accessor((row: any) => row["distance"], {
    id: "distance",
    header: "거리",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
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
  columnHelper.accessor((row: any) => row["hopeArea"], {
    id: "hopeArea",
    header: "희망지역",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    enableResizing: true,
    minSize: 180,
  }),
  columnHelper.accessor((row: any) => row["createdAt"], {
    id: "createdAt",
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
    cell: (info: any) => {
      const { isOpen, onClose, onOpen } = useDisclosure();
      const [fixmode, setFixMode] = useState(false);
      const test = (val: any) => {
        console.log(val);
      };

      return (
        <>
          <Button variant="linkBtn" data-text={"상세보기"} onClick={onOpen}>
            상세보기
          </Button>
          {isOpen && (
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
              <DrawerOverlay />
              <DrawerContent maxW="fit-content">
                <DrawerBody pos="relative" p="0" width="18.5rem">
                  {fixmode && info?.row?.original.type !== "로그" && (
                    <IcoBtnClose
                      style={{
                        position: "absolute",
                        top: "0.2rem",
                        right: "2rem",
                        zIndex: 1,
                        w: "max-content",
                      }}
                      onClick={() => {
                        setFixMode(false);
                      }}
                    />
                  )}
                  {info?.row?.original.type !== "로그" && (
                    <IcoBtnUpdate
                      style={{
                        position: "absolute",
                        top: "0.2rem",
                        right: 0,
                        zIndex: 1,
                        w: "max-content",
                      }}
                      isActive={fixmode}
                      onClick={() => {
                        if (fixmode) {
                          console.log("submit");
                          setFixMode(false);
                          onClose();
                        } else {
                          setFixMode(true);
                        }
                      }}
                    />
                  )}
                  <FormHistoryEditor
                    fixMode={fixmode}
                    initVal={info.row.original}
                    setValues={test}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          )}
        </>
      );
    },
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

const columnDocs = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["title"], {
    id: "title",
    header: "문서",
    cell: (info) => info.getValue(),
    minSize: 200,
  }),
  columnHelper.display({
    header: "파일",
    cell: (info: any) => {
      return <IcoBtnDownload onClick={() => exportFormCsv(csvStoreSale)} />;
    },
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["createdAt"], {
    id: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
    size: 120,
  }),
];

const columnNotice = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 60,
  }),
  columnHelper.accessor((row: any) => row["title"], {
    id: "title",
    header: "제목",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 150,
  }),
  columnHelper.display({
    header: "첨부파일",
    cell: (info: any) => <IcoBtnDownload onClick={() => {}} />,
    enableResizing: false,
    size: 100,
  }),
  columnHelper.accessor((row: any) => row["manager"], {
    id: "manager",
    header: "담당자",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 80,
  }),
  columnHelper.accessor((row: any) => row["createdAt"], {
    id: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
];

const columnBrand = [
  columnHelper.display({
    header: "번호",
    cell: (info) => info.row.index + 1,
    enableResizing: false,
    size: 60,
  }),
  columnHelper.accessor((row: any) => row["title"], {
    id: "title",
    header: "제목",
    cell: (info) => <Text noOfLines={2}>{info.getValue()}</Text>,
    size: 150,
  }),
  columnHelper.accessor((row: any) => row["represent"], {
    id: "represent",
    header: "대표여부",
    cell: (info) => <Text noOfLines={2}>{info.getValue() ? "O" : "X"}</Text>,
    size: 150,
  }),
  columnHelper.accessor((row: any) => row["createdAt"], {
    id: "createdAt",
    header: "등록일",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 120,
  }),
  columnHelper.display({
    header: "브랜드상세",
    cell: (info: any) => (
      <Button
        variant="linkBtn"
        as={Link}
        to={"/erp/brand/detail"}
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

export {
  columnStoreInfo,
  columnSaleInfo,
  columnBsnsInfo,
  columnRentInfo,
  columnClientInfo,
  columnHistory,
  columnDocs,
  columnNotice,
  columnRentNear,
  columnBrand,
};
