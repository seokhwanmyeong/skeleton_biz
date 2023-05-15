import {
  TypeFilterBsDis,
  TypeFilterRent,
  TypeFilterStore,
} from "@states/sementicMap/stateFilter";
import { AxiosInstance } from "axios";

interface AxiosInterceptorManager {}
type AxiosRequestConfig = {};
interface BixApiInstance extends AxiosInstance {
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

type TypeMapArea = {
  _id: string;
  megaNm: string;
  megaCd: string;
  center: string;
  bounds: string;
  ctyCd: string;
  ctyNm: string;
  admiCd: string;
  admiNm: string;
  zoomLevel: string;
  geometry?: TypeMapGeo;
};

type TypeMapGeo = {
  coordinates?: [number, number][][] | [];
};

type TypeMapSido = {
  req: {};
  res: {
    data: TypeMapArea[];
  };
};

type TypeMapSigungu = {
  req: {
    megaCd: string;
  };
  res: {
    data: TypeMapArea[];
  };
};

type TypeMapDong = {
  req: {
    ctyCd: string;
  };
  res: {
    data: TypeMapArea[];
  };
};

type TypeUpjongGet = {
  res: {
    data: {
      dong: {
        code: string;
        name: string;
      }[];
    };
  };
};

type TypeUpjongPost = {
  req: { code: string };
  res: {
    data: {
      dong: {
        code: string;
        name: string;
      }[];
    };
  };
};

type TypeSigunguRank = {
  req: {
    upjongCd: string;
    code: string;
    flowPop: {
      active: boolean;
      sex: ("man" | "woman")[];
      age: ("20" | "30" | "40" | "50" | "60")[];
    };
    resiPop: {
      active: boolean;
      sex: ("man" | "woman")[];
      age: ("20" | "30" | "40" | "50" | "60")[];
    };
    jobPop: {
      active: boolean;
      sex: ("man" | "woman")[];
      age: ("20" | "30" | "40" | "50" | "60")[];
    };
    sale: {
      active: boolean;
    };
    upjongCnt: {
      active: boolean;
    };
    house: {
      active: boolean;
    };
  };
  res: any;
};

type TypeNiceStore = {
  req: {
    upjongCd: string;
    pageNo: number;
    ctyCd?: string;
    admiCd?: string;
    range?: number;
    xAxis?: number;
    yAxis?: number;
    wkt?: Array<Array<Array<[number, number]>>>;
  };
  res: {
    storeNm: string;
    newAddr: string;
    oldAddr: string;
    upjongNm: string;
    xAxis: number;
    yAxis: number;
  }[];
};

type TypeNiceFlowPop = {
  req: {
    upjongCd: string;
    ctyCd?: string;
    admiCd?: string;
    range?: number;
    xAxis?: number;
    yAxis?: number;
    wkt?: Array<Array<Array<[number, number]>>>;
  };
  res: TypeNiceFlowData[][];
};

type TypeNiceFlowData = {
  id: string;
  xAxis: number;
  yAxis: number;
  flowPop: number;
  blkCd: string;
  label: string;
  cumedist: number;
  flowLv: number;
};

type TypeNiceSido = {
  req: {};
  res: {
    data: {
      megaNm: string;
      megaCd: string;
    }[];
  };
};

type TypeNiceSigungu = {
  req: {
    megaCd: string;
  };
  res: {
    data: {
      ctyCd: string;
      ctyNm: string;
    }[];
  };
};

type TypeNiceDong = {
  req: {
    ctyCd: string;
  };
  res: {
    data: {
      admiCd: string;
      admiNm: string;
    }[];
  };
};

type TypeMapStoreSearch = {
  req: TypeFilterStore;
  res: {
    _id: string;
    storeName: string;
    lat: number;
    lng: number;
  };
};

type StoreInfo = {
  _id: string;
  storeName: string;
  storeCode: string;
  storeStatus: "open" | "ready" | "rest" | "close" | "etc";
  storeType?: "A" | "B" | "C" | "D" | "E";
  storePhone?: string;
  bsNum?: string;
  ownerName: string;
  ownerPhone: string;
  addrNew: string;
  addrOld: string;
  addrDetail?: string;
  linkBsDis?: {
    bsDisName: string;
    bsDisCode: string;
  }[];
  lat: number;
  lng: number;
};

type TypeMapStoreInfo = {
  req: {
    id: string;
  };
  res: {
    data: StoreInfo;
  };
};

type TypeMapBsDisSearch = {
  req: TypeFilterBsDis;
  res: {
    _id: string;
    bsDisName: string;
    polygon: [number[]];
    center: [number, number];
    polygonType: "single" | "multi";
  };
};

type TypeMapBsDisInfo = {
  req: {
    id: string;
  };
  res: {
    _id: string;
    bsDisName: string;
    bsDisCode: string;
    bsDisType: "A" | "B" | "C" | "D" | "E";
    linkStore?: {
      storeCode: string;
      storeName: number;
    }[];
  };
};

type TypeMapRentSearch = {
  req: TypeFilterRent;
  res: {
    _id: string;
    rentName: string;
    addr: string;
    lat: number;
    lng: number;
  };
};

type TypeMapRentInfo = {
  req: {
    id: string;
  };
  res: {
    _id: string;
    rentName: string;
    rentType?: "A" | "B" | "C" | "D" | "E";
    availableDay: string;
    curUpjong?: string;
    realArea?: number;
    floor?: number;
    rentalFee?: number;
    depositFee?: number;
    premiumFee?: number;
    manageFee?: number;
    addrNew: string;
    addrOld: string;
    addrDetail?: string;
    nearbyStore?: {
      storeName: string;
      distance: number;
      addr: string;
      addrDetail: string;
      lat: number;
      lng: number;
    }[];
    img?: string[];
    lat: number;
    lng: number;
  };
};

export type {
  BixApiInstance,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeUpjongGet,
  TypeUpjongPost,
  TypeSigunguRank,
  TypeNiceStore,
  TypeNiceFlowPop,
  TypeNiceFlowData,
  TypeMapArea,
  TypeMapGeo,
  TypeNiceSido,
  TypeNiceSigungu,
  TypeNiceDong,
  TypeMapStoreSearch,
  TypeMapBsDisSearch,
  TypeMapRentSearch,
  TypeMapStoreInfo,
  StoreInfo,
  TypeMapBsDisInfo,
  TypeMapRentInfo,
};
