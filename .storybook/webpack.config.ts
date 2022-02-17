import path from 'path';
import { Configuration } from 'webpack';

export default async ({ config }: { config: Configuration }) => {
    config.module?.rules?.push({
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
    });

    config.module?.rules?.push({
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
        include: path.resolve(__dirname, '../'),
    });

    return config;
};
