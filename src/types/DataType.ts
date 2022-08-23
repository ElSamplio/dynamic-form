export type DataStructType = {
  dateSaved: string;
  data: DataType[];
};

export type DataType = {
  fieldId: number;
  value: string | number | null;
};
