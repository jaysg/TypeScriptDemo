export interface ResponseObj<T> {
  code: number;
  data: T;
  message: string;
}

export interface NormalListData<T> {
  count: number;
  list: Array<T>;
}
