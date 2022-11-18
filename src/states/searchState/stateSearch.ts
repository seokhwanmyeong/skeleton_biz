import { atom, selector, selectorFamily } from "recoil";

interface SearchOption {
  [key: string]: {
    list: any[];
    area?: {
      blockCode: string;
      address: string;
    };
    zoomLevel?: number;
  };
}

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

export const atomSearchOption = atom<SearchOption>({
  key: "searchOption",
  default: {
    map: {
      list: [],
      area: {
        blockCode: "205020",
        address: "테스트 주소",
      },
      zoomLevel: 0,
    },
    test: {
      list: [],
    },
  },
  effects: [sessionStorageEffect("searchOption")],
});

export const atomOptionList = atom<{ [key: string]: any }>({
  key: "searchOptionList",
  default: {
    optionKey: ["map", "test"],
    map: {
      title: "MapOption",
      list: ["option1", "option2", "option3", "option4", "option5"],
    },
    test: {
      title: "testOption",
      list: ["test1", "test2", "test3", "test4", "test5"],
    },
  },
});

export const selectorSearchOption = selector({
  key: "selectorSearchOption",
  get: ({ get }) => {
    return get(atomSearchOption);
  },
  set: ({ set, get }, newValue: any) => {
    const { optionCate, eventType, optionVal } = newValue;
    const options = get(atomSearchOption);
    const optionList: (string | number)[] = options[optionCate].list;
    const isInclude: boolean = optionList.includes(optionVal);
    let newList = [];

    if (eventType === "add" && !isInclude) {
      newList = [...optionList, optionVal];
    } else if (eventType === "remove" && isInclude) {
      newList = optionList.filter((li) => li !== optionVal);
    } else {
      return;
    }

    set(atomSearchOption, {
      ...options,
      [optionCate]: {
        ...options[optionCate],
        list: newList,
      },
    });

    return;
  },
});
