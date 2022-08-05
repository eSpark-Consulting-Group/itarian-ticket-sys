//Function for My Status screen header's left button

import {State, useState} from '@hookstate/core';
import {globalState} from '../../utils/globalState';

const backStatus = (navigation: any) => {
  // navigation.navigate({
  //   name: 'Profile',
  //   params: {status: s},
  //   merge: true,
  // });
  navigation.goBack();
};

//Function for My Status screen header's right button

const saveStatus = (navigation: any) => {
  // setPrevVal(switchVal);
  // currStatusVal.set(switchVal);
  // navigation.navigate({
  //   name: 'Profile',
  //   params: {status: switchVal},
  //   merge: true,
  // });
  // if (switchVal == false) {
  //   setCheckedIndex(null);
  //   setCurrChkInd(null);
  //   setTimeDur('--');
  //   setDateDur('--');
  // }
  navigation.goBack();
};

//Function for Gone To Screen header's right button

const saveGoneTo = (navigation: any) => {
  navigation.goBack();
};

//Function for Gone To Screen header's left button

const backGoneTo = (navigation: any) => {
  navigation.goBack();
};

export {backStatus, saveStatus, saveGoneTo, backGoneTo};
