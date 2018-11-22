import { ErrorHandler, Injectable } from '@angular/core';
// import { Logger } from 'cemslogger';

const { name: name } = require('../../package.json');
import * as StackTrace from 'stacktrace-js';
import { AuthService } from './_services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private authservice: AuthService) {
  }

  handleError(error) {
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        })
        .join('\n');
      // log on the server
      // console.log(stackString);
    });


    // const logger = new Logger('localhost:5000', 'wfrrqzens9');
    // logger.log(name, error);

    throw error;

  }
}
