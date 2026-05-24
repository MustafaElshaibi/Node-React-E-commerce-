// Design Tokens for Sheba Platform
export const colors = {
  primary: '#0d2d6d', // Deep Navy
  accent: '#1dbf89', // Emerald
  gold: '#d4a574',
  white: '#ffffff',
  black: '#0f1419',
  surface: {
    light: '#fafbfc',
    base: '#f4f6f8',
    card: '#ffffff',
  },
  dark: {
    bg: '#0f1419',
    surface: '#1a2332',
    card: '#1f2937',
  },
  gray: {
    50: '#fafbfc',
    100: '#f4f6f8',
    200: '#e9ecf0',
    300: '#dde2e8',
    400: '#d1d7df',
    500: '#b5bcc7',
    600: '#8a929d',
    700: '#5f6874',
    800: '#34404b',
    900: '#0f1419',
  },
};

export const typography = {
  displayLarge: {
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: '700',
    letterSpacing: '-1px',
  },
  displayMedium: {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  displaySmall: {
    fontSize: '30px',
    lineHeight: '38px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  headingLarge: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
  },
  headingMedium: {
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: '600',
  },
  headingSmall: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: '600',
  },
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
  },
  labelLarge: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
  },
  labelMedium: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
};

export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
};

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glass: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};
