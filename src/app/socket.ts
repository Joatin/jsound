

export class Socket {

  static initializeSocket(socket: any): Socket {
    const sock = new Socket(socket);
    sock.init();
    return sock;
  }

  private constructor(
    private socket: any
  ){}

  public init(): void {
    this.socket.on('getdata', ()=> {
      console.log('getdata');
    })
  }
}
