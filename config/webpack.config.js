const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const miniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );




module.exports = {

    mode: 'production',
    entry: {
        polyfill: './src/assets/javascript/polyfill.js',
        main: './src/assets/javascript/main.js'
    },
    output: {
        filename: '[name]-bundle.min.js',
        path: path.resolve( __dirname, '../src/assets/javascript' ),
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
                            ident: 'postcss',
                            plugins: ( loader ) => [
                                autoprefixer(),
                                cssnano(),
                                postcssPresetEnv(),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ]
    },




    plugins: [
        new miniCssExtractPlugin({
            filename: '../styles/main.min.css',
        }),
    ],

};