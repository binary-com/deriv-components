export const MAX_MOBILE_WIDTH = 992;

const isBrowser = typeof window !== 'undefined';

export const isMobile = () => {
    if (!isBrowser) {
        return false;
    }
    return window.innerWidth <= MAX_MOBILE_WIDTH;
};
export const isDesktop = () => {
    if (!isBrowser) {
        return true;
    }
    window.innerWidth > MAX_MOBILE_WIDTH;
};
