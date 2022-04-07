import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = 'https://localhost:7098/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(public http: HttpClient) { }

  login(UserName: string, Password: string, 
  ): Observable<any> {
    return this.http.post(AUTH_API + 'Login/login/', {
       UserName,
       Password,
       
    }, httpOptions);
  }

  Register(UserName: string, Password: string,CompanyId:string): Observable<any> {
    return this.http.post(AUTH_API + 'Register/', {
       UserName,
       Password,
       CompanyId,
      
    }, httpOptions);
  }
}
