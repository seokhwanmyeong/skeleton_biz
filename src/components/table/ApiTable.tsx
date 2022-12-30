//  LIB
import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
//  Component
import SearchBox from "@components/search/SearchBox";
import NoContent from "@components/table/NoContent";
import Pagination from "@components/table/Pagination";
//  Custom Hook
import { usePagination } from "@hook/usePagination";

type PropsApiTable = {
  api: any;
  initReq: {};
  form: { initVal: {}; formKey: string; fields: any[] };
  caption?: string;
  actviePage?: boolean;
  page?: number;
  registersPerPage?: number;
  divide?: number;
  columns: ColumnDef<any>[];
  emptyData?: { text: string };
  variant?: string;
  pageVariant?: string;
  children?: any;
  getTableData?: any;
};

const ApiTable = ({
  api,
  initReq,
  form,
  caption = "table",
  actviePage = true,
  page = 1,
  registersPerPage = 10,
  divide = 5,
  columns,
  emptyData = { text: "No Contents" },
  variant = "simple",
  pageVariant,
  children,
  getTableData,
}: PropsApiTable) => {
  const [req, setReq] = useState({
    ...initReq,
    page: page,
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
    api(req)
      .then((res: any) => {
        const { pageNo, pageSize, records, totalCount } = res;

        setData(records);
        setTotalReg(totalCount);

        getTableData(records);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, [req]);

  return (
    <Flex flexDirection="column" gap={10}>
      <SearchBox req={req} setReq={setReq} form={form} />
      {children}
      <Box w="100%" overflow="auto">
        <Table variant={variant} aria-label={caption}>
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
        </Table>
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
    </Flex>
  );
};

export default ApiTable;
