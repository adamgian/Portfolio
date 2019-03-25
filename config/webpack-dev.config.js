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
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: ( loader ) => [
                                autoprefixer(),
                                postcssPresetEnv(),
                            ],
                            sourceMap: true,
                        },
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ]
    },




    plugins: [],

};