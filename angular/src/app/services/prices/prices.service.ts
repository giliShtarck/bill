import { Injectable } from '@angular/core';
import { Prices } from 'src/app/models/prices/prices';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  basicURL = "price"
  constructor(private http: HttpClient) { }
  getallprices():Observable<Prices[]>{
    return this.http.get<Prices[]>(environment.url+this.basicURL+"/getallprices");
  }
}
