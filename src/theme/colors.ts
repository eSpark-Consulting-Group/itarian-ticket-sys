export type Theme = {
  dark: boolean;
  colors: Colors;
};

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  border: string;
  text: string;
  card: string;
  notification: string;
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#355973',
    secondary: '#e78242',
    background: '#F7F7F7',
    border: '#e78242',
    text: 'rgb(28, 28, 30)',
    card: 'rgb(255, 255, 255)',
    notification: '#ffffff',
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#ffffff',
    secondary: '#e78242',
    background: '#355973',
    border: '#e78242',
    text: '#ffffff',
    card: '#355973',
    notification: '#355973',
  },
};
