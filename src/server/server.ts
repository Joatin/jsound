import {SocketCluster} from 'socketcluster';
import * as os from 'os';
import * as path from 'path';

const numCpus = os.cpus().length;
console.log(numCpus);
let socketCluster = new SocketCluster({
  workers: process.env.NUM_WORKERS || numCpus,
  brokers: 1,
  port: process.env.PORT || 8000,
  appName: 'jsound',
  wsEngine: 'ws',
  workerController: path.join(__dirname, '/worker/worker.js'),
  brokerController: path.join(__dirname, '/broker/broker.js'),
  rebootWorkerOnCrash: true
});
