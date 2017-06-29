/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { stub } from 'sinon';
import { Application } from './application';

describe('Application', function() {

  it('test that mocha is running', function(done) {
    expect(true).to.equal(true);

    done();
  });

  it('Start should log that application is starting', function(done) {
    const infoStub = stub();
    const logger = {
      info: infoStub
    } as any;

    const subscribeStub = stub();
    const connectStub = stub().returns({
      subscribe: subscribeStub
    });
    const manager = {
      connect: connectStub
    } as any;

    const application = new Application(logger, manager);

    application.start();

    expect(infoStub.calledOnce).to.be.true;

    done();
  });

  it('Start should call connect to start the server', function(done) {
    const infoStub = stub();
    const logger = {
      info: infoStub
    } as any;

    const subscribeStub = stub();
    const connectStub = stub().returns({
      subscribe: subscribeStub
    });
    const manager = {
      connect: connectStub
    } as any;

    const application = new Application(logger, manager);

    application.start();

    expect(infoStub.calledOnce).to.be.true;
    expect(subscribeStub.calledOnce).to.be.true;

    done();
  });
});
