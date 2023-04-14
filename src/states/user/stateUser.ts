import { atom, selector } from "recoil";

//  Type
export interface User {
  username: string;
  password: string;
  // auth: {
  //   [key: string]: number;
  // };
  // company: string;
}

export interface Auth {
  [key: string]: number;
}

//  User Info
export const atomUser = atom<any>({
  key: "userProfile",
  default: {
    username: "",
    password: "",
    // auth: {},
    // company: "",
    autoLogin: false,
  },
});

export const selectorUser = selector({
  key: "selectorUser",
  get: ({ get }) => {},
  set: ({ set }, newValue) => {},
});

export const selectorAutoLogin = selector({
  key: "selectorAutoLogin",
  get: ({ get }) => {},
  set: ({ set, get }) => {
    const userInfo = get(atomUser);

    set(atomUser, { ...userInfo, autoLogin: !userInfo.autoLogin });
  },
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
