import { Configuration, RuleSetRule } from 'webpack';

export default async ({ config }: { config: Configuration }) => {
    config.module?.rules?.push(
        {
            test: /\.(s(a|c)ss)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                    },
                },
                'sass-loader',
            ],
        },
        {
            test: /\.svg$/i,
            resourceQuery: /svgr/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: true,
                    },
                },
            ],
        },
    );

    // To ignore svgr pattern in the import
    const svgRule = config.module?.rules?.find(
        (rule) => typeof rule === 'object' && rule.test instanceof RegExp && rule.test?.test('.svg'),
    ) as RuleSetRule | undefined;

    if (svgRule) {
        svgRule.resourceQuery = { not: [/svgr/] };
    }

    return config;
};
