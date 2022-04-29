import { atom } from 'recoil';

export const currentUserState = atom({
  default: null,
  key: 'currentUser',
});

export const isAuthenticatedState = atom({
  default: null,
  key: 'isAuthenticated',
});
