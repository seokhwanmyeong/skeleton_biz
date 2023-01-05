//  Lib
import { atom, selector, selectorFamily } from "recoil";
//  Pages: Common
import Login from "@page/login/Login";
import Guide from "@page/Guide";
import Join from "@page/Join";
//  Pages: Map
import Maps from "@page/Maps";
//  Pages: Erp
import ErpDashBoard from "@page/erp/ErpDashBoard";
import ErpStoreDetail from "@page/erp/ErpStoreDetail";
import ErpStore from "@page/erp/store/ErpStore";
import ErpSale from "@page/erp/sale/ErpSale";
import ErpArea from "@page/erp/area/ErpArea";
// import ErpCustomer from "@page/erp/customer/ErpCustomer";
// import ErpBrand from "@page/erp/brand/ErpBrand";

import ErpDetailSample from "@page/erp/ErpDetailSample";
import ErpBaseTable from "@page/erp/ErpBaseTable";
import ErpPop from "@page/erp/ErpPop";
//  Pages: Mypage
import MyPage from "@page/mypage/MyPage";
import MyPageAccount from "@page/mypage/MyPageAccount";
import MyPageTeam from "@page/mypage/MyPageTeam";
import MyPageAuth from "@page/mypage/MyPageAuth";
import MyPageCompany from "@page/mypage/MyPageAuth";
import MyPagePlan from "@page/mypage/MyPagePlan";

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
    {
      root: "guide",
      title: "Guide",
      path: "/guide",
      hasSub: false,
      page: Guide,
    },
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
        title: "매장",
        hasChild: false,
        path: "store",
        page: ErpStore,
        isMenu: true,
      },
      {
        title: "매장상세보기",
        hasChild: false,
        path: "store/detail",
        page: ErpStoreDetail,
        isMenu: false,
      },
      {
        title: "매출",
        hasChild: false,
        path: "sale",
        page: ErpSale,
        isMenu: true,
      },
      {
        title: "상권",
        hasChild: false,
        path: "area",
        page: ErpArea,
        isMenu: true,
      },
      {
        title: "매물",
        hasChild: false,
        path: "forSale",
        page: ErpBaseTable,
        isMenu: true,
      },
      {
        title: "고객",
        hasChild: false,
        path: "customer",
        page: ErpBaseTable,
        isMenu: true,
      },
      {
        title: "브랜드 DB",
        hasChild: false,
        path: "brand",
        page: ErpBaseTable,
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
        title: "상세정보 견본: Tab",
        hasChild: false,
        path: "erpSample",
        page: ErpDetailSample,
        isMenu: true,
      },
    ],
    mypage: [
      {
        title: "내정보 관리",
        hasChild: false,
        path: "index",
        page: MyPage,
        isMenu: true,
      },
      {
        title: "계정 관리",
        hasChild: false,
        path: "account",
        page: MyPageAccount,
        isMenu: true,
      },
      {
        title: "팀 관리",
        hasChild: false,
        path: "team",
        page: MyPageTeam,
        isMenu: true,
      },
      {
        title: "권한 관리",
        hasChild: false,
        path: "auth",
        page: MyPageAuth,
        isMenu: true,
      },
      {
        title: "회사 관리",
        hasChild: false,
        path: "company",
        page: MyPageCompany,
        isMenu: true,
      },
      {
        title: "요금제 관리",
        hasChild: false,
        path: "plan",
        page: MyPagePlan,
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
