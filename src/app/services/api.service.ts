import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMentor } from '../shared/mentor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }

  private _url: string = "/assets/mentor/mentor.json/"

  constructor(private http: HttpClient) { }

  getDataMentor(): Observable<IMentor[]>{
    return this.http.get<IMentor[]>(this._url);
  }

  postDataMentor(body:any):Observable<IMentor[]>{
    return this.http.post<IMentor[]>(this._url,body);
  }

  deleteMentor(id: any):Observable<IMentor[]>{
    return this.http.delete<IMentor[]>(`${this._url}${id}`, this.httpOptions);
  }
}
