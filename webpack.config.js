const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/assets/js/index.js',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile .js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/, // Bundle .css files
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/img',
                            name: '[name].[ext]', // Maintain original file name and extension
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65 // Adjust quality settings as needed
                            },
                            // Optimize PNG images
                            optipng: {
                                enabled: true,
                            },
                            // Optimize SVG files
                            svgo: {
                                plugins: [
                                    { removeViewBox: false },
                                    { cleanupIDs: false }
                                ]
                            },
                            // Optimize GIF images
                            gifsicle: {
                                interlaced: false,
                            },
                            // Enable WebP for better compression (optional)
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/pdf',
                            name: '[name].[ext]',
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Serve content from the 'src' directory
        },
        // ... other configurations ...
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './index.html',

        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/index.html', // path to your English index file
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/index.html', // output file name
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './about.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/about.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/about.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/projects.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './projects.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/projects.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/projects.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/philosophers.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './philosophers.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/philosophers.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/philosophers.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/minishell.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './minishell.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/minishell.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/minishell.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/fdf.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './fdf.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/pt-BR/fdf.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: './pt-BR/fdf.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets/img/thumbnail.png', to: 'assets/img/thumbnail.png' },
            ],
        }),
        new MiniCssExtractPlugin() // Extract CSS into separate files
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
};