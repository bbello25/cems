import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const roles = route.data.roles as Array<string>;
    const roles = route.firstChild.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
        this.alertify.warning('You are not authorized to access this area');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }


    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
