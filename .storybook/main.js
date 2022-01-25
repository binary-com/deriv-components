module.exports = {
    stories: ['../src/**/stories/**/*.stories.mdx', '../src/**/stories/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    core: {
        builder: 'storybook-builder-vite',
    },
};
