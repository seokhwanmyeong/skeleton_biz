import { atom, selector } from "recoil";

type TypeFlow =
  | "init"
  | "enter"
  | "sigungu"
  | "dong"
  | "find"
  | "erp"
  | "custom";

export const atomFilterFlow = atom<TypeFlow>({
  key: "sementicFilterFlow",
  default: "init",
});

export const atomUpjongState = atom({
  key: "upjongState",
  default: {
    top: "",
    mid: "",
    bot: "",
  },
});

// ==================== Nice 필터 리스트 ====================

export const infoComFloatPop = atom<{
  filter: any;
  data: any;
  active: boolean;
}>({
  key: "infoComFloatPop",
  default: {
    filter: {
      gender: [],
      age: [],
    },
    data: {},
    active: false,
  },
});

export const infoComResiPop = atom<{
  filter: any;
  data: any;
  active: boolean;
}>({
  key: "infoComResiPop",
  default: {
    filter: {
      gender: [],
      age: [],
    },
    data: {},
    active: false,
  },
});

export const infoComJobPop = atom<{
  filter: any;
  data: any;
  active: boolean;
}>({
  key: "infoComJobPop",
  default: {
    filter: {
      gender: [],
      age: [],
    },
    data: {},
    active: false,
  },
});

export const infoComHousehold = atom<any>({
  key: "infoComHousehold",
  default: {
    data: {},
    active: false,
  },
});

export const infoComSale = atom<any>({
  key: "infoComSale",
  default: {
    data: {},
    active: false,
  },
});

export const infoComUpjongCnt = atom<any>({
  key: "infoComUpjongCnt",
  default: {
    data: {},
    active: false,
  },
});

// 전체 Reset 컨트롤
export const resetNice = selector({
  key: "resetNice",
  get: () => {},
  set: ({ set, reset }) => {
    reset(infoComFloatPop);
    reset(infoComResiPop);
    reset(infoComJobPop);
    reset(infoComHousehold);
    reset(infoComSale);
    reset(infoComUpjongCnt);
  },
});

// Filer에 저장된 data Getter
export const dataCollector = selector({
  key: "dataCollector",
  get: ({ get }) => {
    const data01 = get(infoComFloatPop);
    const data02 = get(infoComResiPop);
    const data03 = get(infoComJobPop);
    const data04 = get(infoComHousehold);
    const data05 = get(infoComSale);
    const data06 = get(infoComUpjongCnt);

    return {
      flow: data01,
      resi: data02,
      job: data03,
      house: data04,
      sale: data05,
      upjong: data06,
    };
  },
  set: ({ set, reset }) => {},
});

// ==================== Nice : Depth 필터 리스트 ====================

export const infoComFlowDepth = atom<any>({
  key: "infoComFlowDepth",
  default: {
    filter: {
      gender: [],
      age: [],
    },
    data: {},
    active: false,
  },
});

export const infoComBrand = atom<any>({
  key: "infoComBrand",
  default: {
    filter: {
      brand: [],
    },
    data: {},
    active: false,
  },
});

export const infoComBuilding = atom<any>({
  key: "infoComBuilding",
  default: {
    filter: {
      brand: [],
    },
    data: {},
    active: false,
  },
});

// 전체 Reset 컨트롤
export const resetNiceDepth = selector({
  key: "resetNiceDepth",
  get: () => {},
  set: ({ set, reset }) => {
    reset(infoComFlowDepth);
    reset(infoComBrand);
    reset(infoComBuilding);
  },
});

// Filer에 저장된 data Getter
export const dataDepthCollector = selector({
  key: "dataDepthCollector",
  get: ({ get }) => {
    const data01 = get(infoComFloatPop);
    const data02 = get(infoComResiPop);
    const data03 = get(infoComJobPop);

    return {
      flow: data01,
      brand: data02,
      building: data03,
    };
  },
  set: ({ set, reset }) => {},
});

// ==================== ERP 필터 리스트 ====================

export type Infocome<Filter> = {
  filter: Filter;
  data: any[];
  active: boolean;
};

export type TypeFilterStore = {
  searchType: "name" | "code" | "owner_name";
  text: string;
  areaCode: string;
  storeType: ["A" | "B" | "C" | "D" | "E"] | [];
  storeStatus: ["open" | "ready" | "rest" | "close" | "etc"] | [];
};

export type TypeFilterBsDis = {
  searchType: "bsDName" | "bsDCode";
  text: string;
  areaCode: string;
  bsDType: ["A" | "B" | "C" | "D" | "E"] | [];
};

export type TypeFilterRent = {
  searchType: "rentName" | "rentCode";
  text: string;
  areaCode: string;
  rentType: ["A" | "B" | "C" | "D" | "E"] | [];
};

export const infoComErpStore = atom<Infocome<TypeFilterStore>>({
  key: "infoComErpStore",
  default: {
    filter: {
      searchType: "name",
      text: "",
      areaCode: "",
      storeType: [],
      storeStatus: [],
    },
    data: [],
    active: false,
  },
});

export const infoComErpBsnsD = atom<Infocome<TypeFilterBsDis>>({
  key: "infoComErpBsnsD",
  default: {
    filter: {
      searchType: "bsDName",
      text: "",
      areaCode: "",
      bsDType: [],
    },
    data: [],
    active: false,
  },
});

export const infoComErpRent = atom<Infocome<TypeFilterRent>>({
  key: "infoComErpRent",
  default: {
    filter: {
      searchType: "rentName",
      areaCode: "",
      text: "",
      rentType: [],
    },
    data: [],
    active: false,
  },
});

// 전체 Reset 컨트롤
export const resetErp = selector({
  key: "resetErp",
  get: () => {},
  set: ({ set, reset }) => {
    reset(infoComErpStore);
    reset(infoComErpBsnsD);
    reset(infoComErpRent);
  },
});

// Filer에 저장된 data Getter
export const dataErpCollector = selector({
  key: "dataErpCollector",
  get: ({ get }) => {
    const data01 = get(infoComErpStore);
    const data02 = get(infoComErpBsnsD);
    const data03 = get(infoComErpRent);

    return {
      store: data01,
      bsnsD: data02,
      rent: data03,
    };
  },
  set: ({ set, reset }) => {},
});
