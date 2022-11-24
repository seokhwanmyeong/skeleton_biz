import { atom, atomFamily, selector, selectorFamily } from "recoil";

interface SearchOption {
  [key: string]: any;
}

//  Base Option Data
export const atomSementicBaseList = atom<{ [key: string]: any }>({
  key: "sementicBaseList",
  default: {
    infoCom: {
      title: "InfoCom",
      content: [
        {
          title: "인구",
          cate: "popu",
          list: [
            { title: "인구밀도", key: "population" },
            { title: "밀집도", key: "congestion" },
            { title: "성비", key: "gender" },
          ],
        },
        {
          title: "업종",
          cate: "upjong",
          list: [
            { title: "업종1", key: "upjong1" },
            { title: "업종2", key: "upjong2" },
            { title: "업종3", key: "upjong3" },
          ],
        },
      ],
    },
    upjong: {
      title: "업종",
      mainUpjong: {
        title: "대분류",
        list: [
          {
            title: "Total",
            key: "totalUpjong",
            code: "total",
          },
          {
            title: "대분류1",
            key: "mainUpjong01",
            code: "m01",
            midUpjong: {
              title: "중분류",
              list: [
                {
                  title: "1-중분류1",
                  key: "midUpjong01",
                  code: "mid0101",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "1-1-소분류1", key: "111", code: "111" },
                      { title: "1-1-소분류2", key: "112", code: "112" },
                      { title: "1-1-소분류3", key: "113", code: "113" },
                    ],
                  },
                },
                {
                  title: "1-중분류2",
                  key: "midUpjong02",
                  code: "mid0102",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "1-2-소분류1", key: "121", code: "121" },
                      { title: "1-2-소분류2", key: "122", code: "122" },
                      { title: "1-2-소분류3", key: "123", code: "123" },
                    ],
                  },
                },
                {
                  title: "1-중분류3",
                  key: "midUpjong03",
                  code: "mid0103",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "1-3-소분류1", key: "131", code: "131" },
                      { title: "1-3-소분류2", key: "132", code: "132" },
                      { title: "1-3-소분류3", key: "133", code: "133" },
                    ],
                  },
                },
                {
                  title: "1-중분류4",
                  key: "midUpjong04",
                  code: "mid0104",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "1-3-소분류1", key: "131", code: "131" },
                      { title: "1-3-소분류2", key: "132", code: "132" },
                      { title: "1-3-소분류3", key: "133", code: "133" },
                    ],
                  },
                },
                {
                  title: "1-중분류5",
                  key: "midUpjong05",
                  code: "mid0105",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "1-3-소분류1", key: "131", code: "131" },
                      { title: "1-3-소분류2", key: "132", code: "132" },
                      { title: "1-3-소분류3", key: "133", code: "133" },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "대분류2",
            key: "mainUpjong02",
            code: "m2",
            midUpjong: {
              title: "중분류",
              list: [
                {
                  title: "2-중분류1",
                  key: "midUpjong01",
                  code: "mid0201",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "2-1-소분류1", key: "211", code: "211" },
                      { title: "2-1-소분류2", key: "212", code: "212" },
                      { title: "2-1-소분류3", key: "213", code: "213" },
                    ],
                  },
                },
                {
                  title: "2-중분류2",
                  key: "midUpjong02",
                  code: "mid0202",
                  subUpjong: {
                    title: "소분류",
                    list: [
                      { title: "2-2-소분류1", key: "221", code: "221" },
                      { title: "2-2-소분류2", key: "222", code: "222" },
                      { title: "2-2-소분류3", key: "223", code: "223" },
                    ],
                  },
                },
                {
                  title: "2-중분류3",
                  key: "midUpjong03",
                  code: "mid0203",
                  subUpjong: {
                    titl: "소분류",
                    list: [
                      { title: "2-3-소분류1", key: "231", code: "231" },
                      { title: "2-3-소분류2", key: "232", code: "232" },
                      { title: "2-3-소분류3", key: "233", code: "233" },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "대분류3",
            key: "mainUpjong03",
          },
          {
            title: "대분류4",
            key: "mainUpjong04",
          },
          {
            title: "대분류5",
            key: "mainUpjong05",
          },
        ],
      },
    },
  },
});

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
      pointer: atomSementicMapState,
      area: atomSementicMapState,
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
    const sementicState = get(atomSementicState);

    return sementicState.baseCheck;
  },
  set: ({ get, set }) => {},
});

//  Reset Handler _ atom (Map & Controll, Upjong, InfoCom)
export const resetSementicAtom = selector({
  key: "resetSementicAtom",
  get: () => {},
  set: ({ reset }) => {
    reset(atomSementicMapState);
    reset(atomMapControllState);
    reset(atomSementicUpjong);
    reset(atomInfoCom);
  },
});

//  State & Controll: Map(pointer, area) _ atom, selector
export const atomSementicMapState = atom<{ [key: string]: any }>({
  key: "sementicMapState",
  default: {
    pointer: {
      coord: {},
      address: "",
    },
    area: {
      polygon: {},
    },
  },
});

export const selectorSementicMapState = selector({
  key: "selectorsementicMapState",
  get: ({ get }) => {},
  set: ({ get, set }, { key, val }: any) => {
    const sementicMapState = get(atomSementicMapState);

    if (key === "pointer") {
      const { coord, address, isCheck } = val;
      const newPointer = {
        coord: coord,
        address: address,
      };
      set(atomSementicMapState, { ...sementicMapState, pointer: newPointer });
    } else if (key === "area") {
      const { polygon, isCheck } = val;
      const newPolygon = {
        polygon: polygon,
      };

      set(atomSementicMapState, { ...sementicMapState, polygon: newPolygon });
    } else {
      console.log('Check Props: property = "key"');
    }
  },
});

type ControllState = {
  [key: string]: string | number | boolean;
};

export const atomMapControllState = atom<ControllState>({
  key: "mapControllState",
  default: {
    zoomLevel: 0,
    activePoint: false,
    activePolygon: false,
  },
});

export const mapControllHandler = selector({
  key: "mapControllHandler",
  get: () => {},
  set: ({ get, set }, key: any) => {
    const currentState = get(atomMapControllState);

    set(atomMapControllState, { ...currentState, [key]: !currentState[key] });
  },
});

//  State: Upjong _ atom, selector
export const atomSementicUpjong = atom<Upjong>({
  key: "sementicUpjong",
  default: {
    mainUpjong: {
      title: "Total",
      code: "total",
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
  },
});

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
};

export const selectorSementicUpjong = selector({
  key: "selectorSementicSector",
  get: ({ get }) => {},
  set: ({ set, get }, newVal: any) => {
    const sementicSector = get(atomSementicUpjong);

    set(atomSementicUpjong, newVal);
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
  set: ({ set, get }, { method, infoCom }: any) => {
    const infoComs = get(atomInfoCom);
    let newVal: string[] = [];

    if (!method) {
      console.log('Check Props: property = "method"');
      return;
    } else if (method === "add") {
      newVal = infoComs.includes(infoCom) ? infoComs : [...infoComs, infoCom];
    } else if (method === "remove") {
      newVal =
        infoComs.length > 0
          ? infoComs.filter((li: string) => li !== infoCom)
          : [];
    }

    set(atomInfoCom, newVal);
  },
});
