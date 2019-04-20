import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { LogEndpointService } from './_services/logEndpoint.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  async handleError(error: Error) {
    console.error(error);
    const loggingService = this.injector.get(LogEndpointService);
    loggingService.log(error);
    // throw error;
  }
}
