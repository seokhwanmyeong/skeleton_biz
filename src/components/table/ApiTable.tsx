//  LIB
import {
  useEffect,
  useState,
  useMemo,
  useImperativeHandle,
  cloneElement,
  forwardRef,
} from "react";
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
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
//  Component
import SearchBox from "@components/search/SearchBox";
import NoContent from "@components/table/NoContent";
import Pagination from "@components/table/Pagination";
import { TableCheckBox } from "@components/common/CheckBox";
//  Custom Hook
import { usePagination } from "@hook/usePagination";

type PropsApiTable = {
  api: any;
  initReq: {};
  form: { initVal: {}; formKey: string; fields: any[] };
  caption?: string;
  actviePage?: boolean;
  activeSummary?: boolean;
  page?: number;
  registersPerPage?: number;
  divide?: number;
  columns: ColumnDef<any>[];
  emptyData?: { text: string };
  variant?: string;
  pageVariant?: string;
  children?: any;
  getSelectData?: any;
  selectRowData?: any;
  onDoubleClick?: any;
};

const ApiTable = forwardRef(
  (
    {
      api,
      initReq,
      form,
      caption = "table",
      actviePage = true,
      activeSummary = false,
      page = 1,
      registersPerPage = 10,
      divide = 5,
      columns,
      emptyData = { text: "No Contents" },
      variant = "simple",
      pageVariant,
      children,
      getSelectData,
      selectRowData,
      onDoubleClick,
    }: PropsApiTable,
    ref
  ) => {
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
    const {
      reset,
      getHeaderGroups,
      getRowModel,
      getFooterGroups,
      getSelectedRowModel,
      getIsAllRowsSelected,
      getIsSomeRowsSelected,
      getToggleAllRowsSelectedHandler,
    } = useReactTable({
      data: pagenation.pageItems,
      columns,
      getCoreRowModel: getCoreRowModel(),
      debugAll: false,
      debugHeaders: false,
      debugTable: false,
    });
    const selectedData = getSelectedRowModel().rows;

    useImperativeHandle(ref, () => ({
      focus: () => {
        console.log("active");
        reset();
        setReq({ ...req });
      },
    }));

    useEffect(() => {
      getSelectData &&
        getSelectData(selectedData.map((list: any) => list.original));
    }, [selectedData]);

    useEffect(() => {
      api(req)
        .then((res: any) => {
          const { pageNo, pageSize, records, totalCount } = res;

          setData(records);
          setTotalReg(totalCount);
        })
        .catch((e: any) => console.log(e));
    }, [req]);

    return (
      <Flex flexDirection="column" gap={10} overflow="hidden">
        <SearchBox setReq={setReq} form={form} />
        {activeSummary && (
          <Flex
            flexDirection="column"
            gap="2rem"
            p="2rem 2rem"
            border="1px solid"
            borderRadius="base"
          >
            <Text textStyle="list.title">검색요약</Text>
            <List display="flex">
              <ListItem display="flex" w="100%">
                <Text w="35%" textStyle="list.title">
                  매장수
                </Text>
                <Text textStyle="list.text">38 건</Text>
              </ListItem>
              <ListItem display="flex" w="100%">
                <Text w="35%" textStyle="list.title">
                  평균 월매출
                </Text>
                <Text textStyle="list.text">1,200 만원</Text>
              </ListItem>
              <ListItem display="flex" w="100%">
                <Text w="35%" textStyle="list.title">
                  평균 일매출
                </Text>
                <Text textStyle="list.text">200 만원</Text>
              </ListItem>
              <ListItem display="flex" w="100%">
                <Text w="35%" textStyle="list.title">
                  누적매출
                </Text>
                <Text textStyle="list.text">31,200 만원</Text>
              </ListItem>
            </List>
          </Flex>
        )}
        <Flex justifyContent="space-between" alignItems="center">
          <Text>검색결과 : {totalReg}건</Text>
          {ref && children
            ? cloneElement(children, { refresh: () => setReq(req) }, null)
            : children}
        </Flex>
        <Box
          w="100%"
          overflowY="scroll"
          __css={{
            "::-webkit-scrollbar": {
              w: "5px",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "5",
              bg: `primary.reverse.bdColor`,
            },
          }}
        >
          <Table variant={variant} aria-label={caption}>
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={`thead-${headerGroup.id}`}>
                  <Th key={"thead-th-chk-total"}>
                    <TableCheckBox
                      checked={getIsAllRowsSelected()}
                      indeterminate={getIsSomeRowsSelected()}
                      onChange={getToggleAllRowsSelectedHandler()}
                    />
                  </Th>
                  {headerGroup.headers.map((header) => {
                    let children;
                    let rowSpan = 1;

                    if (
                      header.depth > 1 &&
                      header.column.parent === undefined
                    ) {
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
                        key={`thead-th-${header.id}`}
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
                <Tr key="table-no-content">
                  <Td colSpan={getHeaderGroups().at(-1)?.headers.length || 1}>
                    <NoContent
                      {...emptyData}
                      text={emptyData?.text ?? "No Contents"}
                    />
                  </Td>
                </Tr>
              ) : (
                getRowModel().rows.map((row, rowIdx) => {
                  return (
                    <Tr
                      key={row.id}
                      cursor="pointer"
                      _hover={{
                        transition: onDoubleClick && "0.3s",
                        opacity: onDoubleClick && "0.6",
                      }}
                      onClick={(e) =>
                        e.detail === 2 && onDoubleClick && onDoubleClick(row)
                      }
                    >
                      <Td
                        key={`table-td-chk-${rowIdx + 1}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TableCheckBox
                          checked={row.getIsSelected()}
                          indeterminate={row.getIsSomeSelected()}
                          onChange={row.getToggleSelectedHandler()}
                        />
                      </Td>
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            selectRowData: selectRowData,
                          })}
                        </Td>
                      ))}
                    </Tr>
                  );
                })
              )}
            </Tbody>
            <Tfoot>
              {getFooterGroups().map((footerGroup) => {
                return (
                  <Tr key={`tfoot-${footerGroup.id}`}>
                    <Th key="tfoot-th-chk"></Th>
                    {footerGroup.headers.map((header) => (
                      <Th key={`tfoot-th-${header.id}`}>
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
  }
);

export default ApiTable;
