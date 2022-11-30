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
import Pagination from "@components/table/Pagination";
import NoContent from "@components/table/NoContent";
import SearchBox from "@components/form/search/SearchBox";
//  Custom Hook
import { usePagination } from "@hook/usePagination";
//  Type
import { ApiTableProps } from "@util/type/tableType";
import { useEffect } from "react";

const SearchTable = ({
  isDirectApi = false,
  url,
  reqBody = {},
  reqType = {},
  resType = {},
  actviePage = true,
  caption,
  registersPerPage = 5,
  columns,
  emptyData,
  variant = "simple",
  colorScheme = "teal",
}: ApiTableProps) => {
  console.log("registersPerPage", registersPerPage);
  const [req, setReq] = useState({
    url: url,
    body: {
      ...reqBody,
      page: 1,
      registersPerPage: registersPerPage,
    },
  });
  const [data, setData] = useState<any[]>([]);
  const [totalReg, setTotalReg] = useState<number>(0);
  const pagination = usePagination({
    isDirectApi,
    totalRegisters: totalReg,
    page: req.body.page,
    items: data,
    registersPerPage,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pagination.pageItems });

  useEffect(() => {
    console.log("api request");
    console.log("data", data);
    console.log("totalReg", totalReg);
  }, [data, totalReg]);

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%">
      <SearchBox
        url={url}
        reqBody={req.body}
        dataSet={setData}
        refSet={setTotalReg}
      />
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
          {data.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length}>
                <NoContent
                  {...emptyData}
                  text={emptyData?.text ?? "No Contents"}
                />
              </Td>
            </Tr>
          ) : (
            rows.map((row) => {
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
            })
          )}
        </Tbody>
      </ChakraTable>
      {actviePage && (
        <Flex w="100%" justifyContent="center">
          <Pagination
            {...pagination}
            colorScheme={colorScheme}
            onPageChange={(e) => {
              setReq({
                ...req,
                body: {
                  ...req.body,
                  page: e,
                },
              });
            }}
          />
        </Flex>
      )}
    </Box>
  );
};

export default SearchTable;
