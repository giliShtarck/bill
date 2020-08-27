import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  basicURL: "category"
  constructor(private http: HttpClient) { }
   //שליפת כל הקטגוריות
  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.url + "category/getallcategories" );
    
  }
  

 

}
