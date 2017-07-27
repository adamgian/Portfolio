const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {

    entry: './assets/javascript/main.js',
    output: {
        filename: './assets/javascript/dist/bundle.js',
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
            filename: 'assets/styles/main.css',
        }),
    ],

};