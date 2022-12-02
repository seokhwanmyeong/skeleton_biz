import { ReactNode } from "react";
import { ThemeTypings } from "@chakra-ui/react";
import { Column } from "react-table";

type BaseColumns = Column<DataType>[];

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
  columns: BaseColumns;
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
  columns: BaseColumns;
  emptyData?: EmptyMessage;
  variant?: string;
  colorScheme?: ThemeTypings["colorSchemes"];
}

type Sample = {
  date: string;
  name: string;
  age: number;
  gender: "man" | "woman";
  benefit: number;
  average: {
    man: number;
    woman: number;
  };
};

export type { BaseColumns, NoContentProps, TableProps, ApiTableProps, Sample };
