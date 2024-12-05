export type BaseResponse<T> = {
  Data: T;
  Status: number;
  Message: string;
  TotalRecord: number | null;
};
