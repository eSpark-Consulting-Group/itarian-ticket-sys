import {Theme} from '@react-navigation/native';

export const LightTheme: Theme = {
  //Light Theme
  dark: false,
  colors: {
    primary: '#28648f',
    background: '#f1f1f1',
    card: '#ffffff',
    text: '#000000',
    border: '#28648f',
    notification: '#ffffff',
  },
};

export const DarkTheme: Theme = {
  //Dark Theme
  dark: true,
  colors: {
    primary: '#28648f',
    background: '#000000',
    border: '#28648f',
    text: '#ffffff',
    card: '#000000',
    notification: '#28648f',
  },
};
