//  Lib
import { atom, selectorFamily } from "recoil";
//  Type
import { MainMenuType, SubMenuInteface } from "@util/type/menuType";

export const mainMenu = atom<Array<MainMenuType>>({
  key: "mainMenu",
  default: [
    {
      title: "Home",
      path: "/",
      root: "",
    },
    {
      title: "Map",
      path: "/maps",
      root: "maps",
    },
    {
      title: "ERP",
      path: "/erp",
      root: "erp",
    },
    {
      title: "Guide",
      path: "/guide",
      root: "guide",
    },
  ],
});

export const subMenu = atom<SubMenuInteface>({
  key: "subMenu",
  default: {
    erp: [
      {
        title: "Dash-Board",
        hasChild: false,
        path: "/erp",
        children: [],
      },
      {
        title: "ERP 테이블",
        hasChild: true,
        path: "",
        children: [
          { title: "기본 테이블", path: "/erp/erp01-Sub01" },
          { title: "API 통신테이블", path: "/erp/erp01-Sub02" },
        ],
      },
      {
        title: "erp02",
        hasChild: true,
        path: "",
        children: [
          { title: "erp02-Sub01", path: "/erp/erp02-Sub01" },
          { title: "erp02-Sub02", path: "/erp/erp02-Sub02" },
        ],
      },
      {
        title: "ERP 팝업",
        hasChild: false,
        path: "/erp/erp03",
        children: [],
      },
      {
        title: "Form Sample",
        hasChild: false,
        path: "/erp/erp04",
        children: [],
      },
    ],
  },
});

export const subMenuSelector = selectorFamily({
  key: "subMenuSelect",
  get:
    (key: string) =>
    ({ get }) => {
      const menu = get(subMenu);

      return menu[key];
    },
});
