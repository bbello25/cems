import { ErrorHandler, Injectable } from '@angular/core';
// import { Logger } from 'cemslogger';

const { name: name } = require('../../package.json');
import * as StackTrace from 'stacktrace-js';
import { AuthService } from './_services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { log } from 'util';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  url = 'http://localhost:5000/api/log/browserError';
  apiKey = 'k1n3te68fw';

  constructor(private authservice: AuthService) {

  }

  handleError(error) {
    /*StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        })
        .join('\n');

    });*/
    this.log(error);

    // const logger = new Logger('localhost:5000', 'wfrrqzens9');
    // logger.log(name, error);

    throw error;

  }

  log(error: Error) {
    const errorLog = {
      name: error.name,
      source: name,
      message: error.message,
      stacktrace: error.stack,
      timestamp: new Date().toLocaleString()
    };

    fetch(this.url, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      },
      body: JSON.stringify(errorLog)
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

}
