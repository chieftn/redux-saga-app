import * as webpack from 'webpack';
import * as path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin'); // tslint:disable-line: no-var-requires

const config: webpack.Configuration = {

    entry: {
        main: ['./src/index.tsx']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '.', 'dist'),
        publicPath: ''
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    watchOptions: {
        aggregateTimeout: 100,
        ignored: /node_modules/,
        poll: 100
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'tslint-loader',
                options: {
                    emitErrors: true,
                    failOnHint: true
                },
                test: /\.tsx?$/

            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFile: 'tsconfig.json'
                },
                test: /\.tsx?$/
            },

            // Styles
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader', options: { sourceMap: false }},
                    { loader: 'sass-loader', options: { sourceMap: false }}]
            },

            // All output '.js' files will have any sourcemaps re-preprocessed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module: any) { // tslint:disable-line: no-any
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 100000,
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],

    devtool: 'eval-source-map',
    mode: 'development',
};

export default config;
