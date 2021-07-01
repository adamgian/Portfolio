const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const miniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );




module.exports = {

    mode: 'production',
    stats: 'verbose',
    context: path.resolve( __dirname, '../src/assets/' ),
    entry: {
        polyfill: './javascript/polyfill.js',
        main: './javascript/main.js'
    },
    output: {
        filename: './assets/javascript/[name]-[contenthash:8].min.js',
        path: path.resolve( __dirname, '../src/' ),
        publicPath: '',
    },




    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: true,
                    format: {
                        comments: false
                    },
                },
            }),
        ],
    },




    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ( loader ) => [
                                    autoprefixer(),
                                    cssnano(),
                                    postcssPresetEnv(),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ]
    },




    plugins: [
        new miniCssExtractPlugin({
            filename: './assets/styles/main-[contenthash:8].min.css',
        }),
        new WebpackManifestPlugin({
            fileName: '_data/webpack-manifest.json',
            filter: ( file ) => {
                return file.name !== 'polyfill.js';
            },
            map: ( file ) => {
                if ( file.path.startsWith('./') )
                    file.path = file.path.substring( 1 );
                return file;
            },
        }),
    ],

};