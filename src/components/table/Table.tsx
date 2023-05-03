import { useEffect, useMemo, useRef } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Flex,
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
//  Components
import NoContent from "@components/table/NoContent";
import Pagination from "@components/table/Pagination";
import { TableCheckBox } from "@components/common/CheckBox";
import Section from "@components/common/Section";
//  Custom Hook
import { usePagination } from "@hook/usePagination";

type PropsTable = {
  caption?: string;
  activeCheck?: boolean;
  actviePage?: boolean;
  totalPage?: number;
  page?: number;
  registersPerPage?: number;
  divide?: number;
  data?: any[];
  columns: ColumnDef<any>[];
  emptyData?: { text: string };
  variant?: string;
  pageVariant?: string;
  getSelectData?: React.Dispatch<any>;
  selectRowData?: any;
  getPage?: React.Dispatch<React.SetStateAction<number>>;
  children?: any;
  flowHeight?: boolean;
  height?: any;
  tdH?: any;
};

const Table = ({
  caption = "table",
  activeCheck = true,
  actviePage = true,
  totalPage = 10,
  page = 1,
  registersPerPage = 10,
  divide = 10,
  data = [],
  columns,
  emptyData = { text: "No Contents" },
  variant = "simple",
  pageVariant,
  getSelectData,
  selectRowData,
  getPage,
  children,
  flowHeight = true,
  height,
  tdH,
}: PropsTable) => {
  const pagenation = useMemo(() => {
    return usePagination({
      isDirectApi: false,
      totalRegisters: totalPage,
      divide: divide,
      page: page,
      registersPerPage,
    });
  }, [page, data, totalPage]);
  const {
    reset,
    getHeaderGroups,
    getRowModel,
    getFooterGroups,
    getSelectedRowModel,
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
    getToggleAllRowsSelectedHandler,
  } = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugAll: false,
    debugHeaders: false,
    debugTable: false,
  });
  const pagingRef = useRef<any>(undefined);
  const selectedData = getSelectedRowModel().rows;
  const pagingH = pagingRef?.current?.clientHeight || 0;

  useEffect(() => {
    getSelectData &&
      getSelectData(selectedData.map((list: any) => list._valuesCache));
  }, [selectedData]);
  console.log("table render");
  return (
    <>
      {/* <Section
        p="0rem 0rem 1.25rem"
        h={{
          pc: height
            ? height
            : flowHeight
            ? pagingH
              ? `calc(100% - ${pagingH}px - 11rem)`
              : "100%"
            : "100%",
          tablet: "auto",
          mobile: "auto",
        }}
        gap="1.25rem"
        overflow={{ pc: "hidden", tablet: "visible", mobile: "visible" }}
      > */}
      <Flex
        w="100%"
        h={{
          pc: "100%",
          tablet: "auto",
          mobile: "auto",
        }}
        flex="1"
        gap="0.75rem"
        borderRadius="inherit"
        overflowX={{ pc: "hidden", tablet: "auto", mobile: "auto" }}
        overflowY={{ pc: "auto", tablet: "visible", mobile: "visible" }}
        __css={{
          "::-webkit-scrollbar": {
            w: "0px",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "5",
            bg: `#ededed`,
          },
          "::-webkit-scrollbar-track-piece:end": {
            bg: "transparent",
            mb: "1rem",
          },
          "::-webkit-scrollbar-track-piece:start": {
            bg: "transparent",
            mt: "3rem",
          },
        }}
      >
        <ChakraTable h="inherit" variant={variant} aria-label={caption}>
          <Thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <Tr key={`thead-${headerGroup.id}`}>
                  {activeCheck && (
                    <Th key={"thead-th-chk-total"} w="5rem">
                      <TableCheckBox
                        checked={getIsAllRowsSelected()}
                        indeterminate={getIsSomeRowsSelected()}
                        onChange={getToggleAllRowsSelectedHandler()}
                      />
                    </Th>
                  )}
                  {headerGroup.headers.map((header) => {
                    const size = header.getSize();
                    const canResize = header.column.getCanResize();
                    let children;
                    let rowSpan = 1;

                    if (
                      header.depth > 1 &&
                      header.column.parent === undefined
                    ) {
                      return null;
                    } else if (header.isPlaceholder) {
                      if (header.subHeaders) {
                        const newHead = header.subHeaders[0];

                        children = flexRender(
                          newHead.column.columnDef.header,
                          newHead.getContext()
                        );

                        rowSpan = 2;
                      } else {
                        children = null;
                      }
                    } else {
                      children = flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      );
                    }

                    return (
                      <Th
                        key={`thead-th-${header.id}`}
                        rowSpan={rowSpan}
                        colSpan={header.subHeaders.length || 1}
                        minW={canResize ? `${size / 10}rem` : "0"}
                        w={canResize ? "auto" : `${size / 10}rem`}
                      >
                        {children}
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody>
            {data.length === 0 ? (
              <Tr key="table-no-content">
                <Td
                  colSpan={
                    (activeCheck && getHeaderGroups().at(-1)?.headers.length
                      ? (getHeaderGroups().at(-1)?.headers.length || 0) + 1
                      : getHeaderGroups().at(-1)?.headers.length) || 1
                  }
                  sx={{
                    border: "none!important",
                  }}
                >
                  <NoContent
                    {...emptyData}
                    text={emptyData?.text ?? "No Contents"}
                  />
                </Td>
              </Tr>
            ) : (
              getRowModel().rows.map((row, rowIdx) => (
                <Tr key={row.id}>
                  {activeCheck && (
                    <Td
                      key={`table-td-chk-${rowIdx + 1}`}
                      onClick={(e: any) => e.stopPropagation()}
                    >
                      <TableCheckBox
                        checked={row.getIsSelected()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                      />
                    </Td>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      <Flex
                        h={tdH || "auto"}
                        minH={tdH || "2.5rem"}
                        justify="center"
                        align="center"
                      >
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                        })}
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </ChakraTable>
      </Flex>
      {actviePage && data.length !== 0 && (
        <Pagination
          ref={pagingRef}
          totalPage={totalPage}
          divideNum={divide}
          onPageChange={(e) => {
            console.log("Pagination onPageChange", e);
            getPage && getPage(e);
          }}
          variant={pageVariant}
          {...pagenation}
        />
      )}
    </>
  );
};

export default Table;
