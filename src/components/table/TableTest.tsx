//  Lib
import { cloneElement } from "react";
import {
  TableCaption,
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  ThemeTypings,
} from "@chakra-ui/react";
import { Column, useTable } from "react-table";
//  Components
import { NoContentProps, NoContent } from "@components/table/NoContent";
import { Pagination } from "@components/table/Pagination";
//  Type
import { TableCell } from "@util/type/tableType";
//  Hook
import { usePagination } from "@hook/usePagination";

type DataType = {
  [key: string]: JSX.Element | string | number;
};

type EmptyMessage = Partial<NoContentProps>;

interface Props {
  variant?: string;
  tableType?: "base" | "list";
  tableSet: TableCell[];
  caption?: string;
  columns: Column<DataType>[];
  data: DataType[];
  totalRegisters: number;
  page: number;
  customCell: any;
  colorScheme?: ThemeTypings["colorSchemes"];
  emptyData?: EmptyMessage;
  onPageChange: (page: number) => void;
}

const TableTest = ({
  variant,
  tableType = "base",
  tableSet,
  caption,
  data,
  columns,
  totalRegisters,
  page,
  onPageChange,
  customCell,
  colorScheme = "teal",
}: Props) => {
  const pagination = usePagination({
    totalRegisters,
    page,
    items: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pagination.pageItems });

  if (data.length === 0) {
    return <NoContent text={"No Contents"} />;
  }

  return (
    <TableContainer>
      <ChakraTable variant={variant} style={{ tableLayout: "fixed" }}>
        {caption && <TableCaption placement="top">{caption}</TableCaption>}
        <Thead>
          <Tr>
            {tableSet.map((setting: TableCell) => {
              const { title, cellKey } = setting;

              return <Th key={`thead-${cellKey}`}>{title}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((li: any, dataIdx: number) => {
            return (
              <Tr key={`tbody-list-${dataIdx}`}>
                {tableSet.map((setting: TableCell) => {
                  const { cellKey, isCustom, styles = {} } = setting;

                  return (
                    <Td
                      key={`tbody-cell-line${dataIdx}-${cellKey}`}
                      style={{
                        textOverflow: isCustom ? "" : "ellipsis",
                        overflow: isCustom ? "" : "hidden",
                        ...styles,
                      }}
                    >
                      {isCustom
                        ? cloneElement(customCell[cellKey], {
                            total: data,
                            dataIdx: dataIdx,
                            data: li,
                          })
                        : li[cellKey]}
                    </Td>
                  );
                })}
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
    </TableContainer>
  );
};

export default TableTest;
