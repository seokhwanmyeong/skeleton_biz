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
import { CheckBoxTag } from "@src/components/common/CheckBox";
import Pagination from "@components/table/Pagination";
import NoContent from "@components/table/NoContent";
//  Custom Hook
import { usePagination } from "@hook/usePagination";

const BaseTable = ({
  actviePage = true,
  caption,
  registersPerPage = 4,
  divide,
  columns,
  data = [],
  tableOption,
  initialSort,
  emptyData,
  variant = "simple",
  pageVariant,
}: any) => {
  const [tableData, setTableData] = useState<any>(data || []);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>(initialSort || []);

  const pagenation = useMemo(() => {
    return usePagination({
      isDirectApi: false,
      totalRegisters: data.length,
      divide: divide,
      page: page,
      items: data,
      registersPerPage,
    });
  }, [page]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugAll: false,
    debugHeaders: false,
    debugTable: false,
  });
  console.log(tableData);

  useEffect(() => {
    console.log(pagenation.pageItems);
    setTableData(pagenation.pageItems);
  }, [pagenation.pageItems]);

  return (
    <Box w="100%" h="100%" overflow="auto">
      {!tableOption
        ? null
        : tableOption.map((item: { title: string; key: string }) => {
            const { title, key } = item;

            return (
              <CheckBoxTag
                isChecked={sorting.length > 0 && sorting[0].id === key}
                key={key}
                value={key}
                title={title}
                onChange={() =>
                  setSorting(
                    sorting[0]?.id === key ? [] : [{ id: key, desc: true }]
                  )
                }
              />
            );
          })}
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
              <Td colSpan={table.getHeaderGroups().at(-1)?.headers.length || 1}>
                <NoContent
                  {...emptyData}
                  text={emptyData?.text ?? "No Contents"}
                />
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
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
      {actviePage && (
        <Pagination
          {...pagenation}
          onPageChange={setPage}
          variant={pageVariant}
        />
      )}
    </Box>
  );
};

export default BaseTable;
