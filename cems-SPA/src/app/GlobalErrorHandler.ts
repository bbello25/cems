import { ErrorHandler, Injectable } from '@angular/core';

import { CemsLogger } from '@bbellovic/cems-logger-js/dist/es2015/CemsLogger';

const { name: name } = require('../../package.json');
import { User } from './_models/user';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  url = environment.apiUrl + 'log/browserError';
  currentUser: User;
  logger = null;

  constructor() {
    this.logger = new CemsLogger(environment.cemsLoggerURL, environment.cemsLoggerApiKey);
  }

  handleError(error) {
    
    throw error;
  }
}
