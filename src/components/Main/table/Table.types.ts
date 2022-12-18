export type TableColumn = {
  title: string;
  info?: string;
  format?: (value: any) => React.ReactNode;
};

export interface TableProps<DataType> {
  columns: Partial<Record<keyof DataType, TableColumn>>;
  data: DataType[];
  keyField: keyof DataType;
  className?: any;
  enterAnimated?: boolean;
}
