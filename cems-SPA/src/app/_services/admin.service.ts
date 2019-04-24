import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { Role } from '../_models/Role';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/user/usersWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.put(this.baseUrl + 'admin/user/' + user.username, roles);
  }

  deleteUser(username: string) {
    return this.http.delete(this.baseUrl + 'admin/user/delete/' + username);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'admin/role');
  }

  deleteRole(id: number) {
    return this.http.delete(this.baseUrl + 'admin/role/' + id);
  }

  addRole(roleToAdd: string) {
    return this.http.post(this.baseUrl + 'admin/role', { roleNames: [roleToAdd] });
  }
}
