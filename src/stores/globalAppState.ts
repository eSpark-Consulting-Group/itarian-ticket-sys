import {createState} from '@hookstate/core';

export const globalState = createState({
  theme: 'light',
  searchTag: 'tickets',
  stopwatch: [],
  defaultScreenId: 'Agenda',
  defaultScreenName: 'Agenda',
  defaultnNavigationName: '',
  shortCutScreen: null,
  user: false,
  agendaMember: 'John Doe',
});
