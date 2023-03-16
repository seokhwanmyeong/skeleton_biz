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
import ErpStore from "@page/erp/store/ErpStore";
import ErpStoreDetail from "@page/erp/store/ErpStoreDetail";
import ErpSale from "@page/erp/sale/ErpSale";
import ErpBsnsDis from "@page/erp/bsnsDis/ErpBsnsDis";
import ErpRent from "@page/erp/rent/ErpRent";
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
import ErpClient from "@page/erp/client/ErpClient";
import ErpClientDetail from "@page/erp/client/ErpClientDetail";
// import ErpBrand from "@page/erp/brand/ErpBrand";

// import ErpDetailSample from "@page/erp/ErpDetailSample";
// import ErpBaseTable from "@page/erp/ErpBaseTable";
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
      title: "상권분석",
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
      title: "마이페이지",
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
        path: "bsnsDis",
        page: ErpBsnsDis,
        isMenu: true,
      },
      {
        title: "매물",
        hasChild: false,
        path: "rent",
        page: ErpRent,
        isMenu: true,
      },
      {
        title: "매장상세보기",
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
      },
      {
        title: "고객상세보기",
        hasChild: false,
        path: "client/detail",
        page: ErpClientDetail,
        isMenu: false,
      },
      // {
      //   title: "브랜드 기준",
      //   hasChild: false,
      //   path: "brand",
      //   page: ErpBrand,
      //   isMenu: true,
      // },
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
    mypage: [
      {
        title: "계정 관리",
        hasChild: false,
        path: "index",
        page: MyPage,
        isMenu: true,
      },
      {
        title: "회사 관리",
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
