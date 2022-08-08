import React from 'react';

const withBackground = (Story, context) => {
    const colorMode = context.globals.theme;
    const isDark = colorMode === 'dark';

    if (isDark) {
        document.documentElement.style.background = 'var(--dark-background)';
        document.body.style.background = 'var(--dark-background)';
    } else {
        document.documentElement.style.background = 'var(--light-background)';
        document.body.style.background = 'var(--light-background)';
    }
    return <Story {...context} />;
};

export default withBackground;
