const autoprefixer = require( 'autoprefixer' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );




module.exports = {

    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'normal',
    context: path.resolve( __dirname, '../src/assets/' ),
    entry: {
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
                options: {
                    ignore: [ /\/core-js/ ],
                    sourceType: "unambiguous",
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                corejs: 3,
                                modules : false,
                                useBuiltIns: 'usage',
                            }
                        ]
                    ],
                },
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