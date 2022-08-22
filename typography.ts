import TOKEN from './src/styles/design-token.json';

export const font = {
    ibm: TOKEN.General.fontFamilies['ibm-plex-sans'].value,
};

export const font_weights = {
    thin: TOKEN.General.fontWeight.thin.value,
    extraLight: TOKEN.General.fontWeight.extralight.value,
    light: TOKEN.General.fontWeight.light.value,
    regular: TOKEN.General.fontWeight.regular.value,
    medium: TOKEN.General.fontWeight.medium.value,
    semiBold: TOKEN.General.fontWeight.semibold.value,
    bold: TOKEN.General.fontWeight.bold.value,
};

export const font_size = {
    '5xs': TOKEN.General.fontSize.small['5x-small'].value,
    '4xs': TOKEN.General.fontSize.small['4x-small'].value,
    '3xs': TOKEN.General.fontSize.small['3x-small'].value,
    '2xs': TOKEN.General.fontSize.small['2x-small'].value,
    xs: TOKEN.General.fontSize.small['x-small'].value,
    sm: TOKEN.General.fontSize.small.small.value,
    md: TOKEN.General.fontSize.medium.medium.value,
    lg: TOKEN.General.fontSize.large.large.value,
    xl: TOKEN.General.fontSize.large['x-large'].value,
    '2xl': TOKEN.General.fontSize.large['2x-large'].value,
    '3xl': TOKEN.General.fontSize.large['3x-large'].value,
    '4xl': TOKEN.General.fontSize.large['4x-large'].value,
    '5xl': TOKEN.General.fontSize.large['5x-large'].value,
    '6xl': TOKEN.General.fontSize.large['6x-large'].value,
};

export const line_heights = {
    lineHeight10: TOKEN.General.lineHeights['line-height-10'].value,
    lineHeight12: TOKEN.General.lineHeights['line-height-12'].value,
    lineHeight13: TOKEN.General.lineHeights['line-height-13'].value,
    lineHeight14: TOKEN.General.lineHeights['line-height-14'].value,
    lineHeight18: TOKEN.General.lineHeights['line-height-18'].value,
    lineHeight20: TOKEN.General.lineHeights['line-height-20'].value,
    lineHeight24: TOKEN.General.lineHeights['line-height-24'].value,
    lineHeight26: TOKEN.General.lineHeights['line-height-26'].value,
    lineHeight30: TOKEN.General.lineHeights['line-height-30'].value,
    lineHeight34: TOKEN.General.lineHeights['line-height-34'].value,
    lineHeight36: TOKEN.General.lineHeights['line-height-36'].value,
    lineHeight40: TOKEN.General.lineHeights['line-height-40'].value,
    lineHeight60: TOKEN.General.lineHeights['line-height-60'].value,
    lineHeight80: TOKEN.General.lineHeights['line-height-80'].value,
    lineHeight100: TOKEN.General.lineHeights['line-height-100'].value,
};
