import { Container } from 'inversify';
import { Application } from './app/application';
import * as winston from 'winston';
import { Logger } from './app/logger';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'silly',
      colorize: true,
      label: 'Server'
    })
  ]
});

const myContainer = new Container();
myContainer.bind<Application>(Application).to(Application);
myContainer.bind<Logger>(Logger).toConstantValue(logger);

export { myContainer };
