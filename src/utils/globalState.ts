import {createState} from '@hookstate/core';
import {Stopwatch} from '../constants/SampleArrays';

export const globalState = createState({
  theme: 'light',
  statusSwitch: false,
  currentStatus: true,
  prevGoneTo: '',
  currentGoneTo: '',
  searchTag: 'tickets',
  oldAddInputVal: '',
  additionalInputVal: '',
  oldStatusDate: '',
  statusDate: '',
  stopwatch: [],
});
