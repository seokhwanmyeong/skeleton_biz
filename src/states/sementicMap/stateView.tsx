import { atom } from "recoil";

export const sementicViewState = atom<{
  viewId: string;
  props: any;
}>({
  key: "sementicViewState",
  default: {
    viewId: "",
    props: null,
  },
});
