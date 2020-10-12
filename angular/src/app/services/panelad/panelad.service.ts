import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PanelAds } from 'src/app/models/panelad/panel-ads';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PaneladService {
  basicURL = "panelad"
  constructor(private http: HttpClient,public datepipe: DatePipe) { }
  //קבלת לוחות המודעות ע"פ כתובות ועיר
  getpaneladbyaddressanddate(street: string[], city: string, date: Date): Observable<PanelAds[]> {
    date=new Date(this.datepipe.transform(date, 'dd-MM-yyyy'));
    var url = environment.url +  "panelad/getpaneladbyaddressanddate/" +
    street + "/" + city + "/" + date.toLocaleDateString().replace('.', '-').replace('.', '-');
    return this.http.get<PanelAds[]>(url);
  }
}
