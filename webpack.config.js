
const HtmlWebPackPlugin              = require('html-webpack-plugin');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPliugin                    = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin()]
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
            felename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            felename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPliugin({
            patterns: [
            {from: 'src/insumos', to: 'insumos/'}
            ],
            options: {
                concurrency: 100,
              }
        })
    ]
}

