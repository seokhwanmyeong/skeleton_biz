//  LIB
import { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
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
import NoContent from "@components/table/NoContent";

const BaseTable = ({
  title,
  columns,
  data = [],
  emptyData,
  variant = "simple",
}: any) => {
  const [tableData, setTableData] = useState<any>(data || []);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugAll: false,
    debugHeaders: false,
    debugTable: false,
  });

  return (
    <Box w="100%" h="100%">
      <ChakraTable variant={variant}>
        {title && <TableCaption placement="top">{title}</TableCaption>}
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
    </Box>
  );
};

export default BaseTable;
