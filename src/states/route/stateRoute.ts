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
import ErpBsnsDetail from "@page/erp/bsnsDis/ErpBsnsDetail";
import ErpRent from "@page/erp/rent/ErpRent";
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
import ErpRentCreate from "@page/erp/rent/ErpRentCreate";
import ErpClient from "@page/erp/client/ErpClient";
import ErpClientDetail from "@page/erp/client/ErpClientDetail";
import ErpClientCreate from "@page/erp/client/ErpClientCreate";
import ErpBrand from "@page/erp/brand/ErpBrand";
import ErpBrandCreate from "@page/erp/brand/ErpBrandCreate";
import ErpSmart from "@page/erp/smart/ErpSmart";
import ErpNotice from "@page/erp/notice/ErpNotice";
//  Icon
import {
  HeaderMenu01,
  HeaderMenu02,
  IcoAppStore,
  IcoBank,
  IcoLineChart,
  IcoStore,
  IcoGateWay,
  IcoTeam,
  IcoCiCircle,
  IcoNotic,
  IcoAudit,
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
  icon?: (props?: IcoProps) => JSX.Element;
};

type DepthRouteType = {
  title: string;
  path: string;
  page: (props: any) => JSX.Element;
  isMenu: boolean;
};

type HEX = `#${string}`;

type IcoProps = {
  width?: string;
  height?: string;
  color?: `#${string}`;
};

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
    erp: [
      {
        path: "index",
        title: "대쉬보드",
        isMenu: true,
        hasChild: false,
        page: ErpDashBoard,
        icon: (props?: IcoProps) => IcoAppStore(props),
      },
      {
        path: "store",
        title: "매장",
        isMenu: true,
        hasChild: false,
        page: ErpStore,
        icon: (props?: IcoProps) => IcoStore(props),
      },
      {
        path: "store/detail",
        title: "매장상세보기",
        isMenu: false,
        hasChild: false,
        page: ErpStoreDetail,
      },
      {
        path: "store/create",
        title: "매장등록",
        isMenu: false,
        hasChild: false,
        page: ErpStoreCreate,
      },
      {
        path: "sale",
        title: "매출",
        isMenu: true,
        hasChild: false,
        page: ErpSale,
        icon: (props?: IcoProps) => IcoLineChart(props),
      },
      {
        path: "bsns",
        title: "상권",
        isMenu: true,
        hasChild: false,
        page: ErpBsnsDis,
        icon: (props?: IcoProps) => IcoGateWay(props),
      },
      {
        path: "bsns/detail",
        title: "상권상세보기",
        isMenu: false,
        hasChild: false,
        page: ErpBsnsDetail,
      },
      {
        path: "rent",
        title: "매물",
        isMenu: true,
        hasChild: false,
        page: ErpRent,
        icon: (props?: IcoProps) => IcoBank(props),
      },
      {
        path: "rent/detail",
        title: "매물상세보기",
        isMenu: false,
        hasChild: false,
        page: ErpRentDetail,
      },
      {
        path: "rent/create",
        title: "매물생성",
        isMenu: false,
        hasChild: false,
        page: ErpRentCreate,
      },
      {
        path: "client",
        title: "고객",
        isMenu: true,
        hasChild: false,
        page: ErpClient,
        icon: (props?: IcoProps) => IcoTeam(props),
      },
      {
        path: "client/detail",
        title: "고객상세보기",
        isMenu: false,
        hasChild: false,
        page: ErpClientDetail,
      },
      {
        path: "client/create",
        title: "고객생성",
        isMenu: false,
        hasChild: false,
        page: ErpClientCreate,
      },
      {
        path: "brand",
        title: "브랜드",
        isMenu: true,
        hasChild: false,
        page: ErpBrand,
        icon: (props?: IcoProps) => IcoCiCircle(props),
      },
      {
        path: "brand/create",
        title: "브랜드생성",
        isMenu: false,
        hasChild: false,
        page: ErpBrandCreate,
      },
      {
        path: "smart",
        title: "Smart",
        isMenu: true,
        hasChild: false,
        page: ErpSmart,
        icon: (props?: IcoProps) => IcoAudit(props),
      },
      {
        path: "notice",
        title: "공지",
        isMenu: true,
        hasChild: false,
        page: ErpNotice,
        icon: (props?: IcoProps) => IcoNotic(props),
      },
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
