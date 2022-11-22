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
} from "@chakra-ui/react";
//  Type
import { TableCell } from "@util/type/tableType";

type Props = {
  variant?: string;
  tableType?: "base" | "list";
  tableSet: TableCell[];
  caption?: string;
  data: {}[];
  customCell: any;
};

const Table = (props: Props) => {
  const {
    variant,
    tableType = "base",
    tableSet,
    caption,
    data,
    customCell,
  } = props;

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
        <Tfoot>Paging</Tfoot>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
