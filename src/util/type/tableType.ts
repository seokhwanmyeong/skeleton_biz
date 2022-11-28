type TableCell = {
  Header: string;
  accessor: string;
  isCustom?: boolean;
  styles?: any;
};

type BaseTable = TableCell[];

export type { BaseTable, TableCell };
