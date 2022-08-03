import { FC, useMemo, useState } from 'react';
import ThemeContext, { EColorMode, ThemeContextValueType } from './theme-context';

const ThemeProvider: FC = ({ children }) => {
    const [colorMode, setRawColorMode] = useState<EColorMode>(EColorMode.LIGHT);

    const contextValue: ThemeContextValueType = useMemo(() => {
        const setColorMode = (newColorMode: EColorMode) => {
            setRawColorMode(newColorMode);
        };
        const isDark = colorMode === 'dark';

        return { isDark, setColorMode };
    }, []);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
