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

  addSemestre(data): Observable<any> {
    return this.http.post(this.url + 'addSemestre', data, { headers: httpOptions.headers });
  }

  editSemestre(data): Observable<any> {
    return this.http.post(this.url + 'editSemestre', data, { headers: httpOptions.headers });
  }

  deleteSemestre(data): Observable<any> {
    return this.http.post(this.url + 'deleteSemestre', data, { headers: httpOptions.headers });
  }

}
