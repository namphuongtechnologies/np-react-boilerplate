export type BasePaginationParams = {
  pageIndex?: number;
  pageSize?: number;
};

export type BaseSearchParams = {
  keyword?: string;
  userId?: string;
};

export type BaseFilterParams = BasePaginationParams & BaseSearchParams;
