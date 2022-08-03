import React from 'react';

const withBackground = (Story, context) => {
    const colorMode = context.globals.theme;
    const isDark = colorMode === 'dark';

    if (isDark) {
        document.documentElement.style.background = '#0E0E0E';
        document.body.style.background = '#0E0E0E';
    } else {
        document.documentElement.style.background = '#ffffff';
        document.body.style.background = '#ffffff';
    }
    return <Story {...context} />;
};

export default withBackground;
