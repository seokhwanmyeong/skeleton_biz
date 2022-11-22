type TableCell = {
  title: string;
  cellKey: string;
  isCustom?: boolean;
  styles?: any;
};

type BaseTable = TableCell[];

export type { BaseTable, TableCell };
