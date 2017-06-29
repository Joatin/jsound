/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Observable } from 'rxjs';
import { SinonStub, stub } from 'sinon';
import { IoSocketManager } from './io-socket.manager';

describe('IoSocketManager', function() {

  beforeEach(function(done) {
    this.socketioStub = stub();
    this.onStub = stub();
    this.closeStub = stub();
    this.socketioStub.returns({
      close: this.closeStub,
      on: this.onStub
    });

    this.loggerStub = {
      info: stub(),
      verbose: stub()
    };

    this.socketInitStub = stub();
    this.socketFactoryStub = stub();
    this.socketFactoryStub.returns({
      init: this.socketInitStub
    });

    this.authHandler = 'handler';

    this.manager = new IoSocketManager(
      this.loggerStub,
      this.socketFactoryStub,
      3000,
      this.authHandler,
      this.socketioStub
    );

    this.connectResult = this.manager.connect();

    done();
  });

  it('Connect() should return a observable', function(done) {
    expect(this.connectResult).to.be.instanceof(Observable);

    done();
  });

  it('Observable should call socketio with correct params', function(done) {
    const subscription = this.connectResult.subscribe();

    expect(this.socketioStub.calledOnce).to.be.true;
    expect(this.socketioStub.args[0][0]).to.equal(3000);
    expect(this.socketioStub.args[0][1]).to.deep.equal({
      serveClient: false,
      wsEngine: 'uws'
    });

    subscription.unsubscribe();
    done();
  });

  it('Observable should log the port and then to tell its ready', function(done) {
    const subscription = this.connectResult.subscribe();

    expect(this.loggerStub.info.calledTwice).to.be.true;
    expect(this.loggerStub.info.args[0][0]).to.equal('Connected the socket io server to port: 3000');
    expect(this.loggerStub.info.args[1][0]).to.equal('Listening for connections');

    subscription.unsubscribe();

    done();
  });

  // tslint:disable-next-line:max-line-length
  it('Observable should start listening on the server for connection and pass them to the auth handler', function(done) {
      const subscription = this.connectResult.subscribe();

      expect(this.onStub.calledTwice).to.be.true;
      expect(this.onStub.args[0][0]).to.equal('connection');
      expect(this.onStub.args[0][1]).to.deep.equal(this.authHandler);

      subscription.unsubscribe();

      done();
    }
  );

  it('Observable should start listening on the server for authenticated sockets', function(done) {
    const subscription = this.connectResult.subscribe();

    expect(this.onStub.calledTwice).to.be.true;
    expect(this.onStub.args[1][0]).to.equal('authenticated');

    subscription.unsubscribe();

    done();
  });

  it('Observable should call next when ready', function(done) {
    const subscription = this.connectResult.subscribe(() => {
      done();
    });
    subscription.unsubscribe();
  });

  it('Server should log a message when an authenticated socket connects', function(done) {
    const subscription = this.connectResult.subscribe();

    this.onStub.args[1][1]({ id: 'nr10' });

    expect(this.loggerStub.verbose.calledOnce).to.be.true;
    expect(this.loggerStub.verbose.args[0][0]).to.equal('Client authenticated with socket id: nr10');

    subscription.unsubscribe();

    done();
  });

  it('Server should create a new socket object when connected and then call init on it', function(done) {
    const subscription = this.connectResult.subscribe();

    this.onStub.args[1][1]({ id: 'nr10' });

    expect(this.socketInitStub.calledOnce).to.be.true;
    expect(this.socketInitStub.args[0][0]).to.deep.equal({ id: 'nr10' });

    subscription.unsubscribe();

    done();
  });

  it('Observable should close the server when unsubscribed and then log when its closed', function(done) {
    const subscription = this.connectResult.subscribe();
    this.loggerStub.info.resetHistory();
    subscription.unsubscribe();

    expect(this.closeStub.calledOnce).to.be.true;
    expect(this.loggerStub.info.called).to.be.false;

    this.closeStub.args[0][0]();

    expect(this.loggerStub.info.calledOnce).to.be.true;
    expect(this.loggerStub.info.args[0][0]).to.equal('Server closed');

    done();
  });
});
