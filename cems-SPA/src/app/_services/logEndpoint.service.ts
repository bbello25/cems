import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CemsLogger } from '@bbellovic/cems-logger-js';
const { name: name } = require('../../../package.json');

@Injectable({
  providedIn: 'root'
})
export class LogEndpointService {
  url = environment.apiUrl + 'log/browserError';
  logger: CemsLogger = null;

  constructor() {
    this.logger = CemsLogger.initLogger({
      endPointUrl: environment.cemsLoggerURL,
      apiKey: environment.cemsLoggerApiKey,
      appName: name,
      email: 'b.bellovic@gmail.com'
    });
  }

   async log(error: Error) {
    await this.logger.sendLog(error);
  }
}
