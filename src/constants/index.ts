import {Dimensions} from 'react-native';

export const BUILD_VERSION = '0.6.02';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const GONE_TO_ARRAY = [
  {
    name: 'Appoinment',
    check: 'unchecked',
  },
  {
    name: 'Client',
    check: 'unchecked',
  },
  {
    name: 'Gone for the day',
    check: 'unchecked',
  },
  {
    name: 'Lunch',
    check: 'unchecked',
  },
  {
    name: 'Other',
    check: 'unchecked',
  },
  {
    name: 'Sick',
    check: 'unchecked',
  },
  {
    name: 'Vacation',
    check: 'unchecked',
  },
];
