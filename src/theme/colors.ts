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
  dark: false,
  colors: {
    primary: '#355973',
    background: '#F7F7F7',
    border: '#e78242',
    text: 'rgb(28, 28, 30)',
    card: '#e78242',
    notification: '#ffffff',
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#e78242',
    background: '#355973',
    border: '#e78242',
    text: '#ffffff',
    card: '#e78242',
    notification: '#355973',
  },
};
