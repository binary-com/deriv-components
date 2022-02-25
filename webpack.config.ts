import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin/lib/plugin';
import path from 'path';
import { Configuration } from 'webpack';

type EnvConfig = {
    modules: 'cjs' | 'es';
};

const config = (env: EnvConfig): Configuration => {
    const modules = env.modules || 'cjs';
    return {
        mode: 'production',
        devtool: 'source-map',
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        modules: modules === 'es' ? false : 'cjs',
                                    },
                                ],
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                },
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
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@styles': path.resolve(__dirname, 'src/styles'),
            },
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${modules}/components.js`,
        },
        externals: ['react'],
        plugins: [new ForkTsCheckerWebpackPlugin()],
    };
};

export default config;
