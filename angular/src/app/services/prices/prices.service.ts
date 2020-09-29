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
  //שולפת את מערך המחירים בשביל לדעת את היחידות הנתנות לפרסום
  getallprices():Observable<Prices[]>{
    return this.http.get<Prices[]>(environment.url+this.basicURL+"/getallprices");
  }
  //מחשבת מחיר של המודעה
  calcPrice(num:number,city:string,street:string,numWeek:number):Observable<number>{
    return this.http.get<number>(environment.url+this.basicURL+"/calcprice/"+num+"/"+city+"/"+street+"/"+numWeek);
  }
}
