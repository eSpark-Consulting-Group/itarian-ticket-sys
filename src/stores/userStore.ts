import {hookstate} from '@hookstate/core';

export const userStore = hookstate({
  // Current Status indicates the user Office Check-in Status
  currentStatus: false,
  // Current Gone to indicates why user is out of the office
  currentGoneTo: {id: 1, name: 'Lunch'},
  // User Information saves in user key
  additionalInfo: '',
  dateBack: '-',
  timeBack: '-',
  user: null,
});
