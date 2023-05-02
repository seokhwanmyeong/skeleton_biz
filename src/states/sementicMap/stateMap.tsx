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

export const atomSlctCustom = atom<{ [key: string]: any }>({
  key: "flowCustomArea",
  default: {
    slctName: "",
    slctPath: [],
    pathType: "",
    center: null,
  },
});

export const atomCreateArea = atom({
  key: "createArea",
  default: {
    pathType: "",
    path: [],
    center: null,
  },
});

// ==================== 매장/마커/상권 클릭 이벤트 ====================
export const atomSlctErp = atom<{
  erpType?: "store" | "rent" | "bsDis";
  name: string;
  id: string;
  hoverId?: string;
}>({
  key: "atomSlctErp",
  default: {
    erpType: undefined,
    name: "",
    id: "",
    hoverId: "",
  },
});

// ==================== 나이스 클릭 이벤트 ====================
export const atomSlctNice = atom<{
  niceType?: "pop" | "brand";
  name: string;
  id: string;
  hoverId?: string;
}>({
  key: "atomSlctNice",
  default: {
    niceType: undefined,
    name: "",
    id: "",
    hoverId: "",
  },
});
