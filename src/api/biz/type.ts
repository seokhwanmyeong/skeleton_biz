import {
  TypeFilterBsDis,
  TypeFilterRent,
  TypeFilterStore,
} from "@src/states/sementicMap/stateFilter";
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

type TypeLogin = {
  req: {
    email: string;
    password: string;
  };
  res: {
    accessToken: string;
    expiresIn: number;
    userData: {
      id: number | undefined;
      username: string;
      password: string;
    };
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

type TypeMapStoreInfo = {
  req: {
    id: string;
  };
  res: {
    _id: string;
    storeName: string;
    storeCode: string;
    storeStatus: "open" | "ready" | "rest" | "close" | "etc";
    storeType?: "A" | "B" | "C" | "D" | "E";
    storePhone?: string;
    bsNum?: string;
    ownerName: string;
    ownerPhone: string;
    addr: string;
    addrDetail?: string;
    linkBsDis?: {
      bsDisName: string;
      bsDisCode: string;
    }[];
    lat: number;
    lng: number;
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
    addr: string;
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

type TypeMapSido = {
  res: {
    data: {
      sido: {
        name: string;
        code: string;
        lat: number;
        lng: number;
        zoomLev: string;
        path: any[];
      }[];
    };
  };
};

type TypeMapSigungu = {
  req: { code: string };
  res: {
    data: {
      sigungu: {
        name: string;
        code: string;
        lat: number;
        lng: number;
        zoomLev: string;
        path: any[];
      }[];
    };
  };
};

type TypeMapDong = {
  req: { code: string };
  res: {
    data: {
      dong: {
        name: string;
        code: string;
        lat: number;
        lng: number;
        zoomLev: string;
        path: any[];
      }[];
    };
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
      age: ("20s" | "30s" | "40s" | "50s" | "60s")[];
    };
    resiPop: {
      active: boolean;
      sex: ("man" | "woman")[];
      age: ("20s" | "30s" | "40s" | "50s" | "60s")[];
    };
    jobPop: {
      active: boolean;
      sex: ("man" | "woman")[];
      age: ("20s" | "30s" | "40s" | "50s" | "60s")[];
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

type TypeHistoryStoreList = {
  req: any;
  res: any;
};

type TypeHistoryStoreDetail = {
  req: any;
  res: any;
};

type TypeHistoryStoreForm = {
  req: any;
  res: any;
};

type TypeHistoryRentList = {
  req: any;
  res: any;
};

type TypeHistoryRentDetail = {
  req: any;
  res: any;
};

type TypeHistoryRentForm = {
  req: any;
  res: any;
};

export type {
  BixApiInstance,
  TypeLogin,
  TypeMapStoreSearch,
  TypeMapBsDisSearch,
  TypeMapRentSearch,
  TypeMapStoreInfo,
  TypeMapBsDisInfo,
  TypeMapRentInfo,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeUpjongGet,
  TypeUpjongPost,
  TypeSigunguRank,
  TypeHistoryStoreList,
  TypeHistoryStoreDetail,
  TypeHistoryStoreForm,
  TypeHistoryRentList,
  TypeHistoryRentDetail,
  TypeHistoryRentForm,
};
