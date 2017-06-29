declare module '*';

declare module 'socketio-jwt' {
  const jwt: ISocketIoJwt;

  export = jwt;
}

interface ISocketIoJwt {
  authorize(options?: any): () => void;
}
