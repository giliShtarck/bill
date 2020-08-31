import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DateAdapter } from '@angular/material/core';
import { PanelAds } from 'src/app/models/panelad/panel-ads';
import { Billboard } from 'src/app/models/billboard/billboard';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BillBoardService {
  basicURL: "billboard"
  constructor(private http: HttpClient) { }
  //שליפת לוח למנהל לפי כתובת
  GetBillBoard(city: string, street: string): Observable<Billboard> {
    return this.http.get<Billboard>(environment.url + this.basicURL + "/getbillboardbycityandstreet/" + city + "/" + street);
  }
  //הוספת לוח
  AddBillBoard(b: Billboard) {
    console.log(typeof b);
    return this.http.post(environment.url + "billboard/addbillboard", b);  
  }
  //מחיקת לוח ע"פ כתובת
  Delete(boardc,boards)
  {
    console.log(boardc,boards)
    return this.http.delete(environment.url  + "billboard/deletebillboard/"+boardc+"/"+boards);
  }
  // שליפת הלוחות
  getbillboards():Observable<Billboard[]>{
    return this.http.get<Billboard[]>(environment.url+"billboard/getallbillboards");
  }
  //קבלת כל הרחובות
  getallstreets(city:string):Observable<string[]>{
    return this.http.get<string[]>(environment.url+"billboard/getallstreets/"+city);

  }
  
}
