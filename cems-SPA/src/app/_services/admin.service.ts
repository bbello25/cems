import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { ErrorLog } from '../_models/ErrorLog';
import { Log } from '@angular/core/testing/src/logger';
import { Role } from '../_models/Role';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.put(
      this.baseUrl + 'admin/' + user.username,
      roles
    );
  }

  deleteUser(username: string) {
    return this.http.delete(this.baseUrl + 'admin/delete/' + username);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'roles');
  }

  deleteRole(id: number) {
    return this.http.delete(this.baseUrl + 'roles/' + id);
  }

  addRole(roleToAdd: string) {
    return this.http.post(this.baseUrl + 'roles', { roleNames: [roleToAdd] });
  }
}
