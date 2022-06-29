import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

module.exports = {
    stories: ['../src/**/stories/**/*.stories.mdx', '../src/**/stories/**/*.stories.@(ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-a11y'],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config: Configuration) => {
        if (config.resolve) {
            config.resolve.plugins = [
                ...(config.resolve.plugins || []),
                new TsconfigPathsPlugin({
                    extensions: config.resolve.extensions,
                }),
            ];
        }

        return config;
    },
    staticDirs: ['../src/images/svg'],
};
