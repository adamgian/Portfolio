const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const webpack = require( 'webpack' );




module.exports = {

    entry: {
        polyfill: './src/assets/javascript/polyfill.js',
        main: './src/assets/javascript/main.js'
    },
    output: {
        filename: './src/assets/javascript/[name]-bundle.min.js',
    },




    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015' ]
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { minimize: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [ require('autoprefixer') ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
        ]
    },




    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'polyfill', 'main' ]
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: '/src/assets/styles/main.min.css',
        }),
        new UglifyJSPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],

};