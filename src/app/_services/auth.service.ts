import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { IdentityUserDto } from '../models/register.model';
import { BaseBody } from '../models/delete.modals';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { FormBuilder } from '@angular/forms';
import {  CreateNewCompanyBodyDto } from '../models/company';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { GeneralResponseDto } from '../models/GeneralResponseDto';
import { Category } from '../models/category';
import { associate } from '../models/associate';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { AddPlayerToCompanyBodyDto } from '../models/AddPlayerToCompanyBodyDto';
import { companyBodyDto } from '../models/companyBodyDto';
import { CategoryBodyDto } from '../models/CategoryBodyDto';

const AUTH_API = 'https://localhost:7098/Auth/';

const Company_API='https://localhost:7098/'

const Company_Delete='https://localhost:7098/Company/'

const Company_Category= 'https://localhost:7098/Category/'

const Player_Delete = 'https://localhost:7098/Player/'

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

 
  constructor(public http: HttpClient, private fb : FormBuilder) { }

  login(UserName: string, Password: string, 
  ): Observable<any> {
    return this.http.post(AUTH_API + 'Login', {
       UserName,
       Password,
       
    }, httpOptions);
  }

  Register(userName: string, password: string,companyId:number): Observable<IdentityUserDto> {
    return this.http.post<IdentityUserDto> (AUTH_API + 'Register/', {
       userName,
       password,
       companyId,
      
    }, httpOptions);
  }
  CreateNewCompany(name:string, address:string ,numberOfEmployees:number):Observable<CreateNewCompanyBodyDto>{
    return this.http.post<CreateNewCompanyBodyDto>(Company_API+ 'Company/CreateNewCompany',{
      name,
      address,
      numberOfEmployees
      

    },httpOptions);
  }
  CreateNewCategory( Name:string,Description:string):Observable<Category>{
    return this.http.post<Category>(Company_API+ 'Category/CreateNewCategory',{
      Name,
      Description

    },httpOptions);
  }
  

  
  // getData(): Observable<Player> {
  // return this.http.get<Player>('https://localhost:7098/Player/GetAll')

  // }
  //inja mikhastamm gheyre any bzaram error mide man interface basebody va company ro daram

 DeleteCompany(id:number):Observable<any>{
  
  return this.http.delete(`${Company_Delete}Delete?id=${id}`,httpOptions )
 
 
}



  
Deleteplayer(id:number):Observable<any>{
  
  return this.http.delete(`${Player_Delete}Delete?id=${id}`,httpOptions )
 
 
}
   
  


  addPlayer(shortName:string,fullName:string,categoryId:number,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string):Observable<CreateNewPlayerBodyDto>{

    return this.http.post<CreateNewPlayerBodyDto>(Company_API+ 'Player/CreateNewPlayer',{

    
      shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color

    },httpOptions)
  }

  
// deleteplayer(id:number):Observable<PlayerBodyDto>{

//   return this.http.delete<PlayerBodyDto>(Company_API+ 'Player/Delete',httpOptions)
// }
 




change( id:number, name:string, address:string ,numberOfEmployees:number):Observable<companyBodyDto>{

  return this.http.post<companyBodyDto>(Company_Delete+ 'Change',{
    id,
    name,
    address,
    numberOfEmployees

  },httpOptions)

}

associate(companyId:number,playerId:number):Observable<AddPlayerToCompanyBodyDto>{
  return this.http.post<AddPlayerToCompanyBodyDto>(Company_API+ 'Company/AddPlayerToCompany',{
   companyId,
   playerId

  },httpOptions);
}




changeplayer(id:number,shortName:string,fullName:string,categoryId:number,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string):Observable<PlayerBodyDto>{

  return this.http.post<PlayerBodyDto>(Company_API+ 'Player/Change',{
    id,shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color
  
  },httpOptions);
}







}