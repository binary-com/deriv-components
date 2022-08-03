import React from 'react';
import ThemeContext, { ThemeContextValueType } from '../../../src/components/core/theme-context/theme-context';

const withTheme = (Story, context) => {
    const colorMode = context.globals.theme;
    const isDark = colorMode === 'dark';
    const contextValue: ThemeContextValueType = {
        isDark,
        setColorMode: () => {},
    };
    return (
        <ThemeContext.Provider value={contextValue}>
            <Story />
        </ThemeContext.Provider>
    );
};

export default withTheme;
