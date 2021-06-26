const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const miniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );




module.exports = {

    mode: 'production',
    stats: 'minimal',
    context: path.resolve( __dirname, '../src/assets/' ),
    entry: {
        polyfill: './javascript/polyfill.js',
        main: './javascript/main.js'
    },
    output: {
        filename: './javascript/[name]-bundle.min.js',
        path: path.resolve( __dirname, '../src/assets/' ),
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
            filename: './styles/main.min.css',
        }),
    ],

};