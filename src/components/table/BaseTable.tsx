//  LIB
import { Fragment, useState } from "react";
import {
  TableCaption,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useTable } from "react-table";
//  Components
import NoContent from "@components/table/NoContent";
import Pagination from "@components/table/Pagination";
//  Custom Hook
import { usePagination } from "@hook/usePagination";
//  Type
import { TableProps } from "@util/type/tableType";

const BaseTable = ({
  actviePage = true,
  caption,
  totalRegisters,
  registersPerPage = 5,
  columns,
  data,
  emptyData,
  variant = "simple",
  colorScheme = "teal",
}: TableProps) => {
  const [page, setPage] = useState(1);
  const pagination = usePagination({
    isDirectApi: false,
    totalRegisters,
    page,
    items: data,
    registersPerPage,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pagination.pageItems });

  if (data.length === 0) {
    return <NoContent {...emptyData} text={emptyData?.text ?? "No Contents"} />;
  }

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%">
      <ChakraTable {...getTableProps()} variant={variant}>
        {caption && <TableCaption placement="top">{caption}</TableCaption>}
        <Thead>
          {headerGroups.map((headerGroup, idx) => {
            return (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={`thead-tr-${idx}`}
              >
                {headerGroup.headers.map((column: any) => (
                  <Fragment key={column.id}>
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  </Fragment>
                ))}
              </Tr>
            );
          })}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell, index) => (
                  <Fragment key={cell.column.id + index}>
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  </Fragment>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
      {actviePage && (
        <Flex w="100%" justifyContent="center">
          <Pagination
            {...pagination}
            colorScheme={colorScheme}
            onPageChange={setPage}
          />
        </Flex>
      )}
    </Box>
  );
};

export default BaseTable;
