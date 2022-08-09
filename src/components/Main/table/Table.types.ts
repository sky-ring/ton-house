export type TableColumn = {
  title: string;
  info?: string;
  format?: (value: string) => string;
};

export interface TableProps<DataType> {
  columns: Record<keyof DataType, TableColumn>;
  data: DataType[];
  keyField: keyof DataType;
  className?: any;
  enterAnimated?: boolean;
}
