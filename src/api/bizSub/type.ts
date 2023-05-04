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

export type {
  BixApiInstance,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
  TypeSigunguRank,
  TypeNiceStore,
  TypeNiceFlowPop,
  TypeNiceFlowData,
};