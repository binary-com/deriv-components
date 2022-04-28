import * as TOKEN from './src/styles/design-token.json';

export const radii = {
    sharp: TOKEN.General['border-radius'].sharp.value,
    pill: TOKEN.General['border-radius'].pill.value,
    default: TOKEN.General['border-radius'].default.value,
    circle: TOKEN.General['border-radius'].circle.value,
    small: TOKEN.General['border-radius'].small.value,
    custom16: TOKEN.General['border-radius']['custom-16'].value,
};

export const border_width = {
    1: TOKEN.General.borderWidth['1'].value,
    2: TOKEN.General.borderWidth['2'].value,
    3: TOKEN.General.borderWidth['3'].value,
    4: TOKEN.General.borderWidth['4'].value,
    5: TOKEN.General.borderWidth['5'].value,
    6: TOKEN.General.borderWidth['6'].value,
    7: TOKEN.General.borderWidth['7'].value,
    8: TOKEN.General.borderWidth['8'].value,
};

export const opacity = {
    0: TOKEN.General['opacity']['0'].value,
    16: TOKEN.General['opacity']['16'].value,
    25: TOKEN.General['opacity']['25'].value,
    32: TOKEN.General['opacity']['32'].value,
    50: TOKEN.General['opacity']['50'].value,
    75: TOKEN.General['opacity']['75'].value,
};
