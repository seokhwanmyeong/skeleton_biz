import { atom, selector } from "recoil";

type AreaListProps = {
  name: string;
  code: string;
  path: never[] | any[];
}[];

type SlctAreaProps = {
  sido?: {
    slctName: string;
    slctCode: string;
    slctIdx: string;
    slctPath: any[] | never[];
  };
  sigungu?: {
    slctName: string;
    slctCode: string;
    slctIdx: string;
    slctPath: any[] | never[];
  };
};

// ==================== 지역선택 Flow ====================

export const atomAreaState = atom<{ [key: string]: any }>({
  key: "sementicAreaState",
  default: {
    type: "area", // area, custom
    pointer: {
      points: "",
      address: "",
      isCheck: false,
    },
    area: {
      polygon: {},
      sidoCode: "",
      sidoName: "",
      sigunguCode: "",
      sigunguName: "",
      areaCode: "",
      isCheck: false,
    },
  },
});

export const atomFlowEnterArea = atom<SlctAreaProps>({
  key: "flowEnterArea",
  default: {
    sido: {
      slctName: "",
      slctCode: "",
      slctIdx: "",
      slctPath: [],
    },
    sigungu: {
      slctName: "",
      slctCode: "",
      slctIdx: "",
      slctPath: [],
    },
  },
});

export const atomCurrentMapOption = atom({
  key: "atomCurrentMapOption",
  default: {
    zoom: {
      minZoom: 0,
      maxZoom: 0,
    },
    center: {
      lat: 0,
      lng: 0,
    },
  },
});

export const atomSidoLi = atom<AreaListProps>({
  key: "sidoLi",
  default: [],
});

export const atomSigunguLi = atom<AreaListProps>({
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
