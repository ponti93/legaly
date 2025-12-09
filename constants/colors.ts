export const Colors = {
  primary: '#FD5200',
  secondary: '#E0F7FF',
  iceBlue: '#E0F7FF',
  deepCharcoal: '#0B0F1A',
  white: '#FFFFFF',
  softGray: '#F8F8F8',
} as const;

export const Typography = {
  heading: 'Playfair Display',
  body: 'Inter',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const Layout = {
  headerHeight: {
    mobile: 72,
    tablet: 80,
    desktop: 92,
  },
  maxContentWidth: 1200,
  containerPadding: {
    mobile: Spacing.lg,
    tablet: Spacing.xl,
    desktop: Spacing.xxl,
  },
} as const;

export const Breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;
