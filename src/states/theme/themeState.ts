//  LIB
import { atom } from "recoil";

const themeList = atom({
  key: "ThemeList",
  default: [
    {
      title: "Light",
      key: "light",
    },
    {
      title: "Dark",
      key: "dark",
    },
  ],
});

const atomThemeColor = atom({
  key: "atomThemeColor",
  default: "light",
});

export { themeList, atomThemeColor };
