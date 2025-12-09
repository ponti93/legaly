import { Dimensions, Platform } from 'react-native';
import { Breakpoints } from '@/constants/colors';

export function useResponsive() {
  const { width } = Dimensions.get('window');

  const isMobile = width < Breakpoints.tablet;
  const isTablet = width >= Breakpoints.tablet && width < Breakpoints.desktop;
  const isDesktop = width >= Breakpoints.desktop;
  const isWide = width >= Breakpoints.wide;
  const isWeb = Platform.OS === 'web';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isWeb,
    width,
    screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
  };
}

export function responsive<T>(config: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}): T {
  const { width } = Dimensions.get('window');
  
  if (width >= Breakpoints.desktop && config.desktop !== undefined) {
    return config.desktop;
  }
  if (width >= Breakpoints.tablet && config.tablet !== undefined) {
    return config.tablet;
  }
  return config.mobile;
}
