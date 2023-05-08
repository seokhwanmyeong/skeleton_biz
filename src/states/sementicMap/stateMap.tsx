import { atom, selector } from "recoil";

export type AreaProps = {
  name: string;
  code: string;
  path: never[] | any[];
  lat?: number;
  lng?: number;
  zoomLev?: string;
};

export type SlctProps = {
  slctName: string;
  slctCode: string;
  slctIdx: string;
  slctPath: any[] | never[];
  slctLat?: number;
  slctLng?: number;
  slctZoom?: string;
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
      slctPath: [],
      slctLat: undefined,
      slctLng: undefined,
    },
    sigungu: {
      slctName: "",
      slctCode: "",
      slctIdx: "",
      slctPath: [],
      slctLat: undefined,
      slctLng: undefined,
    },
  },
});

export const atomSidoLi = atom<AreaProps[]>({
  key: "sidoLi",
  default: [],
});

export const atomSigunguLi = atom<AreaProps[]>({
  key: "sigunguLi",
  default: [],
});

export const atomDongLi = atom<{ [key: string]: any }>({
  key: "DongLi",
  default: [],
});

export const atomSlctDong = atom<{ [key: string]: any }>({
  key: "flowDongArea",
  default: {
    slctName: "",
    slctCode: "",
    slctIdx: "",
    slctPath: [],
    slctData: [],
    slctRank: null,
  },
});

// 전체 Reset 컨트롤
export const resetHandler = selector({
  key: "resetMapState",
  get: () => {},
  set: ({ set, reset }) => {
    reset(atomFlowEnterArea);
    reset(atomSlctDong);
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
