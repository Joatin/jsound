import * as spdy from 'spdy';
import * as express from 'express';
import * as config from '../../../webpack.config.js';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as path from 'path';
import * as historyApiFallback from 'connect-history-api-fallback';

export function createServer(protocolOptions){
    // TODO: Assert on missing protocol
    let options = protocolOptions || {};
    let app = express();
    if(process.env['ENV'] === 'production'){

    }else{
        let compiler = webpack(config);
        app.use(historyApiFallback({index: '/index.html'}))
        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            stats: {colors: true}
        }));
        app.use(webpackHotMiddleware(compiler, {
            log: console.log
        }));
        app.use(express.static(path.join(__dirname, '../../bower_components')));
    }

    let server = spdy.createServer(options, app);
    return server;
}