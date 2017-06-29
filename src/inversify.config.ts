import { Container, interfaces } from 'inversify';
import * as socketio from 'socket.io';
import * as socketioJwt from 'socketio-jwt';
import * as winston from 'winston';
import { Application } from './app/application';
import { Logger } from './app/logger/logger';
import { IoSocket } from './app/socket/io-socket';
import { IoSocketManager } from './app/socket/io-socket.manager';
import { Socket } from './app/socket/socket';
import { SocketManager } from './app/socket/socket.manager';

const socketioJwtOptions = {
  secret: process.env.AUTH_SECRET || 'cJdknY2x27NKeWkmw19YDE0ZvwQZN156',
  timeout: 15000 // 15 seconds to send the authentication message
};

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      label: 'Server',
      level: 'silly'
    })
  ]
});

export const TYPES = {
  socketio: 'TYPE(socketio)'
};

const myContainer = new Container();
myContainer.bind<Application>(Application).to(Application).inSingletonScope();
myContainer.bind<SocketManager>(SocketManager).to(IoSocketManager).inSingletonScope();
myContainer.bind<Logger>(Logger).toConstantValue(logger);
myContainer.bind<Socket>(Socket).to(IoSocket);
myContainer.bind<interfaces.Factory<Socket>>('Factory<Socket>').toAutoFactory<Socket>(Socket);
myContainer.bind<() => void>('AuthorizationHandler').toFunction(socketioJwt.authorize(socketioJwtOptions));
myContainer.bind<SocketIOStatic>(TYPES.socketio).toConstantValue(socketio);

myContainer.bind<number>('PORT').toConstantValue(process.env.PORT || 3100);

export { myContainer };
