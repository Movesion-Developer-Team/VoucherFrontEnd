import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyBodyDto, GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<CompanyBodyDto[]> {
        return this.httpClient.get<GetAllCompaniesResponseDto>(`${environment.apiUrl}Company/GetAll`).pipe(
            map(res => res.companies)
        );
    }

    deleteCompany(id: number): Observable<any> {

        return this.httpClient.delete(`${environment.apiUrl}Company/Delete?id=${id}`);


    }
}