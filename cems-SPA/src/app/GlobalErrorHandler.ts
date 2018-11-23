import { ErrorHandler, Injectable } from '@angular/core';

const { name: name } = require('../../package.json');
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';
import { AlertifyService } from './_services/alertify.service';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  url = environment.apiUrl + 'log/browserError';
  currentUser: User;

  constructor(private authService: AuthService, private alertify: AlertifyService) {
    // this.authService.currentUser.subscribe(x => this.currentUser = x);
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const errorLog = {
      name: error.name,
      source: name,
      message: error.message,
      stacktrace: error.stack,
      timestamp: new Date().toLocaleString(),
      progLanguage: 'JavaScript'
    };
    if (this.currentUser == null) {
      this.alertify.error('Api key is null');
      return;
    }
    fetch(this.url, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'api-key': this.currentUser.webApiKey.apiKey
      },
      body: JSON.stringify(errorLog)
    })
      .then(res => {
        console.log(res.status.toString());
      })
      // .then(res => console.log(res)
      .catch(err => this.alertify.error(err));
  }

}
