const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );




module.exports = {

    entry: './src/assets/javascript/main.js',
    output: {
        filename: './src/assets/javascript/bundle.min.js',
    },




    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
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
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
        ]
    },




    plugins: [
        new ExtractTextPlugin({
            allChunks: true,
            filename: 'src/_includes/css/main.min.css',
        }),
        new UglifyJSPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],

};