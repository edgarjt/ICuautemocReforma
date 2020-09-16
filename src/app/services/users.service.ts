import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from './global';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=UTF-8',
  }),
};

@Injectable()

export class UsersService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url + 'getUsers', { headers: httpOptions.headers });
  }

  addUser(data): Observable<any> {
    return this.http.post(this.url + 'addUser', data, {headers: httpOptions.headers});
  }

  updateUser(data): Observable<any> {
    return this.http.post(this.url + 'updateUser', data);
  }

  deleteUser(data): Observable<any> {
    return this.http.post(this.url + 'deleteUser', data);
  }

}
