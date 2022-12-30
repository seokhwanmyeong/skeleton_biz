//  LIB
import axios from "axios";
//  Type
import { BixApiInstance, TypeLogin } from "@api/bizApi/type";
//  URL
import {
  BIZ_LOGIN,
  ERP_STORE_GET,
  ERP_STORE_CREATE,
  ERP_STORE_UPDATE,
  ERP_STORE_DELETE,
  ERP_SALE_GET,
  ERP_SALE_CREATE,
  ERP_SALE_UPDATE,
  ERP_SALE_DELETE,
  ERP_AREA_GET,
  ERP_AREA_CREATE,
  ERP_AREA_UPDATE,
  ERP_AREA_DELETE,
} from "@api/bizApi/url";

const localStorage = window.localStorage;
const jwtToken = localStorage.getItem("token");

//  Axios Instance
const instance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZFE,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 2000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: jwtToken ? "Bearer " + jwtToken : "Bearer",
  },
});

//  Axios interceptors
instance.interceptors.request.use((req: any) => {
  const { url, data } = req;
  console.log("\nintercept Req\n", req);
  console.log("\nReq url\n", url);
  console.log("\nReq Data\n", data);
  return req;
});

instance.interceptors.response.use((res: any) => {
  console.log("\nresponse\n", res);
  return res.data;
});

const commonApi = {
  get: (url: string) => instance.get<any>(url),
  post: (url: string, reqBody: any) => instance.post<any, any>(url, reqBody),
};

const loginApi = {
  login: (val: TypeLogin["req"]) =>
    instance.post<TypeLogin["req"], TypeLogin["res"]>(BIZ_LOGIN, val),
  checkTokenValid: () => {},
};

const erpStoreApi = {
  getData: () => instance.get(ERP_STORE_GET),
  search: (reqBody: any) => instance.post(ERP_STORE_GET, reqBody),
  create: (reqBody: any) => instance.post(ERP_STORE_CREATE, reqBody),
  update: (reqBody: any) => instance.post(ERP_STORE_UPDATE, reqBody),
  delete: (reqBody: any) => instance.post(ERP_STORE_DELETE, reqBody),
};

const erpSaleApi = {
  getData: () => instance.get(ERP_SALE_GET),
  create: (reqBody: any) => instance.post(ERP_SALE_CREATE, reqBody),
  update: (reqBody: any) => instance.post(ERP_SALE_UPDATE, reqBody),
  delete: (reqBody: any) => instance.post(ERP_SALE_DELETE, reqBody),
};

const erpAreaApi = {
  getData: () => instance.get(ERP_AREA_GET),
  create: (reqBody: any) => instance.post(ERP_AREA_CREATE, reqBody),
  update: (reqBody: any) => instance.post(ERP_AREA_UPDATE, reqBody),
  delete: (reqBody: any) => instance.post(ERP_AREA_DELETE, reqBody),
};

export default instance;
export { loginApi, erpStoreApi };
