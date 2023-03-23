import { useEffect, useMemo } from "react";
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
  const selectedData = getSelectedRowModel().rows;

  useEffect(() => {
    getSelectData &&
      getSelectData(selectedData.map((list: any) => list._valuesCache));
  }, [selectedData]);

  return (
    <Flex h="inherit" flexDirection="column" gap={10} overflow="hidden">
      <Box
        w="100%"
        h="inherit"
        overflow="scroll"
        __css={{
          "::-webkit-scrollbar": {
            w: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "5",
            bg: `font.primary`,
          },
        }}
      >
        <ChakraTable h="inherit" variant={variant} aria-label={caption}>
          <Thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <Tr key={`thead-${headerGroup.id}`}>
                  {activeCheck && (
                    <Th key={"thead-th-chk-total"}>
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
                        minW={canResize ? `${size / 10}rem` : ""}
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
                      onClick={(e) => e.stopPropagation()}
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
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        selectRowData: selectRowData,
                      })}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </ChakraTable>
      </Box>
      {actviePage && data.length !== 0 && (
        <Pagination
          {...pagenation}
          totalPage={totalPage}
          divideNum={divide}
          onPageChange={(e) => {
            console.log("Pagination onPageChange", e);
            getPage && getPage(e);
          }}
          variant={pageVariant}
        />
      )}
    </Flex>
  );
};

export default Table;
