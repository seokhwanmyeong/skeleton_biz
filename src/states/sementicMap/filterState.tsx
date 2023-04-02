import { atom, selector } from "recoil";

export const atomFilterFlow = atom({
  key: "sementicFilterFlow",
  default: 0,
});

export const atomUpjongState = atom({
  key: "upjongState",
  default: {
    top: "",
    mid: "",
    bot: "",
  },
});

// 필터 공통 그룹옵션

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
