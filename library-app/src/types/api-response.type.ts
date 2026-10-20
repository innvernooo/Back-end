export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PageinationType = {
  page: number;
  limit: number;
  totalPage: number;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  meta: PageinationType;
};
