import {createState} from '@hookstate/core';

export const globalState = createState({
  theme: 'light',
  statusSwitch: false,
  currentStatus: false,
  prevGoneTo: '',
  currentGoneTo: {},
  searchTag: 'tickets',
  oldAddInputVal: '',
  additionalInputVal: '',
  oldStatusDate: '',
  statusDate: '',
  stopwatch: [],
  defaultScreenId: 'Agenda',
  defaultScreenName: 'Agenda',
  defaultnNavigationName: '',
  shortCutScreen: null,
  user: false,
});
