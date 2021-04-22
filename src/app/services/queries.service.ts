import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Queries } from '../model/queries';


@Injectable({ providedIn: 'root' })
export class QueriesService {
    apiUrl = 'http://172.105.61.69:4000/queries';

   

    constructor(private router: Router,private http: HttpClient) {
      
    }

    getData(): Observable<Queries> {
        return this.http.get<Queries>(this.apiUrl);
      }

   deleteData(id:number): Observable<Queries> {
        return this.http.delete<Queries>(`${this.apiUrl }/${id}`,);
      }

   updateData(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.apiUrl}/${id}`, value);
      }
      
}