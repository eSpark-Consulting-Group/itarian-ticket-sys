export type Theme = {
  dark: boolean;
  colors: Colors;
};

export type Colors = {
  primary: string;
  background: string;
  border: string;
  text: string;
  card: string;
  notification: string;
};

export const LightTheme: Theme = {
  //Light Theme
  dark: false,
  colors: {
    primary: '#28648f',
    background: '#f1f1f1',
    card: '#28648f',
    text: 'rgb(28, 28, 30)',
    border: '#28648f',
    notification: '#ffffff',
  },
};

export const DarkTheme: Theme = {
  //Dark Theme
  dark: true,
  colors: {
    primary: '#28648f',
    background: 'rgb(28, 28, 30)',
    border: '#28648f',
    text: '#ffffff',
    card: '#28648f',
    notification: '#28648f',
  },
};

// colors: {
//   primary: 'rgb(255, 45, 85)',
//   background: 'rgb(242, 242, 242)',
//   card: 'rgb(255, 255, 255)',
//   text: 'rgb(28, 28, 30)',
//   border: 'rgb(199, 199, 204)',
//   notification: 'rgb(255, 69, 58)',
// },
