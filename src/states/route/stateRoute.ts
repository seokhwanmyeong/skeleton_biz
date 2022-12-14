//  Lib
import { atom, selector, selectorFamily } from "recoil";
//  Pages: Common
import Login from "@page/login/Login";
import Join from "@page/Join";
import Guide from "@page/Guide";
//  Pages: Map
import Maps from "@page/Maps";
//  Pages: Erp
import ErpDashBoard from "@page/erp/ErpDashBoard";
import ErpStoreDetail from "@page/erp/ErpStoreDetail";
import ErpStore from "@page/erp/store/ErpStore";
import ErpSale from "@page/erp/sale/ErpSale";
import ErpArea from "@page/erp/area/ErpArea";
// import ErpCustomer from "@page/erp/customer/ErpCustomer";
import ErpBrand from "@page/erp/brand/ErpBrand";

import ErpDetailSample from "@page/erp/ErpDetailSample";
import ErpBaseTable from "@page/erp/ErpBaseTable";
import ErpPop from "@page/erp/ErpPop";
//  Pages: Mypage
import MyPage from "@page/mypage/MyPage";
import MyPageCompany from "@page/mypage/MyPageCompany";

type MainRouteType = {
  title: string;
  path: string;
  root: string;
  index?: boolean;
  hasSub: boolean;
  page?: (props: any) => JSX.Element;
};

type SubRouteType = {
  title: string;
  hasChild: boolean;
  path: string;
  children?: DepthRouteType[];
  page?: (props: any) => JSX.Element;
  isMenu: boolean;
};

type DepthRouteType = {
  title: string;
  path: string;
  page: (props: any) => JSX.Element;
  isMenu: boolean;
};

export type { MainRouteType, SubRouteType, DepthRouteType };

export const loginRoute = atom<Array<MainRouteType>>({
  key: "loginRoute",
  default: [
    {
      root: "",
      title: "Login",
      path: "",
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
      title: "Map",
      path: "/maps",
      hasSub: false,
      page: Maps,
    },
    {
      root: "erp",
      title: "ERP",
      path: "/erp",
      hasSub: true,
    },
    {
      root: "mypage",
      title: "My Page",
      path: "/mypage",
      hasSub: true,
    },
    // {
    //   root: "guide",
    //   title: "Guide",
    //   path: "/guide",
    //   hasSub: false,
    //   page: Guide,
    // },
  ],
});

export const commonRoute = atom<Array<MainRouteType>>({
  key: "commonRoute",
  default: [
    {
      root: "join",
      title: "Join",
      path: "/join",
      hasSub: false,
      page: Join,
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
        title: "DashBoard",
        hasChild: false,
        path: "index",
        page: ErpDashBoard,
        isMenu: true,
      },
      {
        title: "??????",
        hasChild: false,
        path: "store",
        page: ErpStore,
        isMenu: true,
      },
      {
        title: "??????????????????",
        hasChild: false,
        path: "store/detail",
        page: ErpStoreDetail,
        isMenu: false,
      },
      {
        title: "??????",
        hasChild: false,
        path: "sale",
        page: ErpSale,
        isMenu: true,
      },
      {
        title: "??????",
        hasChild: false,
        path: "area",
        page: ErpArea,
        isMenu: true,
      },
      {
        title: "??????",
        hasChild: false,
        path: "forSale",
        page: ErpBaseTable,
        isMenu: true,
      },
      {
        title: "??????",
        hasChild: false,
        path: "customer",
        page: ErpBaseTable,
        isMenu: true,
      },
      {
        title: "????????? ??????",
        hasChild: false,
        path: "brand",
        page: ErpBrand,
        isMenu: true,
      },
      {
        title: "Sample Table",
        hasChild: true,
        path: "erp02",
        isMenu: true,
        children: [
          {
            title: "BaseTable",
            path: "erpBaseTable",
            page: ErpBaseTable,
            isMenu: true,
          },
        ],
      },
      {
        title: "Sample Modal",
        hasChild: false,
        path: "erpModal",
        page: ErpPop,
        isMenu: true,
      },
      {
        title: "???????????? ??????: Tab",
        hasChild: false,
        path: "erpSample",
        page: ErpDetailSample,
        isMenu: true,
      },
    ],
    mypage: [
      {
        title: "?????? ??????",
        hasChild: false,
        path: "index",
        page: MyPage,
        isMenu: true,
      },
      {
        title: "?????? ??????",
        hasChild: false,
        path: "company",
        page: MyPageCompany,
        isMenu: true,
      },
    ],
  },
});

export const mainRouteSelector = selector({
  key: "mainRouteSelector",
  get: ({ get }) => {
    return [...get(loginRoute), ...get(mainRoute), ...get(commonRoute)];
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
