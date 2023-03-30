//  Lib
import { atom, selector, selectorFamily } from "recoil";
//  Pages: Common
import Login from "@page/login/Login";
//  Pages: Map
import Maps from "@page/maps/Maps";
//  Pages: Erp
import ErpDashBoard from "@page/erp/ErpDashBoard";
import ErpStore from "@page/erp/store/ErpStore";
import ErpStoreDetail from "@page/erp/store/ErpStoreDetail";
import ErpStoreCreate from "@page/erp/store/ErpStoreCreate";
import ErpSale from "@page/erp/sale/ErpSale";
import ErpBsnsDis from "@page/erp/bsnsDis/ErpBsnsDis";
import ErpRent from "@page/erp/rent/ErpRent";
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
import ErpClient from "@page/erp/client/ErpClient";
import ErpClientDetail from "@page/erp/client/ErpClientDetail";
import ErpBrand from "@page/erp/brand/ErpBrand";
import ErpSmart from "@page/erp/smart/ErpSmart";
import ErpNotice from "@page/erp/notice/ErpNotice";

// import ErpDetailSample from "@page/erp/ErpDetailSample";
// import ErpBaseTable from "@page/erp/ErpBaseTable";
//  Icon
import {
  HeaderMenu01,
  HeaderMenu02,
  SubMenu01,
  SubMenu02,
  SubMenu03,
  SubMenu04,
  SubMenu05,
  SubMenu06,
  SubMenu07,
  SubMenu08,
  SubMenu09,
} from "@assets/icons/icon";

type MainRouteType = {
  title: string;
  path: string;
  root: string;
  index?: boolean;
  hasSub: boolean;
  page?: (props: any) => JSX.Element;
  icon?: (color?: HEX) => JSX.Element;
};

type SubRouteType = {
  title: string;
  hasChild: boolean;
  path: string;
  children?: DepthRouteType[];
  page?: (props: any) => JSX.Element;
  isMenu: boolean;
  icon?: (color?: HEX) => JSX.Element;
};

type DepthRouteType = {
  title: string;
  path: string;
  page: (props: any) => JSX.Element;
  isMenu: boolean;
};

type HEX = `#${string}`;

export type { MainRouteType, SubRouteType, DepthRouteType };

export const loginRoute = atom<Array<MainRouteType>>({
  key: "loginRoute",
  default: [
    {
      root: "",
      title: "Login",
      path: "/",
      hasSub: false,
      page: Login,
    },
  ],
});

export const mainRoute = atom<Array<MainRouteType>>({
  key: "mainRoute",
  default: [
    {
      root: "maps",
      title: "상권분석",
      path: "/maps",
      hasSub: false,
      page: Maps,
      icon: (color?: HEX) => {
        return HeaderMenu01(color);
      },
    },
    {
      root: "erp",
      title: "ERP",
      path: "/erp",
      hasSub: true,
      icon: (color?: HEX) => {
        return HeaderMenu02(color);
      },
    },
    {
      root: "mypage",
      title: "마이페이지",
      path: "/mypage",
      hasSub: true,
    },
  ],
});

export const subRoute = atom<{
  [key: string]: SubRouteType[];
}>({
  key: "subRoute",
  default: {
    //  index path = 'index'
    //  key = root _ mainRoute property ,
    //  value = subRoute List
    erp: [
      {
        title: "대쉬보드",
        hasChild: false,
        path: "index",
        page: ErpDashBoard,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu01(color);
        },
      },
      {
        title: "매장",
        hasChild: false,
        path: "store",
        page: ErpStore,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu02(color);
        },
      },
      {
        title: "매장상세보기",
        hasChild: false,
        path: "store/detail",
        page: ErpStoreDetail,
        isMenu: false,
      },
      {
        title: "매장등록",
        hasChild: false,
        path: "store/create",
        page: ErpStoreCreate,
        isMenu: false,
      },
      {
        title: "매출",
        hasChild: false,
        path: "sale",
        page: ErpSale,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu03(color);
        },
      },
      {
        title: "상권",
        hasChild: false,
        path: "bsnsDis",
        page: ErpBsnsDis,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu04(color);
        },
      },
      {
        title: "매물",
        hasChild: false,
        path: "rent",
        page: ErpRent,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu05(color);
        },
      },
      {
        title: "매물상세보기",
        hasChild: false,
        path: "rent/detail",
        page: ErpRentDetail,
        isMenu: false,
      },

      {
        title: "고객",
        hasChild: false,
        path: "client",
        page: ErpClient,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu06(color);
        },
      },
      {
        title: "고객상세보기",
        hasChild: false,
        path: "client/detail",
        page: ErpClientDetail,
        isMenu: false,
      },
      {
        title: "브랜드",
        hasChild: false,
        path: "brand",
        page: ErpBrand,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu07(color);
        },
      },
      {
        title: "Smart",
        hasChild: false,
        path: "smart",
        page: ErpSmart,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu08(color);
        },
      },
      {
        title: "공지",
        hasChild: false,
        path: "notice",
        page: ErpNotice,
        isMenu: true,
        icon: (color?: HEX) => {
          return SubMenu09(color);
        },
      },
      // {
      //   title: "Sample Table",
      //   hasChild: true,
      //   path: "erp02",
      //   isMenu: true,
      //   children: [
      //     {
      //       title: "BaseTable",
      //       path: "erpBaseTable",
      //       page: ErpBaseTable,
      //       isMenu: true,
      //     },
      //   ],
      // },
      // {
      //   title: "상세정보 견본: Tab",
      //   hasChild: false,
      //   path: "erpSample",
      //   page: ErpDetailSample,
      //   isMenu: true,
      // },
    ],
  },
});

export const mainRouteSelector = selector({
  key: "mainRouteSelector",
  get: ({ get }) => {
    return [...get(loginRoute), ...get(mainRoute)];
  },
});

export const headerRouteList = selector({
  key: "headerRouteList",
  get: ({ get }) => {
    return get(mainRoute).filter((li: MainRouteType) => li.root !== "mypage");
  },
});

export const subMenuSelector = selectorFamily({
  key: "subMenuSelect",
  get:
    (root: string) =>
    ({ get }) => {
      const route = get(subRoute);

      return route[root];
    },
});

export const indexChecker = (path: string): boolean => {
  return path === "index";
};
