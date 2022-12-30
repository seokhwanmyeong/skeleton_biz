//  LIB
import axios, { AxiosInstance } from "axios";

type Req = {};
type Res = {};

interface AxiosInterceptorManager {}

type AxiosRequestConfig = {};

interface NiceApiInstance extends AxiosInstance {
  interceptors: {
    request: any;
    response: any;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<R, T>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const niceApi: NiceApiInstance = axios.create({ baseURL: "" });

niceApi.interceptors.request.use((req: any) => {
  return req;
});

niceApi.interceptors.response.use((res: any) => {
  return res;
});

const errCode = {};

export default niceApi;
