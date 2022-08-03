import { createContext } from 'react';

export enum EColorMode {
    DARK = 'dark',
    LIGHT = 'light',
}

export type ThemeContextValueType = {
    isDark: boolean;
    setColorMode: (newColorMode: EColorMode) => void;
};

const ThemeContext = createContext<ThemeContextValueType>({
    isDark: false,
    setColorMode: () => {},
});

export default ThemeContext;
