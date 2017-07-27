const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




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
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
        ]
    },




    plugins: [
        new CssoWebpackPlugin({
            comments: false,
        }),
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