export enum EThemes {
  System = 'system',
  Light = 'light',
  Dark = 'dark'
}

// Extract the string values of the Themes enum
export type TThemeNames = (typeof EThemes)[keyof typeof EThemes]
