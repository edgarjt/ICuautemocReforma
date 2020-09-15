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

export class SemestresService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getSemestres(): Observable<any> {
    return this.http.get(this.url + 'getSemestres', { headers: httpOptions.headers });
  }

}
