type MainMenuType = {
  title: string;
  path: string;
  root: string;
};

type SubMenuType = {
  title: string;
  hasChild: boolean;
  path: string;
  children: DepthMenuType[];
};

type DepthMenuType = {
  title: string;
  path: string;
};

interface SubMenuInteface {
  [key: string]: SubMenuType[];
}

export type { MainMenuType, SubMenuType, DepthMenuType, SubMenuInteface };
