import { ErrorHandler, Injectable } from '@angular/core';
import { CemsLogger } from '@bbellovic/cems-logger-js/dist/es2015/CemsLogger';
// import { CemsLogger } from '../../../../cems-logger-javascript2/src/CemsLogger';

const { name: name } = require('../../package.json');
import { User } from './_models/user';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  url = environment.apiUrl + 'log/browserError';
  currentUser: User;
  logger: CemsLogger = null;

  constructor() {
    this.logger = CemsLogger.initLogger({
      endPointUrl: environment.cemsLoggerURL,
      apiKey: environment.cemsLoggerApiKey,
      appName: name,
      email: 'b.bellovic@gmail.com'
    });
  }

  async handleError(error: Error) {
    console.error(error);
    await this.logger.sendLog(error);
    // throw error;
  }
}
