var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: './static/js/index',
        vendor: ['react']
    },
    output: {
        path: './dest/',
        filename: isProduction ? '[name].[hash:7].js' : '[name].js',
        chunkFilename: isProduction ? '[id].[hash:7].js' : '[id].js',
        jsonpFunction: '__wpjp_'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader?presets[]=es2015,presets[]=react&+cacheDirectory']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=25000'
        }, {
            test: /\.less$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new Clean(['dest']),
        new CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            '__DEV__': !isProduction
        }),
        new ExtractTextPlugin(isProduction ? '[name].[contenthash:7].css' : '[name].css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeTagWhitespace: true,
                removeEmptyAttributes: true
            }
        })
    ]
};
