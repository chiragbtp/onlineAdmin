import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  baseurl ="http://172.105.61.69:4000/users/authenticate";
  // baseurl = "http://mybook77.com:3080/api/v1/";
  // baseurl ="https://admin.mybook77.com/api/v1/";
  
  // baseurl = this.constantsService.API_ENDPOINT;

  DisplayHeader(){
    let reqHeader = new HttpHeaders().set('Content-Type', 'application/json');
    reqHeader =reqHeader.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return reqHeader;
  }


  login(data) {
    return this.http.post<any>(this.baseurl +'login',data);

  }
  get_csrf_token() {
    return this.http.get<any>(this.baseurl +'get_token');
  }

  logout(){
   // console.log(this.DisplayHeader());
    return this.http.post<any>(this.baseurl+'logout','',{headers:this.DisplayHeader()});
  }
}
