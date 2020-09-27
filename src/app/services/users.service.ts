import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from './global';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable()

export class UsersService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getUsers(token): Observable<any> {
    return this.http.get(this.url + 'getUsers', { headers: httpOptions.headers.set('Authorization', token) });
  }

  addUser(data): Observable<any> {
    return this.http.post(this.url + 'addUser', data, {headers: httpOptions.headers});
  }

  updateUser(token, data): Observable<any> {
    return this.http.post(this.url + 'updateUser', data, {headers: httpOptions.headers.set('Authorization', token)});
  }

  deleteUser(token, data): Observable<any> {
    return this.http.post(this.url + 'deleteUser', data, {headers: httpOptions.headers.set('Authorization', token)});
  }

}
