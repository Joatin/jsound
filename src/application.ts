import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Application {

  private app = express();

  constructor() {
  }

  public start() {

      this.app.use(bodyParser.urlencoded({ extended: true }));

      this.app.use(bodyParser.json());

      this.app.listen(9999);
  }
}
