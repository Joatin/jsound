import * as spdy from 'spdy';
import * as fs from 'fs';
import {LoggerInstance, Logger, transports} from "winston";

export const defaultPort = 3000;

export class HttpServer{
  private server: any;
  private options: any;
  private logger: LoggerInstance;
  constructor(){
    this.options = {
      // key: fs.readFileSync(__dirname + '/../../spdy-key.pem')
      ssl: false
    };

    this.logger = new (Logger)({
      transports: [
        new (transports.Console)({
          label: 'http-server',
          level: 'silly',
          colorize: true
        }),
        new (transports.File)({ filename: 'http-server-log.log' })
      ]
    });

    this.logger.info('Instanciated http server');
  }

  start(): void{
    let port  = process.env.PORT || defaultPort;
    this.server = spdy.createServer(this.options, (req: any, res: any)=> {
      this.logger.info('Handling request');
      res.writeHead(200);
      res.end('hello world!');
    });

    this.server.listen(port);
    this.logger.info('Listening to port: %d', port);
  }
}
