//  Lib
import axios from "axios";
//  URL
import {
  MAP_SIDO_GET_LIST,
  MAP_SIGUNGU_GET_LIST,
  MAP_DONG_GET_LIST,
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
} from "@api/bizSub/url";
//  Type
import type {
  BixApiInstance,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeSigunguRank,
  TypeNiceStore,
  TypeNiceFlowPop,
  TypeNiceSido,
  TypeNiceSigungu,
  TypeNiceDong,
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

export { apiMapArea, apiMapNice, apiReport, apiNiceAddr, apiMapBuilding };
