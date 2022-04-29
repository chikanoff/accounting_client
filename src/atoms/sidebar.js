import { atom } from 'recoil';

export const sidebarOpenState = atom({
  default: true,
  key: 'sidebarOpen',
});
