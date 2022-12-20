export const MAX_MOBILE_WIDTH = 992;

const isBrowser = typeof window !== 'undefined';

export const isMobile = () => {
    if (isBrowser) {
        return window.innerWidth <= MAX_MOBILE_WIDTH;
    }
    return true;
};
export const isDesktop = () => {
    if (isBrowser) {
        return window.innerWidth > MAX_MOBILE_WIDTH;
    }
    return true;
};
