const path = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = [
    {
        name: 'lib',

        mode: 'production',

        entry: ['./lib/index.js', './lib/styles/index.scss'],

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'mdc.js',
            library: {
                type: 'umd',
                name: 'mdc'
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [path.resolve('node_modules')]
                                }
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            new CssExtractPlugin({
                filename: 'mdc.css'
            })
        ],

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
                new CssMinimizerPlugin()
            ]
        }
    },
    {
        name: 'docs',

        mode: 'production',

        entry: './docs/src/index.js',

        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'index.js',
            library: {
                type: 'window',
                name: 'mdc'
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                ['prismjs', {
                                    languages: ['pug', 'scss'],
                                }]
                            ]
                        }
                    }
                }
            ]
        },

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
                new CssMinimizerPlugin()
            ]
        }
    }
];