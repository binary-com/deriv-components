import { createStitches } from '@stitches/react';

// source from provider
const default_bp = 992;

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
    theme: {
        colors: {
            // source from tokens
            white: '#ffffff',
            coral: '#eb3e48',
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
