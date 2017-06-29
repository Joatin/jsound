/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { IoSocket } from './io-socket';

describe('IoSocket', function() {

  it('Should setup socket to listen on each handlers event', function(done) {

    const handlers: any = [
      {
        event: 'event1'
      },
      {
        event: 'event1'
      }
    ];

    const socket = new IoSocket(handlers);

    const socketStub: any = {
      on: stub()
    };

    socket.init(socketStub, null);

    expect(socketStub.on.calledTwice).to.be.true;
    expect(socketStub.on.args[0][0]).to.be.equal('event1');
    expect(socketStub.on.args[1][0]).to.be.equal('event1');
    expect(socketStub.on.args[0][1]).to.not.be.undefined;
    expect(socketStub.on.args[1][1]).to.not.be.undefined;

    done();
  });

  describe('Socket.on() callback', function() {

    beforeEach(function(done) {
      this.validateStub = stub();
      this.handleStub = stub();
      this.handlers = [
        {
          event: '',
          handle: this.handleStub,
          schema: {
            validate: this.validateStub
          }
        }
      ];
      this.socketStub = {
        on: stub()
      };

      this.handleStub.returns('result');

      this.socket = new IoSocket(this.handlers);

      done();
    });

    it('Callback passed to socket.on should validate schema when called', function(done) {
      const validateStub: SinonStub = this.validateStub;
      validateStub.returns({
        error: {}
      });

      const callbackStub = stub();

      this.socket.init(this.socketStub, null);
      this.socketStub.on.args[0][1]('data', callbackStub);

      expect(validateStub.calledOnce).to.be.true;
      expect(validateStub.args[0][0]).to.equal('data');
      expect(validateStub.args[0][1]).to.deep.equal({
        stripUnknown: true
      });

      done();
    });

    it('Callback passed to socket.on should call callback with error if schema validation fails', function(done) {
      const validateStub: SinonStub = this.validateStub;
      validateStub.returns({
        error: {
          description: 'error'
        }
      });

      const callbackStub = stub();

      this.socket.init(this.socketStub, null);
      this.socketStub.on.args[0][1]('data', callbackStub);

      expect(callbackStub.calledOnce).to.be.true;
      expect(callbackStub.args[0][0]).to.deep.equal({
        description: 'error'
      });

      done();
    });

    // tslint:disable-next-line:max-line-length
    it('Callback passed to socket.on should call handle() on the handler if schema validation succeeds', function(done) {
      const validateStub: SinonStub = this.validateStub;
      const handleStub: SinonStub = this.handleStub;

      validateStub.returns({
        error: null,
        value: 'transformed data'
      });

      const callbackStub = stub();

      this.socket.init(this.socketStub, null);
      this.socketStub.on.args[0][1]('data', callbackStub);

      expect(handleStub.calledOnce).to.be.true;
      expect(handleStub.args[0][0]).to.equal('transformed data');

      expect(callbackStub.calledOnce).to.be.true;
      expect(callbackStub.args[0][0]).to.equal('result');

      done();
    });

    // tslint:disable-next-line:max-line-length
    it('Callback passed to socket.on should call handle() and if handle() returns it should call the callback with the result', function(done) {
      const validateStub: SinonStub = this.validateStub;

      validateStub.returns({
        error: null,
        value: 'transformed data'
      });

      const callbackStub = stub();

      this.socket.init(this.socketStub, null);
      this.socketStub.on.args[0][1]('data', callbackStub);

      expect(callbackStub.calledOnce).to.be.true;
      expect(callbackStub.args[0][0]).to.equal('result');

      done();
    });

    // tslint:disable-next-line:max-line-length
    it('Callback passed to socket.on should call handle() and if handle() returns nothing it should call the callback with no params', function(done) {
      const validateStub: SinonStub = this.validateStub;
      const handleStub: SinonStub = this.handleStub;

      validateStub.returns({
        error: null,
        value: 'transformed data'
      });
      handleStub.returns(null);

      const callbackStub = stub();

      this.socket.init(this.socketStub, null);
      this.socketStub.on.args[0][1]('data', callbackStub);

      expect(callbackStub.calledOnce).to.be.true;
      expect(callbackStub.args[0][0]).to.be.undefined;

      done();
    });
  });

});
