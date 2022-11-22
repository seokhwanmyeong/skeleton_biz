import { atom, selector, selectorFamily } from "recoil";

interface SearchOption {
  [key: string]: any;
}

//  Base Option Data
export const atomSearchBaseOption = atom<{ [key: string]: any }>({
  key: "searchBaseOption",
  default: {
    infoCom: {
      title: "InfoCom",
      list: [
        { title: "인구밀도", key: "population" },
        { title: "밀집도", key: "congestion" },
        { title: "매출", key: "benefit" },
      ],
    },
    Secotor: {
      title: "업종",
      mainSector: {
        title: "대분류",
        list: [
          {
            title: "대분류1",
            key: "mainSector01",
            midSector: {
              title: "중분류",
              list: [
                {
                  title: "1-중분류1",
                  key: "midSector01",
                  subSector: {
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
                  key: "midSector02",
                  subSector: {
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
                  key: "midSector03",
                  subSector: {
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
            key: "mainSector02",
            midSector: {
              title: "중분류",
              list: [
                {
                  title: "2-중분류1",
                  key: "midSector01",
                  subSector: {
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
                  key: "midSector02",
                  subSector: {
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
                  key: "midSector03",
                  subSector: {
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
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

//  Atom Search Option
export const atomSementicOption = atom<SearchOption>({
  key: "sementicOption",
  default: {
    zoomLevel: 0,
    selectArea: {
      blockCode: "",
      address: "",
    },
    selectPolygon: "",
    mapType: [],
    secotor: {
      mainSector: "",
      midSector: "",
      subSector: "",
      code: "",
    },
  },
  effects: [sessionStorageEffect("searchOption")],
});

export const selectorSementicOption = selector({
  key: "selectorSementicOption",
  get: ({ get }) => {},
  set: ({ set }) => {},
});

//  Atom InfoCom Option
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
      console.log("Neet Set method value");
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

//  Atom SearchMap Option
export const atomSementicBaseOption = atom<{ [key: string]: any }>({
  key: "sementicBaseOption",
  default: {
    pointer: "",
    sector: {
      mainSector: "",
      midSector: "",
      subSector: "",
      code: "",
    },
    area: "",
  },
});

export const selectorSementicBaseOption = selector({
  key: "selectorSementicBaseOption",
  get: ({ get }) => {},
  set: ({ set }) => {},
});
