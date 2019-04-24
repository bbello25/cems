import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TrustedHost } from '../_models/TrustedHost';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}users/${id}`);
  }

  update(user: User) {
    return this.http.put(`${this.baseUrl}users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}users/${id}`);
  }

  updateTrustedHosts(id: number, trustedHosts: any) {
    return this.http.post(this.baseUrl + 'user/update/' + id, trustedHosts);
  }

  /*addHost(host: string) {
    return this.http.post(this.baseUrl + 'user/add/' + host);
  }*/

}
