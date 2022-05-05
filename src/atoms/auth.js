import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const currentUserState = atom({
  default: null,
  key: "currentUser",
  effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedState = atom({
  default: null,
  key: "isAuthenticated",
  effects_UNSTABLE: [persistAtom],
});
