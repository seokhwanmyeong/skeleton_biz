//  LIB
import { useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  TableCaption,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Button,
} from "@chakra-ui/react";

const TestTable = (props: any) => {
  const { columns, data } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugAll: false,
    debugHeaders: false,
    debugTable: false,
  });

  useEffect(() => {
    console.log(sorting);
  }, [sorting]);

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%" overflow="auto">
      <ChakraTable>
        <TableCaption>test</TableCaption>
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
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {children}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
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
          ))}
        </Tfoot>
      </ChakraTable>
    </Box>
  );
};

export default TestTable;
