import {SocketCluster} from 'socketcluster';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

const numCpus = os.cpus().length;
let numWorkers = 1;
if(process.env['ENV'] === 'production'){
  numWorkers = process.env.NUM_WORKERS || numCpus;
}

let socketCluster = new SocketCluster({
  workers: numWorkers,
  brokers: 1,
  port: process.env.PORT || 8000,
  appName: 'jsound',
  wsEngine: 'ws',
  httpServerModule: path.join(__dirname, '/http-server.js'),
  workerController: path.join(__dirname, '/worker.js'),
  brokerController: path.join(__dirname, '/broker.js'),
  rebootWorkerOnCrash: false,
  protocol: 'https',
  logLevel: 3,
  protocolOptions: {
    key: fs.readFileSync(__dirname + '/../../spdy-key.pem'),
    cert: fs.readFileSync(__dirname + '/../../spdy-cert.cert')
  },
  authKey: 'secret'
});
