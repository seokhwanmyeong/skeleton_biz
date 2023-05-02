import { atom, selector } from "recoil";

type TypeFlow =
  | "init"
  | "enter"
  | "sigungu"
  | "dong"
  | "find"
  | "erp"
  | "custom";

type TypeNiceFilter = {
  sex: ("male" | "female")[];
  age: ("20s" | "30s" | "40s" | "50s" | "60s")[];
};

export type RankType = {
  dongCode: string;
  dongName: string;
  rank: number;
  sum: number;
  categoryRanks: any;
};

export const atomFilterFlow = atom<TypeFlow>({
  key: "sementicFilterFlow",
  default: "init",
});

// ==================== Nice 업종 리스트 ====================

export const atomUpjongState = atom({
  key: "upjongState",
  default: {
    top: {
      name: "",
      code: "",
    },
    mid: {
      name: "",
      code: "",
    },
    bot: {
      name: "",
      code: "",
    },
  },
});

export const atomUpjongTopList = atom<any[]>({
  key: "atomUpjongTopList",
  default: [],
});

export const atomUpjongMidList = atom<any[]>({
  key: "atomUpjongMidList",
  default: [],
});

export const atomUpjongBotList = atom<any[]>({
  key: "atomUpjongBotList",
  default: [],
});

// export const setUpjongList = selector({
//   key: "setUpjongList",
//   get: () => {},
//   set: ({ get, set }, position: "top" | "mid" | "bot") => {
//     if (position === "top") {
//       return null;
//     } else if (position === "mid") {
//       return null;
//     } else if (position === "bot") {
//       return null;
//     }
//   },
// });

// ==================== Nice 필터 리스트 ====================

export const infoComFloatPop = atom<{
  filter: TypeNiceFilter;
  show: boolean;
  active: boolean;
}>({
  key: "infoComFloatPop",
  default: {
    filter: {
      sex: ["male", "female"],
      age: ["20s", "30s", "40s", "50s", "60s"],
    },
    show: false,
    active: false,
  },
});

export const infoComResiPop = atom<{
  filter: TypeNiceFilter;
  show: boolean;
  active: boolean;
}>({
  key: "infoComResiPop",
  default: {
    filter: {
      sex: ["male", "female"],
      age: ["20s", "30s", "40s", "50s", "60s"],
    },
    show: false,
    active: false,
  },
});

export const infoComJobPop = atom<{
  filter: TypeNiceFilter;
  show: boolean;
  active: boolean;
}>({
  key: "infoComJobPop",
  default: {
    filter: {
      sex: ["male", "female"],
      age: ["20s", "30s", "40s", "50s", "60s"],
    },
    show: false,
    active: false,
  },
});

export const infoComHousehold = atom<{
  show: boolean;
  active: boolean;
}>({
  key: "infoComHousehold",
  default: {
    show: false,
    active: false,
  },
});

export const infoComSale = atom<{
  show: boolean;
  active: boolean;
}>({
  key: "infoComSale",
  default: {
    show: false,
    active: false,
  },
});

export const infoComUpjongCnt = atom<{
  show: boolean;
  active: boolean;
}>({
  key: "infoComUpjongCnt",
  default: {
    show: false,
    active: false,
  },
});

export const infoComNiceRank = atom<RankType[]>({
  key: "infoComUpjongCnt",
  default: [],
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
    reset(infoComNiceRank);
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

//  나머지 filter getter
export const filterFlowPopCollector = selector({
  key: "filterCollector",
  get: ({ get }) => {},
  set: ({ set, get }) => {
    const resi = get(infoComResiPop);
    const job = get(infoComJobPop);
    const house = get(infoComHousehold);
    const sale = get(infoComSale);
    const ubjongCnt = get(infoComUpjongCnt);

    return {
      resiPop: {
        active: resi.active,
        ...resi.filter,
      },
      jobPop: {
        active: job.active,
        ...job.filter,
      },
      sale: {
        active: sale.active,
      },
      upjongCnt: {
        active: ubjongCnt.active,
      },
      house: {
        active: house.active,
      },
    };
  },
});

// ==================== Nice : Depth 필터 리스트 ====================

export const infoComFlowDepth = atom<any>({
  key: "infoComFlowDepth",
  default: {
    filter: {
      gender: [],
      age: [],
    },
    data: [],
    show: false,
    active: false,
  },
});

export const infoComBrand = atom<any>({
  key: "infoComBrand",
  default: {
    data: [],
    show: false,
    active: false,
  },
});

export const infoComBuilding = atom<any>({
  key: "infoComBuilding",
  default: {
    filter: {
      brand: [],
    },
    data: [],
    show: false,
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
  show: boolean;
};

export type TypeFilterStore = {
  searchType: "name" | "code" | "owner_name";
  text: string;
  // areaCode?: string;
  areaText: string;
  storeType: ("A" | "B" | "C" | "D" | "E")[];
  storeStatus: ("open" | "ready" | "rest" | "close" | "etc")[];
};

export type TypeFilterBsDis = {
  searchType: "bsDName" | "bsDCode";
  text: string;
  // areaCode?: string;
  areaText: string;
  bsDType: ("A" | "B" | "C" | "D" | "E")[];
};

export type TypeFilterRent = {
  searchType: "rentName" | "rentCode";
  text: string;
  // areaCode?: string;
  areaText: string;
  rentType: ("A" | "B" | "C" | "D" | "E")[];
};

export const infoComErpStore = atom<Infocome<TypeFilterStore>>({
  key: "infoComErpStore",
  default: {
    filter: {
      searchType: "name",
      text: "",
      // areaCode: "",
      areaText: "",
      storeType: ["A", "B", "C", "D", "E"],
      storeStatus: ["open", "ready", "rest", "close", "etc"],
    },
    data: [],
    show: false,
    active: false,
  },
});

export const infoComErpBsnsD = atom<Infocome<TypeFilterBsDis>>({
  key: "infoComErpBsnsD",
  default: {
    filter: {
      searchType: "bsDName",
      text: "",
      // areaCode: "",
      areaText: "",
      bsDType: ["A", "B", "C", "D", "E"],
    },
    data: [],
    show: false,
    active: false,
  },
});

export const infoComErpRent = atom<Infocome<TypeFilterRent>>({
  key: "infoComErpRent",
  default: {
    filter: {
      searchType: "rentName",
      text: "",
      // areaCode: "",
      areaText: "",
      rentType: ["A", "B", "C", "D", "E"],
    },
    data: [],
    show: false,
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
