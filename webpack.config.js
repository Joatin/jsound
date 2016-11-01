var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/client/polyfills.ts',
        'vendor': './src/client/vendor.ts',
        'app': './src/client/main.ts'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.html'],
        modulesDirectories: ["node_modules", "bower_components"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            },
            {
                test: /\.html$/,
                loaders: ['html', ExtractTextPlugin.extract('html?attrs=link:href')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loader: 'sass'
            }
        ]
    },

    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/],
        attrs: ['img:src', 'link:href'],
        interpolate: true
    },

    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/client/index.pug'
        }),
        new CopyWebpackPlugin([
            { from: './src/client/assets', to: 'assets' }
        ])
    ]
};
