module.exports = {
    stories: ['../src/**/stories/**/*.stories.mdx', '../src/**/stories/**/*.stories.@(ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-links'],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
