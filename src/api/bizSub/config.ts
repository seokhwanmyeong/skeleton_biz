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
} from "@api/bizSub/type";

let localStorage = window.localStorage;
let jwtToken = localStorage.getItem("tk");

//  Axios Instance
const instance: BixApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BIZSUB_SERVER,
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
  console.log(req);
  return req;
});

instance.interceptors.response.use((res: any) => {
  console.log("\nresponse\n", res);
  return res;
});

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

export { apiMapArea, apiMapNice };
