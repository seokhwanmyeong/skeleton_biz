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
import ErpStore from "@src/page/erp/store/ErpStore";
import ErpSale from "@page/erp/sale/ErpSale";
import ErpArea from "@page/erp/area/ErpArea";
// import ErpForSale from "@page/erp/forSale/ErpForSale";
// import ErpCustomer from "@page/erp/customer/ErpCustomer";
// import ErpBrand from "@page/erp/brand/ErpBrand";

import ErpBaseTable from "@page/erp/ErpBaseTable";
import ErpPop from "@page/erp/ErpPop";
import ErpForm from "@page/erp/ErpForm";
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
};

type DepthRouteType = {
  title: string;
  path: string;
  page: (props: any) => JSX.Element;
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
      },
      {
        title: "매장",
        hasChild: false,
        path: "store",
        page: ErpStore,
      },
      {
        title: "매출",
        hasChild: false,
        path: "sale",
        page: ErpSale,
      },
      {
        title: "상권",
        hasChild: false,
        path: "area",
        page: ErpArea,
      },
      {
        title: "매물",
        hasChild: false,
        path: "forSale",
        page: ErpBaseTable,
      },
      {
        title: "고객",
        hasChild: false,
        path: "customer",
        page: ErpBaseTable,
      },
      {
        title: "브랜드 DB",
        hasChild: false,
        path: "brand",
        page: ErpBaseTable,
      },
      {
        title: "Sample Table",
        hasChild: true,
        path: "erp02",
        children: [
          {
            title: "BaseTable",
            path: "erpBaseTable",
            page: ErpBaseTable,
          },
        ],
      },
      {
        title: "Sample Modal",
        hasChild: false,
        path: "erpModal",
        page: ErpPop,
      },
      {
        title: "Sample Form",
        hasChild: false,
        path: "erpForm",
        page: ErpForm,
      },
    ],
    mypage: [
      {
        title: "내정보 관리",
        hasChild: false,
        path: "index",
        page: MyPage,
      },
      {
        title: "계정 관리",
        hasChild: false,
        path: "account",
        page: MyPageAccount,
      },
      {
        title: "팀 관리",
        hasChild: false,
        path: "team",
        page: MyPageTeam,
      },
      {
        title: "권한 관리",
        hasChild: false,
        path: "auth",
        page: MyPageAuth,
      },
      {
        title: "회사 관리",
        hasChild: false,
        path: "company",
        page: MyPageCompany,
      },
      {
        title: "요금제 관리",
        hasChild: false,
        path: "plan",
        page: MyPagePlan,
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
