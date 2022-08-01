import { createStitches } from '@stitches/react';
import { colors } from '../../colors';
import { font, font_size, font_weights, line_heights } from '../../typography';
import { border_width, radii, opacity } from '../../mixins';

// source from provider
const default_bp = 992;

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
    theme: {
        colors: {
            ...colors,

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
            ...font,
        },
        fontSizes: {
            ...font_size,
        },
        fontWeights: {
            ...font_weights,
        },
        lineHeights: {
            ...line_heights,
        },
        radii: {
            ...radii,
        },
        borderWidths: {
            ...border_width,
        },
        opacity: {
            ...opacity,
        },
    },
    media: {
        mobile: `(max-width: ${default_bp}px)`,
        desktop: `(min-width: ${default_bp}px)`,
    },
    utils: {
        marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
        marginY: (value: string) => ({ marginTop: value, marginBottom: value }),
        paddingX: (value: string) => ({ paddingLeft: value, paddingRight: value }),
        paddingY: (value: string) => ({ paddingTop: value, paddingBottom: value }),
        boxSizingForAllChildren: (value: string) => ({ '*': { boxSizing: value } }),
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
