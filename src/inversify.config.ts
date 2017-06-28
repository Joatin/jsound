import { Container, interfaces } from "inversify";
import * as winston from "winston";
import { Application } from "./app/application";
import { Logger } from "./app/logger";
import { Socket } from './app/socket';
import { Handler } from './app/handler';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      label: "Server",
      level: "silly"
    })
  ]
});

const myContainer = new Container();
myContainer.bind<Application>(Application).to(Application).inSingletonScope();
myContainer.bind<Logger>(Logger).toConstantValue(logger);

myContainer.bind<interfaces.Factory<Socket>>("Factory<Socket>").toFactory<Socket>((context: any) => {
  return (socket: any) => {
    return new Socket(socket, context.getAll(Handler));
  };
});

export { myContainer };
