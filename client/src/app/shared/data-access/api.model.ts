export enum ApiStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiResponse<T> {
  status: ApiStatus;
  result?: T;
  error?: any;
}
