import { ReactNode } from "react";
import { ThemeTypings } from "@chakra-ui/react";
import { Column } from "react-table";

type TableCell = {
  Header: string;
  accessor: string;
  Cell?: any;
};

type BaseTable = TableCell[];

type NoContentProps = {
  text: string;
  children?: ReactNode;
  noShadow?: boolean;
};

type DataType = {
  [key: string]: JSX.Element | string | number;
};

type EmptyMessage = Partial<NoContentProps>;

interface TableProps {
  isDirectApi?: boolean;
  actviePage?: boolean;
  caption?: string;
  totalRegisters: number;
  registersPerPage?: number;
  columns: Column<DataType>[];
  data: DataType[];
  emptyData?: EmptyMessage;
  variant?: string;
  colorScheme?: ThemeTypings["colorSchemes"];
}

interface ApiTableProps {
  isDirectApi?: boolean;
  url: string;
  reqBody: any;
  reqType: any;
  resType: any;
  actviePage?: boolean;
  caption?: string;
  registersPerPage?: number;
  columns: Column<DataType>[];
  emptyData?: EmptyMessage;
  variant?: string;
  colorScheme?: ThemeTypings["colorSchemes"];
}

export type { BaseTable, TableCell, NoContentProps, TableProps, ApiTableProps };
