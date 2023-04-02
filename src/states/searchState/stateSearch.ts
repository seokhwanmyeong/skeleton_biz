import { atom, atomFamily, selector, selectorFamily } from "recoil";

type SearchOption = {
  [key: string]: any;
};

//  Atom Effect Handler
const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedOption = localStorage.getItem(key);
    if (savedOption != null) {
      setSelf(JSON.parse(savedOption));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        if (
          newValue.pointer.isCheck &&
          newValue.area.isCheck &&
          newValue.sector.isCheck
        ) {
          setSelf({ ...newValue, baseCheck: true });
          localStorage.setItem(
            key,
            JSON.stringify({ ...newValue, baseCheck: true })
          );
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      }
    });
  };

//  Atom Search Option
export const atomSementicState = atom<SearchOption>({
  key: "sementicState",
  default: {
    pointer: {
      coord: {},
      address: "",
      isCheck: false,
    },
    area: {
      polygon: {},
      isCheck: true,
    },
    sector: {
      mainSector: "",
      midSector: "",
      subSector: "",
      code: "",
      isCheck: false,
    },
    infoCom: [],
    baseCheck: false,
  },
  effects: [sessionStorageEffect("sementicState")],
});

export const collectSementicState = selector({
  key: "collectSementicState",
  get: ({ get }) => {},
  set: ({ get, set }, key: any) => {
    const sementicState = get(atomSementicState);
    const atomList: any = {
      pointer: atomAreaOption,
      area: atomAreaOption,
      sector: atomSementicUpjong,
      // infoCom: atomInfoCom,
    };
    const atomData: any = get(atomList[key]);
    const newVal = key === ("pointer" || "area") ? atomData[key] : atomData;

    set(atomSementicState, {
      ...sementicState,
      [key]: { ...newVal, isCheck: true },
    });
  },
});

//  Check State
export const checkBaseState = selector({
  key: "checkBaseState",
  get: ({ get }) => {
    const map = get(atomAreaOption);

    return map.allCheck ? true : false;
  },
  set: ({ get, set }) => {},
});

//  Reset Handler _ atom (Map & Controll, Upjong, InfoCom)
export const resetSementicAtom = selector({
  key: "resetSementicAtom",
  get: () => {},
  set: ({ reset }) => {
    reset(atomAreaOption);
    reset(atomMapController);
    reset(atomSementicUpjong);
    reset(atomInfoCom);

    reset(infoComFloatPop);
    reset(infoComHousehold);
    reset(infoComUpjong);
    reset(infoComSale);
    reset(infoComMyStore);
    reset(infoComMyBsns);
    reset(infoComMyRent);
  },
});

//  State & Controll: Map(pointer, area) _ atom, selector
type ControllState = {
  [key: string]: any;
};

export const atomAreaOption = atom<{ [key: string]: any }>({
  key: "sementicMapState",
  default: {
    type: "area",
    activeState: false,
    address: null,
    polygon: null,
    pointer: {
      coord: {},
      address: "",
      isCheck: false,
    },
    area: {
      polygon: {},
      isCheck: true,
    },
    allCheck: false,
  },
});

export const selectorSementicMapState = selector({
  key: "selectorsementicMapState",
  get: ({ get }) => {},
  set: ({ get, set }, newVal: any) => {
    const { pointer, area } = newVal;

    set(atomAreaOption, {
      ...newVal,
      allCheck: pointer.isCheck && area.isCheck ? true : false,
    });
  },
});

export const areaSelectActivator = selector({
  key: "mapControllHandler",
  get: ({ get }) => {
    const mapControllState = get(atomMapController);

    return mapControllState.event;
  },
  set: ({ get, set }, val: any) => {
    const currentState = get(atomMapController);

    set(atomMapController, {
      ...currentState,
      event: val,
    });
  },
});

//  State: Upjong _ atom, selector
type Upjong = {
  mainUpjong: {
    title: string;
    code: string;
  };
  midUpjong: {
    title: string;
    code: string;
  };
  subUpjong: {
    title: string;
    code: string;
  };
  currentCode: string;
  allCheck: boolean;
};

export const atomSementicUpjong = atom<Upjong>({
  key: "sementicUpjong",
  default: {
    mainUpjong: {
      title: "",
      code: "",
    },
    midUpjong: {
      title: "",
      code: "",
    },
    subUpjong: {
      title: "",
      code: "",
    },
    currentCode: "",
    allCheck: false,
  },
});

export const selectorSementicUpjong = selector({
  key: "selectorSementicSector",
  get: ({ get }) => {},
  set: ({ set, get }, newVal: any) => {
    const sementicSector = get(atomSementicUpjong);

    set(atomSementicUpjong, { ...newVal, allCheck: true });
  },
});

//  State: InfoCom _ atom, selector
export const atomInfoCom = atom<string[]>({
  key: "infoCom",
  default: [],
});

export const selectorInfoCom = selector({
  key: "selectorInfoCom",
  get: ({ get }) => {},
  set: ({ set, get }, key: any) => {
    const infoComs = get(atomInfoCom);
    let newVal: string[] = infoComs.includes(key)
      ? infoComs.filter((li: string) => li !== key)
      : [...infoComs, key];

    newVal.length > 4 ? alert("선택제한 : 4") : set(atomInfoCom, newVal);
  },
});

export const atomMapController = atom<ControllState>({
  key: "atomMapController",
  default: {
    event: null,
  },
});

// 지역선택(맵 & 주소)
export const atomArea = atom<any>({
  key: "atomArea",
  default: {
    slctAreaName: null,
    slctAreaCode: null,
    eventName: "selectAreaHandler",
  },
});

// 필터 공통 그룹옵션

export const infoComFloatPop = atom<any>({
  key: "infoComFloatPop",
  default: {
    data: {},
    active: false,
  },
});

export const infoComResiPop = atom<any>({
  key: "infoComResiPop",
  default: {
    data: {},
    active: false,
  },
});

export const infoComJobPop = atom<any>({
  key: "infoComJobPop",
  default: {
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

export const infoComUpjong = atom<{ name: string | null; code: string | null }>(
  {
    key: "infoComUpjong",
    default: {
      name: null,
      code: null,
    },
  }
);

export const infoComUpjongCnt = atom<any>({
  key: "infoComUpjongCnt",
  default: {
    data: {},
    active: false,
    // type: "externalData",
    // category: "upjong",
    // title: "업종 수",
    // baseFilter: {},
    // req: {},
    // res: [],
    // activeView: false,
    // apiType: "nice",
    // apiEvent: null,
  },
});

export const infoComSale = atom<any>({
  key: "infoComSale",
  default: {
    data: {},
    active: false,
    // type: "externalData",
    // category: "sale",
    // title: "매출",
    // baseFilter: {},
    // req: {},
    // res: [],
    // activeView: false,
    // apiType: "nice",
    // apiEvent: null,
  },
});

export const infoComBrandStandard = atom<any>({
  key: "infoComBrandSet",
  default: {
    type: "externalData",
    category: "brandStandard",
    title: "브랜드 필터",
    baseFilter: {},
    req: {},
    res: [],
    activeView: false,
    apiType: "nice",
    apiEvent: null,
  },
});

export const infoComBrand = atom<any>({
  key: "infoComBrand",
  default: {
    type: "externalData",
    category: "brand",
    title: "사업체 조회",
    baseFilter: {},
    req: {},
    res: [],
    activeView: false,
    apiType: "nice",
    apiEvent: null,
  },
});

export const infoComBuilding = atom<any>({
  key: "infoComBuilding",
  default: {
    type: "externalData",
    category: "building",
    title: "건물조회",
    baseFilter: {},
    req: {},
    res: [],
    activeView: false,
    apiType: "nice",
    apiEvent: null,
  },
});

export const infoComMyStore = atom<any>({
  key: "infoComMyStore",
  default: {
    data: [],
    active: false,
    // type: "brandData",
    // category: "store",
    // title: "매장조회",
    // baseFilter: {},
    // req: {},
    // res: [],
    // activeView: false,
    // apiType: "nice",
    // apiEvent: null,
  },
});

export const infoComMyBsns = atom<any>({
  key: "infoComMyBsns",
  default: {
    data: [],
    active: false,
    // type: "brandData",
    // category: "bsns",
    // title: "상권조회",
    // baseFilter: {},
    // req: {},
    // res: [],
    // activeView: false,
    // apiType: "nice",
    // apiEvent: null,
  },
});

export const infoComMyRent = atom<any>({
  key: "infoComMyRent",
  default: {
    data: [],
    active: false,
    // type: "brandData",
    // category: "rent",
    // title: "매물조회",
    // baseFilter: {},
    // req: {},
    // res: [],
    // activeView: false,
    // apiType: "nice",
    // apiEvent: null,
  },
});

export const sementicViewState = atom<any>({
  key: "sementicViewState",
  default: {
    viewId: "",
    props: null,
  },
});
