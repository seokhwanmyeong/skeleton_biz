import { atom, selector } from "recoil";
import type { TypeMapGeo } from "@src/api/bizSub/type";

// export type AreaProps = {
//   name: string;
//   code: string;
//   path: never[] | any[];
//   lat?: number;
//   lng?: number;
//   zoomLev?: string;
// };

export type AreaProps = {
  _id: string;
  megaNm: string;
  megaCd: string;
  center: string;
  ctyCd: string;
  ctyNm: string;
  admiCd: string;
  admiNm: string;
  zoomLevel: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  idx: string;
  bounds: number[][] | null;
  feature: {
    type: string;
    geometry: TypeMapGeo;
    [x: string]: any;
  };
};

export type TransAreaProps = {
  _id: string;
  megaNm: string;
  megaCd: string;
  center: string;
  ctyCd: string;
  ctyNm: string;
  admiCd: string;
  admiNm: string;
  zoomLevel: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  idx: string;
  bounds: number[][] | null;
  feature: {
    type: string;
    geometry?: TypeMapGeo;
    [x: string]: any;
  };
};

export type TransDongProps = {
  _id: string;
  megaNm: string;
  megaCd: string;
  center: string;
  ctyCd: string;
  ctyNm: string;
  admiCd: string;
  admiNm: string;
  zoomLevel: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  idx: number;
  bounds: number[][] | null;
  feature: {
    type: string;
    geometry?: TypeMapGeo;
    [x: string]: any;
  };
};

export type SlctProps = {
  slctName: string;
  slctCode: string;
  slctIdx: string;
  slctPath?: {
    type: string;
    geometry?: TypeMapGeo;
    [x: string]: any;
  };
  slctLat?: number;
  slctLng?: number;
  slctZoom?: string;
  slctBounds?: number[][] | null;
};

export type SlctDong = {
  slctName: string;
  slctCode: string;
  slctIdx: string;
  slctPath?: {
    type: string;
    geometry?: TypeMapGeo;
    [x: string]: any;
  };
  slctLat?: number;
  slctLng?: number;
  slctZoom?: string;
  slctBounds?: number[][] | null;
  slctData?: any;
  slctRank?: number;
  slctId?: string;
};

export type SlctAreaProps = {
  sido?: SlctProps;
  sigungu?: SlctProps;
};

// ==================== 지역선택 Flow ====================
export const atomFlowEnterArea = atom<SlctAreaProps>({
  key: "flowEnterArea",
  default: {
    sido: {
      slctName: "",
      slctCode: "",
      slctIdx: "",
      slctPath: undefined,
      slctLat: undefined,
      slctLng: undefined,
    },
    sigungu: {
      slctName: "",
      slctCode: "",
      slctIdx: "",
      slctPath: undefined,
      slctLat: undefined,
      slctLng: undefined,
    },
  },
});

export const atomSidoLi = atom<TransAreaProps[]>({
  key: "sidoLi",
  default: [],
});

export const atomSigunguLi = atom<TransAreaProps[]>({
  key: "sigunguLi",
  default: [],
});

export const atomDongLi = atom<TransDongProps[]>({
  key: "DongLi",
  default: [],
});

export const atomSlctDong = atom<SlctDong>({
  key: "flowDongArea",
  default: {
    slctName: "",
    slctCode: "",
    slctIdx: "",
    slctPath: undefined,
    slctData: undefined,
    slctRank: undefined,
    slctId: undefined,
  },
});

// 전체 Reset 컨트롤
export const resetHandler = selector({
  key: "resetMapState",
  get: () => {},
  set: ({ set, reset }) => {
    reset(atomFlowEnterArea);
    reset(atomSlctDong);
    reset(atomFlowEnterArea);
    reset(atomDongLi);
    reset(atomSigunguLi);
  },
});

// ==================== 영역선택 Flow ====================

export const atomSlctCustom = atom<{
  areaType: "dong" | "polygon" | "circle" | null;
  slctName: string;
  pathType: string;
  slctPath?: any[];
  center?: any;
  range?: any;
}>({
  key: "flowCustomArea",
  default: {
    areaType: null,
    slctName: "",
    slctPath: [],
    pathType: "",
    center: null,
    range: null,
  },
});

export const atomCreateArea = atom<{
  pathType: "circle" | "polygon" | undefined;
  path?: any[];
  center?: any;
  range?: number;
}>({
  key: "createArea",
  default: {
    pathType: undefined,
    path: [],
    range: 0,
    center: null,
  },
});
