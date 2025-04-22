/**
 * Colors
 * App color palette for consistent theming
 */

export const palette = {
    // Base colors
    red: {
      light: "#fee0e1",
      main: "#CA1D33",
      dark: "#9a0e20",
      tint: "#ff6163",
      contrast: "#FFFFFF",
    },
    gray: {
      lightest: "#F9F9F9",
      light: "#E0E0E0",
      medium: "#C6C6C6",
      mediumDark: "#7a7a7a",
      dark: "#636363",
      darkest: "#3B3B3B",
      faint: "rgba(0, 0, 0, 0.8)",
    },
    black: {
      main: "#000000",
      transparent: "rgba(0, 0, 0, 0.5)",
    },
    white: {
      main: "#FFFFFF",
    },
    transparent: "transparent",
  };
  
  const colors = {
    // Semantic colors
    primary: palette.red.main,
    primaryLight: palette.red.light,
    primaryDark: palette.red.dark,
    transparent: palette.transparent,

    // UI elements
    background: palette.white.main,
    text: palette.black.main,
    textSecondary: palette.gray.medium,
    textSecondaryDarker: palette.gray.mediumDark,
    shadow: palette.black.main,

    // Component-specific
    button: {
      primary: palette.red.main,
      secondary: palette.gray.medium,
      tertiary: palette.gray.dark,
      text: palette.white.main,
    },
    
    input: {
      border: palette.gray.medium,
      text: palette.black.main,
      placeholder: palette.gray.medium,
    },
    
    drawer: {
      background: palette.red.light,
      tint: palette.red.tint,
    },
    
    modal: {
      background: palette.white.main,
      overlay: palette.black.transparent,
    },
};
  
export default colors;