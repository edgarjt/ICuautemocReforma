import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from './global';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=UTF-8'
  }),
};

@Injectable()

export class AuthService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  login(data, getToken = null): Observable<any> {
    if (getToken != null) {
      data.getToken = 'true';
    }
    return this.http.post(this.url + 'login', data, { headers: httpOptions.headers });
  }

  dataUser() {
    const data = localStorage.getItem('data_user');
    return JSON.parse(data);
  }

  dataToken() {
    const data = localStorage.getItem('data_token');
    return (data);
  }

  localStorage(DataToken, DataUser) {
    const dataToken = JSON.stringify(DataToken);
    const dataUser = JSON.stringify(DataUser);

    localStorage.setItem('data_token', dataToken);
    localStorage.setItem('data_user', dataUser);
  }

  trashStorage() {
    localStorage.removeItem('data_token');
    localStorage.removeItem('data_user');
    localStorage.clear();
  }

}
