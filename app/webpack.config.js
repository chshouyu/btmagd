var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var __PROD__ = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: './static/js/index',
        vendor: ['react']
    },
    output: {
        path: './dest/',
        filename: __PROD__ ? '[name].[hash:7].js' : '[name].js',
        chunkFilename: __PROD__ ? '[id].[hash:7].js' : '[id].js',
        jsonpFunction: '__wpjp_'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015,presets[]=react&+cacheDirectory']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=25000'
        }]
    },
    plugins: [
        new Clean(['dest']),
        new CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(__PROD__ ? 'production' : 'development'),
            '__DEV__': !__PROD__
        }),
        new ExtractTextPlugin(__PROD__ ? '[name].[contenthash:7].css' : '[name].css'),
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
