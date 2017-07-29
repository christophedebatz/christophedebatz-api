import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use('/assets', express.static('assets'));
  }

  private routes(): void {
    let router = express.Router();

    var htmlPath = path.join(__dirname, '..', 'index.html');
    router.get('/', (request: Request, res: Response, next: NextFunction) => {
      fs.readFile(htmlPath, (err: Error, data: Buffer) => { 
            if (err)
                throw err;
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.write(data); 
            res.end(); 
        }); 
    });
    
    this.express.use('/', router);
  }

}

export default new App().express;