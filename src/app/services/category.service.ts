import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CategoryBodyDto, CategoryMainResponseDto } from '../models/CategoryBodyDto';
import { environment } from 'src/environments/environment';
import { GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';

@Injectable({providedIn: 'root'})
export class CategoryService {
    constructor(private httpClient: HttpClient) { }
    
    findById(id: number): Observable<CategoryBodyDto | undefined>{
        return this.httpClient.get<CategoryMainResponseDto>(`${environment.apiUrl}Category/FindById?id=${id}`).pipe(
            map(res => res.category)
        );
        
    }

    getAll(): Observable<CategoryBodyDto[]> {
        return this.httpClient.get<GetAllCategoriesResponseDto>('https://localhost:7098/Category/GetAll').pipe(
            map(res => res.categories)
        );
    }

    updateCategory(id: number, name: string, description: string): Observable<CategoryBodyDto> {

        return this.httpClient.post<CategoryBodyDto>(environment.apiUrl + 'Category/Change', {
            id,
            name,
            description

        });
    }


    deleteCategory(id: number): Observable<any> {

        return this.httpClient.delete(`${environment.apiUrl}Category/Delete?id=${id}`);


    }

}