import { ReactNode, useMemo, useState } from 'react';
import ThemeContext, { EColorMode, ThemeContextValueType } from './theme-context';

type TThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider = ({ children }: TThemeProviderProps) => {
    const [colorMode, setRawColorMode] = useState<EColorMode>(EColorMode.LIGHT);

    const contextValue: ThemeContextValueType = useMemo(() => {
        const setColorMode = (newColorMode: EColorMode) => {
            setRawColorMode(newColorMode);
        };
        const isDark = colorMode === 'dark';

        return { isDark, setColorMode };
    }, [colorMode]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
