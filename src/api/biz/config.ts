//  Lib
import axios from "axios";
import dayjs from "dayjs";
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
  MAP_SIDO_GET_LIST,
  MAP_SIGUNGU_GET_LIST,
  MAP_DONG_GET_LIST,
  MAP_UPJONG_TOP,
  MAP_UPJONG_MID,
  MAP_UPJONG_BOT,
  MAP_NICE_FLOWPOP,
} from "@api/biz/url";
//  Type
import {
  BixApiInstance,
  TypeLogin,
  TypeMapBsDisSearch,
  TypeMapRentSearch,
  TypeMapStoreSearch,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeUpjongGet,
  TypeUpjongPost,
  TypeSigunguRank,
} from "@api/biz/type";

let localStorage = window.localStorage;
let jwtToken = localStorage.getItem("tk");

//  Axios Instance
const instance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZ_SERVER,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 20000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: jwtToken ? "Bearer " + jwtToken : "",
  },
});

const loginInstance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZ_SERVER,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 20000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

//  Axios interceptors
instance.interceptors.request.use((req: any) => {
  const { url, data } = req;
  const tk = localStorage.getItem("tk");
  const te = localStorage.getItem("te");

  console.log("\nIntercept Req\n", req);
  console.log("\nReq url\n", url);
  console.log("\nReq Data\n", data);

  if (tk && dayjs().valueOf() > Number(te)) {
    if (req.headers.Authorization) {
      return req;
    } else {
      req.headers.Authorization = `Bearer ${tk}`;

      return req;
    }
  } else {
    //  로그인 재발급 로직
  }
});

instance.interceptors.response.use((res: any) => {
  console.log("\nresponse\n", res);
  return res.data;
});

const loginApi = {
  login: (val: TypeLogin["req"]) =>
    loginInstance.post<TypeLogin["req"], TypeLogin["res"]>(BIZ_LOGIN, val),
  checkTokenValid: () => {},
};

const erpStoreApi = {
  search: (req: any) => instance.post(ERP_STORE_GET_LIST, req),
  info: (req: any) => instance.post(ERP_STORE_GET_INFO, req),
  create: (req: any) => instance.post(ERP_STORE_CREATE, req),
  update: (req: any) => instance.post(ERP_STORE_UPDATE, req),
  delete: (req: any) => instance.post(ERP_STORE_DELETE, req),
};

const erpSaleApi = {
  search: (req: any) => instance.post(ERP_SALE_GET_LIST, req),
  create: (req: any) => instance.post(ERP_SALE_CREATE, req),
  update: (req: any) => instance.post(ERP_SALE_UPDATE, req),
  delete: (req: any) => instance.post(ERP_SALE_DELETE, req),
};

const erpBsdisApi = {
  search: (req: any) => instance.post(ERP_BSDIS_GET_LIST, req),
  info: (req: any) => instance.post(ERP_BSDIS_GET_INFO, req),
  create: (req: any) => instance.post(ERP_BSDIS_CREATE, req),
  update: (req: any) => instance.post(ERP_BSDIS_UPDATE, req),
  delete: (req: any) => instance.post(ERP_BSDIS_DELETE, req),
};

const erpRentApi = {
  search: (req: any) => instance.post(ERP_RENT_GET_LIST, req),
  info: (req: any) => instance.post(ERP_RENT_GET_INFO, req),
  create: (req: any) => instance.post(ERP_RENT_CREATE, req),
  update: (req: any) => instance.post(ERP_RENT_UPDATE, req),
  delete: (req: any) => instance.post(ERP_RENT_DELETE, req),
};

const erpClientApi = {
  search: (req: any) => instance.post(ERP_CLIENT_GET_LIST, req),
  info: (req: any) => instance.post(ERP_CLIENT_GET_INFO, req),
  create: (req: any) => instance.post(ERP_CLIENT_CREATE, req),
  update: (req: any) => instance.post(ERP_CLIENT_UPDATE, req),
  delete: (req: any) => instance.post(ERP_CLIENT_DELETE, req),
};

const apiErpMap = {
  getStoreList: (req: TypeMapStoreSearch["req"]) =>
    instance.post<TypeMapStoreSearch["req"], any>(ERP_STORE_GET_POINT, req),
  getRentList: (req: TypeMapRentSearch["req"]) =>
    instance.post<TypeMapRentSearch["req"], any>(ERP_RENT_GET_POINT, req),
  getBsDisList: (req: TypeMapBsDisSearch["req"]) =>
    instance.post<TypeMapBsDisSearch["req"], any>(ERP_BSDIS_GET_AREA, req),
};

const apiMapArea = {
  getSidoList: () => instance.get<TypeMapSido["res"]>(MAP_SIDO_GET_LIST),
  getSigunguList: (req: TypeMapSigungu["req"]) =>
    instance.post<TypeMapSigungu["req"], TypeMapSigungu["res"]>(
      MAP_SIGUNGU_GET_LIST,
      req
    ),
  getDongList: (req: TypeMapDong["req"]) =>
    instance.post<TypeMapDong["req"], TypeMapSigungu["res"]>(
      MAP_DONG_GET_LIST,
      req
    ),
};

const apiMapNice = {
  getSigunguRank: (req: TypeSigunguRank["req"]) =>
    instance.post<TypeSigunguRank["req"], TypeSigunguRank["res"]>(
      MAP_NICE_FLOWPOP,
      req
    ),
};

const apiUpjong = {
  getTopList: () => instance.get<TypeUpjongGet["res"]>(MAP_UPJONG_TOP),
  getMidList: (req: TypeUpjongPost["req"]) =>
    instance.post<TypeUpjongPost["req"], TypeUpjongPost["res"]>(
      MAP_UPJONG_MID,
      req
    ),
  getBotList: (req: TypeUpjongPost["req"]) =>
    instance.post<TypeUpjongPost["req"], TypeUpjongPost["res"]>(
      MAP_UPJONG_BOT,
      req
    ),
};

const apiCommon = {
  checkCode: (req: any) => instance.post(ERP_CODE_CHECKER, req),
  getAvailableErpLinkLi: (req: any) => instance.post(ERP_LINK_GET, req),
};

export {
  loginApi,
  erpStoreApi,
  erpSaleApi,
  erpBsdisApi,
  erpRentApi,
  erpClientApi,
  apiErpMap,
  apiCommon,
  apiMapArea,
  apiMapNice,
  apiUpjong,
};
