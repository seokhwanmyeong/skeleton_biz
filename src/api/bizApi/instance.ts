//  LIB
import axios, { AxiosInstance } from "axios";
//  Type

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

const postApi: NiceApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_POSTMAN,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 2000,
  headers: {
    Accept: "*/*",
  },
});

postApi.interceptors.request.use((req: any) => {
  console.log("intercept Req", req);
  console.log("Req Data", req.data);
  return req;
});

postApi.interceptors.response.use((res: any) => {
  console.log("res", res);
  return res.data;
});

const getTestTable = (url: string, reqBody: any, dataSet: any, refSet: any) => {
  postApi
    .post<any, { success: boolean; data: any[]; totalLen: number }>(
      url,
      reqBody
    )
    .then((res) => {
      if (res.success) {
        const data = res.data;
        const totalReg = res.totalLen;
        dataSet(data);
        refSet(totalReg);
      } else {
        console.log("Internal Sever Error");
      }
      console.log("api End");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getTestTable, postApi };
