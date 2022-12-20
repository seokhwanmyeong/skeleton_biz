//  Lib
import { atom, selector, selectorFamily } from "recoil";
//  Pages: Common
import Home from "@page/Home";
import Login from "@page/Login";
import Guide from "@page/Guide";
import Join from "@page/Join";
//  Pages: Map
import Maps from "@page/Maps";
//  Pages: Erp
import DashBoard from "@page/erp/DashBoard";
import ErpBaseTable from "@page/erp/ErpBaseTable";
import ErpBaseApi from "@page/erp/ErpBaseApi";
import ErpPop from "@page/erp/ErpPop";
import ErpForm from "@page/erp/ErpForm";
//  Pages: Manage
import ManageDash from "@page/manage/ManageDash";
import ManageStore from "@page/manage/ManageStore";
import ManageSales from "@page/manage/ManageStore";
import ManageBsnsDis from "@page/manage/ManageStore";
import ManageSalesOffer from "@page/manage/ManageStore";
import ManageCustomer from "@page/manage/ManageStore";
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
  path: string;
  index?: boolean;
  hasChild: boolean;
  children?: DepthRouteType[];
  page?: (props: any) => JSX.Element;
};

type DepthRouteType = {
  title: string;
  path: string;
  page: (props: any) => JSX.Element;
};

export type { MainRouteType, SubRouteType, DepthRouteType };

export const mainRoute = atom<Array<MainRouteType>>({
  key: "mainRoute",
  default: [
    {
      root: "",
      title: "Home",
      path: "",
      hasSub: false,
      index: true,
      page: Home,
    },
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
      root: "manage",
      title: "Manage",
      path: "/manage",
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
      root: "login",
      title: "Login",
      path: "/login",
      hasSub: false,
      page: Login,
    },
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
        title: "Dash-Board",
        hasChild: false,
        path: "index",
        page: DashBoard,
      },
      {
        title: "ERP 테이블",
        hasChild: true,
        path: "erp01",
        children: [
          {
            title: "기본 테이블",
            path: "erp01-Sub01",
            page: ErpBaseTable,
          },
          {
            title: "API 통신테이블",
            path: "erp01-Sub02",
            page: ErpBaseApi,
          },
        ],
      },
      {
        title: "erp02",
        hasChild: true,
        path: "erp02",
        children: [
          {
            title: "erp02-Sub01",
            path: "erp02-Sub01",
            page: ErpBaseTable,
          },
          {
            title: "erp02-Sub02",
            path: "erp02-Sub02",
            page: ErpBaseApi,
          },
        ],
      },
      {
        title: "ERP 팝업",
        hasChild: false,
        path: "erp03",
        page: ErpPop,
      },
      {
        title: "Form Sample",
        hasChild: false,
        path: "erp04",
        page: ErpForm,
      },
    ],
    manage: [
      {
        title: "Dash-Board",
        hasChild: false,
        path: "index",
        page: ManageDash,
      },
      {
        title: "매장",
        hasChild: false,
        path: "store",
        page: ManageStore,
      },
      {
        title: "매출",
        hasChild: false,
        path: "sales",
        page: ManageSales,
      },
      {
        title: "상권",
        hasChild: false,
        path: "bsnsDis",
        page: ManageBsnsDis,
      },
      {
        title: "매물",
        hasChild: false,
        path: "salesOffer",
        page: ManageSalesOffer,
      },
      {
        title: "고객",
        hasChild: false,
        path: "customer",
        page: ManageCustomer,
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

export const routerSelector = selector({
  key: "routerSelector",
  get: ({ get }) => {
    return [...get(mainRoute), ...get(commonRoute)];
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
