import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export function useMediaQuery() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= BREAKPOINTS.mobile,
    isTablet:
      window.innerWidth <= BREAKPOINTS.tablet &&
      window.innerWidth <= BREAKPOINTS.tablet,
    isDesktop: window.innerWidth > BREAKPOINTS.desktop,
  });
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isDesktop: width > BREAKPOINTS.desktop,
      });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };
  }, [BREAKPOINTS]);
  return {
    windowSize,
    isMobile: windowSize.isMobile,
    isTablet: windowSize.isTablet,
    isDesktop: windowSize.isDesktop,
  };
}
