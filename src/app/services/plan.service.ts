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

export class PlanService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getPlan(): Observable<any> {
    return this.http.get(this.url + 'getPlan', { headers: httpOptions.headers });
  }

}
