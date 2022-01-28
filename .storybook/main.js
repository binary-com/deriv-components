module.exports = {
    stories: ['../src/**/stories/**/*.stories.mdx', '../src/**/stories/**/*.stories.@(ts|tsx|mdx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-docs'],
    framework: '@storybook/react',
    core: {
        builder: 'storybook-builder-vite',
    },
};
