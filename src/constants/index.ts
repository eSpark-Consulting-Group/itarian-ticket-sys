import {Dimensions} from 'react-native';

export const BUILD_VERSION = '0.6.23';

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

export const fileIcons: any = {
  pdf: {
    icon: 'file-pdf-box',
    color: '#f40f02',
  },
  xls: {
    icon: 'microsoft-excel',
    color: '#1D6F42',
  },
  xlsx: {
    icon: 'microsoft-excel',
    color: '#1D6F42',
  },
  txt: {
    icon: 'file-document',
    color: '#8585858a',
  },
  doc: {
    icon: 'microsoft-word',
    color: '#1992fa',
  },
  docx: {
    icon: 'microsoft-word',
    color: '#1992fa',
  },
};
