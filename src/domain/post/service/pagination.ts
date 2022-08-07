export type PaginationParams = {
  page: number;
}

export type PaginatedResponse<T> = {
  totalPage: number;
  page: number;
  items: T[];
}

export type _PaginationParams = {
  skip: number;
  take: number;
}
