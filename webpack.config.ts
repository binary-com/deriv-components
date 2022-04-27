import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin/lib/plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import { Configuration, ResolvePluginInstance } from 'webpack';

type EnvConfig = {
    modules: 'cjs' | 'es';
};

const config = (env: EnvConfig): Configuration => {
    const modules = env.modules || 'cjs';
    return {
        mode: 'production',
        entry: './src/index.ts',
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
            plugins: [new TsconfigPathsPlugin() as TsconfigPathsPlugin & ResolvePluginInstance],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${modules}/components.js`,
            library: {
                name: 'components',
                type: 'umd',
            },
        },
        plugins: [new ForkTsCheckerWebpackPlugin()],
        externals: {
            react: {
                root: 'React',
                commonjs: 'react',
                commonjs2: 'react',
            },
            'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                root: 'ReactDOM',
            },
        },
    };
};

export default config;
