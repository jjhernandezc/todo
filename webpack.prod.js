
const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPliugin                    = require('copy-webpack-plugin');
const { CleanWebpackPlugin }         = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: 
    {
        rules: [
            {
                test: /\.css$/i,
                exclude:  /estilos\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /estilos\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png| jpg| svg|gif)$/, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModelue: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPliugin({
            patterns: [
            {from: 'src/insumos', to: 'insumos/'}
            ],
            options: {
                concurrency: 100,
              }
        }),
        new CleanWebpackPlugin()
    ]
}

