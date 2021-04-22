import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CmsPage } from 'app/model/cmsPage';
import { NewsLetter } from 'app/model/newsLetter';


@Injectable({ providedIn: 'root' })
export class NewsLetterService {
    apiUrl = 'http://172.105.61.69:4000/newsletters';

   

    constructor(private router: Router,private http: HttpClient) {
      
    }

    getNewsLetter(): Observable<NewsLetter> {
        return this.http.get<NewsLetter>(this.apiUrl);
      }

   deleteCms(id:number): Observable<NewsLetter> {
        return this.http.delete<NewsLetter>(`${this.apiUrl }/${id}`,);
      }

  
      
}