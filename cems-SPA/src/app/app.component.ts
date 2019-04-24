import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';
import { LogService } from './_services/log.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'cems-SPA';
  jwtHelper = new JwtHelperService();
  currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.authService.currentUser = user;
    }
  }
}
