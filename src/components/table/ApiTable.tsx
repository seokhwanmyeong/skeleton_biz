//  LIB
import { useEffect, useState, useMemo, Fragment } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Box,
  TableCaption,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
//  Component
import SearchBox from "@src/components/form/search/SearchBox";
import NoContent from "@components/table/NoContent";
import Pagination from "@components/table/Pagination";
import { CheckBoxTag } from "@src/components/common/CheckBox";
//  Custom Hook
import { usePagination } from "@hook/usePagination";
//  Api
import { getTestTable, postApi } from "@src/api/postApi";

const ApiTable = ({
  url,
  initialReq = {},
  reqType = {},
  resType = {},
  actviePage = true,
  caption,
  registersPerPage = 5,
  divide = 5,
  columns,
  emptyData,
  variant = "simple",
  pageVariant,
}: any) => {
  const [req, setReq] = useState({
    ...initialReq,
    page: 1,
    registersPerPage: registersPerPage,
  });
  const [data, setData] = useState<any[]>([]);
  const [totalReg, setTotalReg] = useState<number>(0);
  const pagenation = useMemo(() => {
    return usePagination({
      isDirectApi: true,
      totalRegisters: totalReg,
      divide: divide,
      page: req.page,
      items: data,
      registersPerPage,
    });
  }, [req, data]);

  const table = useReactTable({
    data: pagenation.pageItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugAll: false,
    debugHeaders: false,
    debugTable: false,
  });

  useEffect(() => {
    getTestTable(url, req, setData, setTotalReg);
  }, [req]);

  return (
    <Box>
      <SearchBox req={req} initialReq={initialReq} setReq={setReq} />
      <Box w="100%" overflow="auto">
        <ChakraTable variant={variant}>
          {caption && <TableCaption placement="top">{caption}</TableCaption>}
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  let children;
                  let rowSpan = 1;

                  if (header.depth > 1 && header.column.parent === undefined) {
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
                      key={header.id}
                      rowSpan={rowSpan}
                      colSpan={header.subHeaders.length || 1}
                    >
                      {children}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {data.length === 0 ? (
              <Tr>
                <Td
                  colSpan={table.getHeaderGroups().at(-1)?.headers.length || 1}
                >
                  <NoContent
                    {...emptyData}
                    text={emptyData?.text ?? "No Contents"}
                  />
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            )}
          </Tbody>
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </Th>
                  ))}
                </Tr>
              );
            })}
          </Tfoot>
        </ChakraTable>
      </Box>
      {actviePage && (
        <Pagination
          {...pagenation}
          onPageChange={(e) => {
            console.log("Pagination onPageChange", e);
            setReq({ ...req, page: e });
          }}
          variant={pageVariant}
        />
      )}
    </Box>
  );
};

export default ApiTable;
