import { Container } from "inversify";
import * as winston from "winston";
import { Application } from "./app/application";
import { Logger } from "./app/logger";

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
myContainer.bind<Application>(Application).to(Application);
myContainer.bind<Logger>(Logger).toConstantValue(logger);

export { myContainer };
