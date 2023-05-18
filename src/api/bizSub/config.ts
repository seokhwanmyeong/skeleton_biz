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
  ERP_CODE_CHECKER,
  ERP_LINK_STORE_GET,
  ERP_LINK_BSDIS_GET,
  ERP_STORE_CREATE,
  ERP_STORE_UPDATE,
  ERP_STORE_DELETE,
  ERP_RENT_CREATE,
  ERP_RENT_UPDATE,
  ERP_RENT_DELETE,
  ERP_HISTORY_GET_LIST,
  ERP_HISTORY_GET_DETAIL,
  ERP_HISTORY_CREATE,
  ERP_HISTORY_UPDATE,
  ERP_HISTORY_DELETE,
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
  TypeChkCode,
  TypeSearchLinkStore,
  TypeSearchLinkBsDis,
  TypeCreateStore,
  TypeCreateRent,
  TypeHistoryList,
  TypeHistoryDetail,
  TypeHistoryCreate,
  TypeHistoryUpdate,
  TypeHistoryDelete,
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
  getTopList: () => instance.post<{}, TypeUpjongGet["res"]>(MAP_UPJONG_TOP, {}),
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
  checkCode: (req: TypeChkCode["req"]) =>
    instance.post<TypeChkCode["req"], TypeChkCode["res"]>(
      ERP_CODE_CHECKER,
      req
    ),
  getAvailableStoreLink: (req: TypeSearchLinkStore["req"]) =>
    instance.post<TypeSearchLinkStore["req"], TypeSearchLinkStore["res"]>(
      ERP_LINK_STORE_GET,
      req
    ),
  getAvailableBsDisLink: (req: TypeSearchLinkBsDis["req"]) =>
    instance.post<TypeSearchLinkBsDis["req"], TypeSearchLinkBsDis["res"]>(
      ERP_LINK_BSDIS_GET,
      req
    ),
};

const apiErpStore = {
  createStore: (req: TypeCreateStore["req"]) =>
    instance.post<TypeCreateStore["req"], TypeCreateStore["res"]>(
      ERP_STORE_CREATE,
      req
    ),
  updateStore: (req: TypeChkCode["req"]) =>
    instance.post<TypeChkCode["req"], TypeChkCode["res"]>(
      ERP_STORE_UPDATE,
      req
    ),
  deleteStore: (req: TypeChkCode["req"]) =>
    instance.post<TypeChkCode["req"], TypeChkCode["res"]>(
      ERP_STORE_DELETE,
      req
    ),
};

const apiErpRent = {
  createRent: (req: TypeCreateRent["req"]) =>
    instance.post<TypeCreateRent["req"], TypeCreateRent["res"]>(
      ERP_RENT_CREATE,
      req
    ),
  updateRent: (req: TypeChkCode["req"]) =>
    instance.post<TypeChkCode["req"], TypeChkCode["res"]>(ERP_RENT_UPDATE, req),
  deleteRent: (req: TypeChkCode["req"]) =>
    instance.post<TypeChkCode["req"], TypeChkCode["res"]>(ERP_RENT_DELETE, req),
};

const erpHistoryApi = {
  getHistoryList: (req: TypeHistoryList["req"]) =>
    instance.post<TypeHistoryList["req"], TypeHistoryList["res"]>(
      ERP_HISTORY_GET_LIST,
      req
    ),
  getHistoryDetail: (req: TypeHistoryDetail["req"]) =>
    instance.post<TypeHistoryDetail["req"], TypeHistoryDetail["res"]>(
      ERP_HISTORY_GET_DETAIL,
      req
    ),
  createHistory: (req: TypeHistoryCreate["req"]) =>
    instance.post<TypeHistoryCreate["req"], TypeHistoryCreate["res"]>(
      ERP_HISTORY_CREATE,
      req
    ),
  updateHistory: (req: TypeHistoryUpdate["req"]) =>
    instance.post<TypeHistoryUpdate["req"], TypeHistoryUpdate["res"]>(
      ERP_HISTORY_UPDATE,
      req
    ),
  deleteHistory: (req: TypeHistoryDelete["req"]) =>
    instance.post<TypeHistoryDelete["req"], TypeHistoryDelete["res"]>(
      ERP_HISTORY_DELETE,
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
  apiErpStore,
  apiErpRent,
  apiCommon,
  erpHistoryApi,
};
