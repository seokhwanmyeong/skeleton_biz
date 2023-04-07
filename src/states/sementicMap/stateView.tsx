import { atom } from "recoil";

export const sementicViewState = atom<any>({
  key: "sementicViewState",
  default: {
    viewId: "",
    props: null,
  },
});
