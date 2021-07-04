const autoprefixer = require( 'autoprefixer' );
const ChunksWebpackPlugin = require( 'chunks-webpack-plugin' );
const cssnano = require( 'cssnano' );
const miniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const TerserPlugin = require( 'terser-webpack-plugin' );




// ES5 bundle
// Creates polyfilled ES5 JS
const es5 = {

    mode: 'production',
    stats: 'verbose',
    context: path.resolve( __dirname, '../src/' ),
    entry: {
        main: './assets/javascript/main.js'
    },
    output: {
        filename: './assets/javascript/es5/[name].min.js',
        path: path.resolve( __dirname, '../src/' ),
        publicPath: '',
    },




    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
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
                options: {
                    ignore: [ /\/core-js/ ],
                    sourceType: "unambiguous",
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                corejs: 3,
                                useBuiltIns: 'usage',
                            }
                        ]
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: 'ignore-loader',
            },
        ]
    },

};


// ESM bundle
// Creates ESM JS + minified CSS
const esm = {

    mode: 'production',
    stats: 'verbose',
    context: path.resolve( __dirname, '../src/' ),
    entry: {
        main: './assets/javascript/main.js'
    },
    output: {
        filename: './assets/javascript/esm/[name]-[contenthash:8].min.js',
        path: path.resolve( __dirname, '../src/' ),
        publicPath: '',
    },




    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
                    compress: true,
                    ecma: 8,
                    format: {
                        comments: false
                    },
                    safari10: true,
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
                options: {
                    ignore: [ /\/core-js/ ],
                    sourceType: "unambiguous",
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            }
                        ]
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        autoprefixer({
                                            remove: false,
                                        }),
                                        cssnano({
                                            preset: ['default'],
                                        }),
                                        postcssPresetEnv({}),
                                    ]
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
        new ChunksWebpackPlugin({
            customFormatTags: (chunksSorted, Entrypoint) => {
                const styles = chunksSorted.styles
                    .map(chunkCSS => `<link rel="stylesheet" href="${chunkCSS}">`)
                    .join('');

                const scripts = chunksSorted.scripts
                    .map(chunkJS => {
                        return `
                            <script>
                                var script = document.createElement('script');
                                script.src = (!('noModule' in script))
                                    ? "${chunkJS.replace('assets/javascript/esm', 'assets/javascript/es5').slice(0, -16)}.min.js"
                                    : "${chunkJS}";
                                document.head.appendChild(script);
                            </script>`;
                    })
                    .join('');

                return { styles, scripts };
            },
            filename: '_includes/partials/[name]-[type].temp.html',
        }),
    ],

};


module.exports = [ es5, esm ];