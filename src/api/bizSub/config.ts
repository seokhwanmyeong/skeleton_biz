//  Lib
import axios from "axios";
//  URL
import {
  MAP_SIDO_GET_LIST,
  MAP_SIGUNGU_GET_LIST,
  MAP_DONG_GET_LIST,
  MAP_UPJONG_TOP,
  MAP_UPJONG_MID,
  MAP_UPJONG_BOT,
  MAP_NICE_RANKING,
  MAP_NICE_STORE,
  MAP_NICE_FLOWPOP,
  MAP_REPORT_SUMMARY,
  MAP_REPORT_POP,
  MAP_REPORT_HOUSE,
  MAP_REPORT_UPJONSALE,
  MAP_REPORT_FACILITY,
  MAP_REPORT_FACILITYLIST,
  MAP_NICE_SIDO,
  MAP_NICE_SIGUNGU,
  MAP_NICE_DONG,
  MAP_BUILDING_LIST,
  MAP_BUILDING_DETAIL,
  ERP_STORE_GET_POINT,
  ERP_RENT_GET_POINT,
  ERP_BSDIS_GET_AREA,
  MAP_ERP_STORE_GET_INFO,
  MAP_ERP_RENT_GET_INFO,
  MAP_ERP_BSDIS_GET_INFO,
} from "@api/bizSub/url";
//  Type
import type {
  BixApiInstance,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeUpjongGet,
  TypeUpjongPost,
  TypeSigunguRank,
  TypeNiceStore,
  TypeNiceFlowPop,
  TypeNiceSido,
  TypeNiceSigungu,
  TypeNiceDong,
  TypeMapStoreSearch,
  TypeMapBsDisSearch,
  TypeMapRentSearch,
  TypeMapStoreInfo,
  TypeMapBsDisInfo,
  TypeMapRentInfo,
} from "@api/bizSub/type";

let localStorage = window.localStorage;
let jwtToken = localStorage.getItem("tk");

//  Axios Instance
const instance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZSUB_SERVER,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 10000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const instanceLocal: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZLOCAL_SERVER,
  responseType: "json",
  responseEncoding: "utf8",
  timeout: 10000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

//  Axios interceptors
instance.interceptors.request.use((req: any) => {
  console.log(req);
  return req;
});

instance.interceptors.response.use((res: any) => {
  console.log("\nresponse\n", res);
  return res;
});

const apiMapArea = {
  getSidoList: (req: TypeMapSido["req"]) =>
    instance.post<TypeMapSido["req"], TypeMapSido["res"]>(
      MAP_SIDO_GET_LIST,
      req
    ),
  getSigunguList: (req: TypeMapSigungu["req"]) =>
    instance.post<TypeMapSigungu["req"], TypeMapSigungu["res"]>(
      MAP_SIGUNGU_GET_LIST,
      req
    ),
  getDongList: (req: TypeMapDong["req"]) =>
    instance.post<TypeMapDong["req"], TypeMapDong["res"]>(
      MAP_DONG_GET_LIST,
      req
    ),
};

const apiMapNice = {
  getSigunguRank: (req: TypeSigunguRank["req"]) =>
    instance.post<TypeSigunguRank["req"], TypeSigunguRank["res"]>(
      MAP_NICE_RANKING,
      req
    ),
  getBrandList: (req: TypeNiceStore["req"]) =>
    instance.post<TypeNiceStore["req"], TypeNiceStore["res"]>(
      MAP_NICE_STORE,
      req
    ),
  getFlowPop: (req: TypeNiceFlowPop["req"]) =>
    instance.post<TypeNiceFlowPop["req"], TypeNiceFlowPop["res"]>(
      MAP_NICE_FLOWPOP,
      req
    ),
};

const apiNiceAddr = {
  getSidoAddr: (req: TypeNiceSido["req"]) =>
    instance.post<TypeNiceSido["req"], TypeNiceSido["res"]>(MAP_NICE_SIDO, req),
  getSigunguAddr: (req: TypeNiceSigungu["req"]) =>
    instance.post<TypeNiceSigungu["req"], TypeNiceSigungu["res"]>(
      MAP_NICE_SIGUNGU,
      req
    ),
  getDongAddr: (req: TypeNiceDong["req"]) =>
    instance.post<TypeNiceDong["req"], TypeNiceDong["res"]>(MAP_NICE_DONG, req),
};

const apiMapBuilding = {
  getBuildingList: (req: any) => instance.post(MAP_BUILDING_LIST, req),
  getBuildingDetail: (req: any) => instance.post(MAP_BUILDING_DETAIL, req),
};

const apiReport = {
  getSummary: (req: any) => instance.post(MAP_REPORT_SUMMARY, req),
  getPop: (req: any) => instance.post(MAP_REPORT_POP, req),
  getHouse: (req: any) => instance.post(MAP_REPORT_HOUSE, req),
  getUpjongSale: (req: any) => instance.post(MAP_REPORT_UPJONSALE, req),
  getFacility: (req: any) => instance.post(MAP_REPORT_FACILITY, req),
  getFacilityList: (req: any) => instance.post(MAP_REPORT_FACILITYLIST, req),
};

const apiErpMap = {
  getStoreList: (req: TypeMapStoreSearch["req"]) =>
    instance.post<TypeMapStoreSearch["req"], any>(ERP_STORE_GET_POINT, req),
  getRentList: (req: TypeMapRentSearch["req"]) =>
    instance.post<TypeMapRentSearch["req"], any>(ERP_RENT_GET_POINT, req),
  getBsDisList: (req: TypeMapBsDisSearch["req"]) =>
    instance.post<TypeMapBsDisSearch["req"], any>(ERP_BSDIS_GET_AREA, req),
  getStoreInfo: (req: TypeMapStoreInfo["req"]) =>
    instance.post<TypeMapStoreInfo["req"], TypeMapStoreInfo["res"]>(
      MAP_ERP_STORE_GET_INFO,
      req
    ),
  getRentInfo: (req: TypeMapRentInfo["req"]) =>
    instance.post<TypeMapRentInfo["req"], TypeMapRentInfo["res"]>(
      MAP_ERP_RENT_GET_INFO,
      req
    ),
  getBsDisInfo: (req: TypeMapBsDisInfo["req"]) =>
    instance.post<TypeMapBsDisInfo["req"], TypeMapBsDisInfo["res"]>(
      MAP_ERP_BSDIS_GET_INFO,
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

export {
  apiMapArea,
  apiMapNice,
  apiReport,
  apiNiceAddr,
  apiMapBuilding,
  apiErpMap,
  apiUpjong,
};
