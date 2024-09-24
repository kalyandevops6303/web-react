export interface ColorTypes {
  light: string;
  main: string;
}

export interface ColorStates {
  primary: ColorTypes;
  secondary: ColorTypes;
  success: ColorTypes;
  danger: ColorTypes;
  warning: ColorTypes;
  info: ColorTypes;
  dark: ColorTypes;
}

export interface ThemeColorsType {
  colors: ColorStates;
}
