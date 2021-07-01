const autoprefixer = require( 'autoprefixer' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );




module.exports = {

    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'minimal',
    context: path.resolve( __dirname, '../src/assets/' ),
    entry: {
        polyfill: './javascript/polyfill.js',
        main: './javascript/main.js'
    },
    output: {
        filename: './assets/javascript/[name].dev.js',
        path: path.resolve( __dirname, '../src/' ),
        publicPath: '',
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
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ( loader ) => [
                                    autoprefixer(),
                                    postcssPresetEnv(),
                                ],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {},
                            sourceMap: true,
                        },
                    },
                ],
            },
        ]
    },




    plugins: [],

};