import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=UTF-8'
    })
  };
  
  @Injectable()
  
  export class DifucionService {
    public url: string;
  
    constructor(private http: HttpClient) {
      this.url = Global.url;
    }
  
    getDifucion(): Observable<any> {
      return this.http.get(this.url + 'getDifucion', { headers: httpOptions.headers });
    }
  }
  