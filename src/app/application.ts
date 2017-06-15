import * as socketio from 'socket.io';
import * as socketioJwt from 'socketio-jwt';

export class Application {

  private server;

  constructor() {
  }

  public start() {

    this.server = socketio(3100, {
      serveClient: false
    });

    this.server.on('connection', socketioJwt.authorize({
        secret: 'cJdknY2x27NKeWkmw19YDE0ZvwQZN156',
        timeout: 15000 // 15 seconds to send the authentication message
      }))
      .on('authenticated', (socket) => {
        //this socket is authenticated, we are good to handle more events from it.
        console.log('hello! ' + JSON.stringify(socket.decoded_token));
      });
  }
}
