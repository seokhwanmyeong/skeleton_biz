//  LIB
import axios from "axios";
//  Type
import { BixApiInstance, TypeLogin } from "@api/biz/type";
//  URL
import {
  BIZ_LOGIN,
  ERP_STORE_GET_LIST,
  ERP_STORE_GET_INFO,
  ERP_STORE_GET_POINT,
  ERP_STORE_CREATE,
  ERP_STORE_UPDATE,
  ERP_STORE_DELETE,
  ERP_SALE_GET_LIST,
  ERP_SALE_CREATE,
  ERP_SALE_UPDATE,
  ERP_SALE_DELETE,
  ERP_BSDIS_GET_LIST,
  ERP_BSDIS_GET_INFO,
  ERP_BSDIS_CREATE,
  ERP_BSDIS_UPDATE,
  ERP_BSDIS_DELETE,
  ERP_BSDIS_GET_AREA,
  ERP_RENT_GET_LIST,
  ERP_RENT_GET_INFO,
  ERP_RENT_CREATE,
  ERP_RENT_UPDATE,
  ERP_RENT_DELETE,
  ERP_RENT_GET_POINT,
  ERP_CLIENT_GET_LIST,
  ERP_CLIENT_GET_INFO,
  ERP_CLIENT_CREATE,
  ERP_CLIENT_UPDATE,
  ERP_CLIENT_DELETE,
  ERP_CODE_CHECKER,
  ERP_LINK_GET,
  ERP_BSDIS_GET_TEST,
} from "@api/biz/url";

const localStorage = window.localStorage;
const jwtToken = localStorage.getItem("token");

//  Axios Instance
const instanceTest: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZ,
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
instanceTest.interceptors.request.use((req: any) => {
  const { url, data } = req;
  console.log("\nintercept Req\n", req);
  console.log("\nReq url\n", url);
  console.log("\nReq Data\n", data);
  return req;
});

instanceTest.interceptors.response.use((res: any) => {
  // console.log("\nresponse\n", res);
  return res.data;
});

const instance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZ_SERVER,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 2000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbjEyMyJ9LCJpYXQiOjE2ODA4NjAxOTMsImV4cCI6MTY4MTcyNDE5M30.SrbSytFCMHxp37_-E-XaH3-CiW0NlYK-bjvMQ06CxKM",
  },
});

//  Axios interceptors
instance.interceptors.request.use((req: any) => {
  const { url, data } = req;
  console.log("\nIntercept Req\n", req);
  console.log("\nReq url\n", url);
  console.log("\nReq Data\n", data);
  return req;
});

instance.interceptors.response.use((res: any) => {
  console.log("\nresponse\n", res);
  return res.data;
});

const loginApi = {
  login: (val: TypeLogin["req"]) =>
    instanceTest.post<TypeLogin["req"], TypeLogin["res"]>(BIZ_LOGIN, val),
  checkTokenValid: () => {},
};

const erpStoreApi = {
  search: (req: any) => instanceTest.post(ERP_STORE_GET_LIST, req),
  info: (req: any) => instance.post(ERP_STORE_GET_INFO, req),
  create: (req: any) => instanceTest.post(ERP_STORE_CREATE, req),
  update: (req: any) => instanceTest.post(ERP_STORE_UPDATE, req),
  delete: (req: any) => instanceTest.post(ERP_STORE_DELETE, req),
};

const erpSaleApi = {
  search: (req: any) => instanceTest.post(ERP_SALE_GET_LIST, req),
  create: (req: any) => instanceTest.post(ERP_SALE_CREATE, req),
  update: (req: any) => instanceTest.post(ERP_SALE_UPDATE, req),
  delete: (req: any) => instanceTest.post(ERP_SALE_DELETE, req),
};

const erpBsdisApi = {
  search: (req: any) => instanceTest.post(ERP_BSDIS_GET_LIST, req),
  info: (req: any) => instance.post(ERP_BSDIS_GET_INFO, req),
  create: (req: any) => instanceTest.post(ERP_BSDIS_CREATE, req),
  update: (req: any) => instanceTest.post(ERP_BSDIS_UPDATE, req),
  delete: (req: any) => instanceTest.post(ERP_BSDIS_DELETE, req),
};

const erpRentApi = {
  search: (req: any) => instanceTest.post(ERP_RENT_GET_LIST, req),
  info: (req: any) => instance.post(ERP_RENT_GET_INFO, req),
  create: (req: any) => instanceTest.post(ERP_RENT_CREATE, req),
  update: (req: any) => instanceTest.post(ERP_RENT_UPDATE, req),
  delete: (req: any) => instanceTest.post(ERP_RENT_DELETE, req),
};

const erpClientApi = {
  search: (req: any) => instanceTest.post(ERP_CLIENT_GET_LIST, req),
  info: (req: any) => instance.post(ERP_CLIENT_GET_INFO, req),
  create: (req: any) => instanceTest.post(ERP_CLIENT_CREATE, req),
  update: (req: any) => instanceTest.post(ERP_CLIENT_UPDATE, req),
  delete: (req: any) => instanceTest.post(ERP_CLIENT_DELETE, req),
};

const apiErpMap = {
  getStoreList: (req?: any) => instance.post(ERP_STORE_GET_POINT),
  getRentList: (req?: any) => instance.post(ERP_RENT_GET_POINT),
  getBsDisList: (req?: any) => instance.post(ERP_BSDIS_GET_AREA),
  test: (req?: any) => instance.post(ERP_BSDIS_GET_TEST),
};

const apiCommon = {
  checkCode: (req: any) => instance.post(ERP_CODE_CHECKER, req),
  getAvailableErpLinkLi: (req: any) => instance.post(ERP_LINK_GET, req),
};

export default instanceTest;
export {
  loginApi,
  erpStoreApi,
  erpSaleApi,
  erpBsdisApi,
  erpRentApi,
  erpClientApi,
  apiErpMap,
  apiCommon,
};
