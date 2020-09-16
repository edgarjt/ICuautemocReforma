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

export class CarrerasService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getCarreras(): Observable<any> {
    return this.http.get(this.url + 'getCarreras', { headers: httpOptions.headers });
  }

  addCarrera(data): Observable<any> {
    return this.http.post(this.url + 'addCarrera', data, {headers: httpOptions.headers});
  }

  editCarrera(data): Observable<any> {
    return this.http.post(this.url + 'editCarrera', data, {headers: httpOptions.headers});
  }

  deleteCarrera(data): Observable<any> {
    return this.http.post(this.url + 'deleteCarrera', data, {headers: httpOptions.headers});
  }
}
