import {createState} from '@hookstate/core';

export const globalState = createState({
  theme: 'light',
  statusSwitch: false,
  currentStatus: true,
});
