/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import * as Joi from 'joi';
import { Handler } from './handler';

describe('Handler', function() {
  const handlerImpl = class extends Handler {
    public handle(data, socket, manager) {
      // nothing here
    }
  };

  it('Event should return the event name provided in the constructor', function(done) {
    const handler =  new handlerImpl('test name', null);

    expect(handler.event).to.equal('test name');

    done();
  });

  it('Schema should return the schema provided in the constructor', function(done) {
    const testSchema = Joi.object({
      a: Joi.string()
    });

    const handler =  new handlerImpl(null, testSchema);

    expect(handler.schema).to.equal(testSchema);

    done();
  });
});
