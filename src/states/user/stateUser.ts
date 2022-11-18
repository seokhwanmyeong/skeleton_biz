import { atom, selector } from "recoil";

//  Type
export interface User {
  name: string;
  pwd: string;
  auth: {
    [key: string]: number;
  };
  company: string;
}

export interface Auth {
  [key: string]: number;
}

//  User Info
export const atomUser = atom<User>({
  key: "userProfile",
  default: {
    name: "",
    pwd: "",
    auth: {},
    company: "",
  },
});

export const selectorUser = selector({
  key: "selectorUser",
  get: ({ get }) => {},
  set: ({ set }, newValue) => {},
});

//  Auth
export const atomAuth = atom<Auth>({
  key: "userAuth",
  default: {
    auth1: 1,
    auth2: 2,
    auth3: 3,
  },
});

export const selectorAuth = selector({
  key: "selectorAuth",
  get: ({ get }) => get(atomAuth),
  set: ({ set }, authList) => set(atomAuth, authList),
});
