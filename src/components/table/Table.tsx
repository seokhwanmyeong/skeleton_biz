//  LIB
import { Fragment } from "react";
import {
  TableCaption,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  ThemeTypings,
} from "@chakra-ui/react";
import { Column, useTable } from "react-table";
//  Components
import { NoContentProps, NoContent } from "@components/table/NoContent";
import { Pagination } from "@components/table/Pagination";
//  Custom Hook
import { usePagination } from "@hook/usePagination";

type DataType = {
  [key: string]: JSX.Element | string | number;
};

type EmptyMessage = Partial<NoContentProps>;

interface TableProps {
  isDirectApi: boolean;
  caption?: string;
  totalRegisters: number;
  page: number;
  registersPerPage?: number;
  columns: Column<DataType>[];
  data: DataType[];
  onPageChange: (page: number) => void;
  emptyData?: EmptyMessage;
  variant?: string;
  colorScheme?: ThemeTypings["colorSchemes"];
}

const Table = ({
  isDirectApi = false,
  caption,
  totalRegisters,
  page,
  registersPerPage,
  columns,
  data,
  onPageChange,
  emptyData,
  variant = "simple",
  colorScheme = "teal",
}: TableProps) => {
  const pagination = usePagination({
    isDirectApi,
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
            console.log(row);
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

      <Pagination
        {...pagination}
        colorScheme={colorScheme}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default Table;
