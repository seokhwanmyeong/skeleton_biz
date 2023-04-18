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
    username: string;
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

type TypeMapBsDisSearch = {
  req: TypeFilterBsDis;
  res: {
    _id: string;
    bisName: string;
    polygon: [number[]];
    center: [number, number];
    polygonType: "single" | "multi";
  };
};

type TypeMapRentSearch = {
  req: TypeFilterRent;
  res: {
    _id: string;
    rentName: string;
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

export type {
  BixApiInstance,
  TypeLogin,
  TypeMapStoreSearch,
  TypeMapBsDisSearch,
  TypeMapRentSearch,
  TypeMapSido,
  TypeMapSigungu,
  TypeMapDong,
};
