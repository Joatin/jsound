var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        'http-server': './src/server/http-server/http-server.ts',
        'broker': './src/server/broker/main.ts',
        'worker': './src/server/worker/main.ts',
        'server': './src/server/server.ts'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist/server'),
        publicPath: path.join(__dirname, 'dist/server'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader?configFileName=tsconfig.server.json']
            }
        ]
    }
}