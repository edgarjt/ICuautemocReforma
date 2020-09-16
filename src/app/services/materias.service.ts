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

export class MateriasService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getMaterias(): Observable<any> {
    return this.http.get(this.url + 'getMaterias', { headers: httpOptions.headers });
  }

  addMateria(data): Observable<any> {
    return this.http.post(this.url + 'addMateria', data);
  }

  viewPdf() {
    return this.url + 'viewPdf/';
  }
  editMateria(data): Observable<any> {
    return this.http.post(this.url + 'editMateria', data);
  }

  deleteMateria(data): Observable<any> {
    return this.http.post(this.url + 'deleteMateria', data, { headers: httpOptions.headers });
  }

}
