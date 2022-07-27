export type TableColumn = {
  title: string;
  info?: string;
};

export interface TableProps<DataType> {
  columns: Record<keyof DataType, TableColumn>;
  data: DataType[];
  className?: any;
}
