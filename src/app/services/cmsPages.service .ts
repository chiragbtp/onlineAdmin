import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CmsPage } from 'app/model/cmsPage';


@Injectable({ providedIn: 'root' })
export class CmsPagesService {
    apiUrl = 'http://172.105.61.69:4000/cmspages';

   

    constructor(private router: Router,private http: HttpClient) {
      
    }

    getCms(): Observable<CmsPage> {
        return this.http.get<CmsPage>(this.apiUrl);
      }

   deleteCms(id:number): Observable<CmsPage> {
        return this.http.delete<CmsPage>(`${this.apiUrl }/${id}`,);
      }

   updateCms(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.apiUrl}/${id}`, value);
      }

   saveCms(params): Observable<CmsPage> {
      
        return this.http.post<CmsPage>(`${this.apiUrl}/save`,params) ;
      }
      
}