import { createStitches } from '@stitches/react';
import { colors } from '../../colors';
import { font, font_size, font_weights, line_heights } from '../../typography';
import { border_width, elevation_box_shadow, opacity, radii } from '../../mixins';
import { TElevationType } from 'types/elevation.type';

type TBoxShadowProperties = {
    x: string;
    y: string;
    blur: string;
    spread: string;
    color: string;
};

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
        elevationBoxShadow: (value: TElevationType) => {
            if (elevation_box_shadow[`${value}`]) {
                if (!Array.isArray(elevation_box_shadow[`${value}`])) {
                    const { x, y, blur, spread, color } = elevation_box_shadow[`${value}`] as TBoxShadowProperties;
                    return {
                        boxShadow: `${x} ${y} ${blur} ${spread} ${color}`,
                    };
                }

                const box_shadow_array = (elevation_box_shadow[`${value}`] as TBoxShadowProperties[]).map(
                    ({ x, y, blur, spread, color }) => `${x} ${y} ${blur} ${spread} ${color}`,
                );

                return { boxShadow: box_shadow_array.join(',').toString() };
            }
            return { boxShadow: 'none' };
        },
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
