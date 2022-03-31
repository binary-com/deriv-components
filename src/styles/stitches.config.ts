import { createStitches } from '@stitches/react';
import * as TOKEN from './design-token.json';

// source from provider
const default_bp = 992;

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
    theme: {
        colors: {
            // general - WIP (waiting for design to update on their end)
            white: TOKEN.General['choice-tokens'].color.greyLight.grey100.value,
            black: TOKEN.General['choice-tokens'].color.black.black.value,

            // brand - WIP (waiting for design to update on their end)
            coral: TOKEN.General['choice-tokens'].color.brand.coral.value,

            // light grey
            greyLight100: TOKEN.General['choice-tokens'].color.greyLight.grey100.value,
            greyLight200: TOKEN.General['choice-tokens'].color.greyLight.grey200.value,
            greyLight300: TOKEN.General['choice-tokens'].color.greyLight.grey300.value,
            greyLight400: TOKEN.General['choice-tokens'].color.greyLight.grey400.value,
            greyLight500: TOKEN.General['choice-tokens'].color.greyLight.grey500.value,
            greyLight600: TOKEN.General['choice-tokens'].color.greyLight.grey600.value,
            greyLight700: TOKEN.General['choice-tokens'].color.greyLight.grey700.value,

            // dark grey
            greyDark100: TOKEN.General['choice-tokens'].color.greyDark.grey100.value,
            greyDark200: TOKEN.General['choice-tokens'].color.greyDark.grey200.value,
            greyDark300: TOKEN.General['choice-tokens'].color.greyDark.grey300.value,
            greyDark400: TOKEN.General['choice-tokens'].color.greyDark.grey400.value,
            greyDark500: TOKEN.General['choice-tokens'].color.greyDark.grey500.value,
            greyDark600: TOKEN.General['choice-tokens'].color.greyDark.grey600.value,
            greyDark700: TOKEN.General['choice-tokens'].color.greyDark.grey700.value,

            // default theme
            'prominent-text': '$greyLight700',
            'general-text': '$greyLight700',
            'less-prominent-text': '$greyLight600',
            'disabled-text': '$greyLight500',
            'active-background': '$greyLight400',
            'hover-background': '$greyLight300',
            'primary-background': '$greyLight100',
            'secondary-background': '$greyLight200',
        },
        space: {},
        fonts: {
            ibm: TOKEN.General.fontFamilies['ibm-plex-sans'].value,
        },
        fontSizes: {
            // WIP (waiting for design to update on their end)
        },
        fontWeights: {
            thin: TOKEN.General['choice-tokens'].fontWeight.Thin.value,
            extraLight: TOKEN.General['choice-tokens'].fontWeight.ExtraLight.value,
            light: TOKEN.General['choice-tokens'].fontWeight.Light.value,
            regular: TOKEN.General['choice-tokens'].fontWeight.Regular.value,
            medium: TOKEN.General['choice-tokens'].fontWeight.Medium.value,
            semiBold: TOKEN.General['choice-tokens'].fontWeight.SemiBold.value,
            bold: TOKEN.General['choice-tokens'].fontWeight.Bold.value,
        },
        lineHeights: {
            lineHeight10: TOKEN.General['choice-tokens'].lineHeights['line-height-10'].value,
            lineHeight12: TOKEN.General['choice-tokens'].lineHeights['line-height-12'].value,
            lineHeight13: TOKEN.General['choice-tokens'].lineHeights['line-height-13'].value,
            lineHeight14: TOKEN.General['choice-tokens'].lineHeights['line-height-14'].value,
            lineHeight18: TOKEN.General['choice-tokens'].lineHeights['line-height-18'].value,
            lineHeight20: TOKEN.General['choice-tokens'].lineHeights['line-height-20'].value,
            lineHeight24: TOKEN.General['choice-tokens'].lineHeights['line-height-24'].value,
            lineHeight26: TOKEN.General['choice-tokens'].lineHeights['line-height-26'].value,
            lineHeight30: TOKEN.General['choice-tokens'].lineHeights['line-height-30'].value,
            lineHeight34: TOKEN.General['choice-tokens'].lineHeights['line-height-34'].value,
            lineHeight36: TOKEN.General['choice-tokens'].lineHeights['line-height-36'].value,
            lineHeight40: TOKEN.General['choice-tokens'].lineHeights['line-height-40'].value,
            lineHeight60: TOKEN.General['choice-tokens'].lineHeights['line-height-60'].value,
            lineHeight80: TOKEN.General['choice-tokens'].lineHeights['line-height-80'].value,
            lineHeight100: TOKEN.General['choice-tokens'].lineHeights['line-height-100'].value,
        },
        radii: {
            sharp: TOKEN.General['choice-tokens']['border-radius'].sharp.value,
            pill: TOKEN.General['choice-tokens']['border-radius'].pill.value,
            default: TOKEN.General['choice-tokens']['border-radius'].default.value,
            circle: TOKEN.General['choice-tokens']['border-radius'].circle.value,
            small: TOKEN.General['choice-tokens']['border-radius'].small.value,
        },
        borderWidths: {
            1: TOKEN.General['choice-tokens'].borderWidth['1'].value,
            2: TOKEN.General['choice-tokens'].borderWidth['2'].value,
            3: TOKEN.General['choice-tokens'].borderWidth['3'].value,
            4: TOKEN.General['choice-tokens'].borderWidth['4'].value,
            5: TOKEN.General['choice-tokens'].borderWidth['5'].value,
            6: TOKEN.General['choice-tokens'].borderWidth['6'].value,
            7: TOKEN.General['choice-tokens'].borderWidth['7'].value,
            8: TOKEN.General['choice-tokens'].borderWidth['8'].value,
        },
    },
    media: {
        mobile: `(max-width: ${default_bp}px)`,
    },
    utils: {
        marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
        marginY: (value: string) => ({ marginTop: value, marginBottom: value }),
        paddingX: (value: string) => ({ paddingLeft: value, paddingRight: value }),
        paddingY: (value: string) => ({ paddingTop: value, paddingBottom: value }),
    },
});

export const darkTheme = createTheme('dark-theme', {
    colors: {
        'prominent-text': '$greyLight100',
        'general-text': '$greyLight700',
        'less-prominent-text': '$greyLight600',
        'disabled-text': '$greyLight500',
        'active-background': '$greyLight400',
        'hover-background': '$greyLight300',
        'primary-background': '$greyLight100',
        'secondary-background': '$greyLight200',
    },
});
