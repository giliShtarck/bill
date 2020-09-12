import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PanelAds } from 'src/app/models/panelad/panel-ads';

@Injectable({
  providedIn: 'root'
})
export class PaneladService {
  basicURL = "panelad"
  constructor(private http: HttpClient) { }
  //קבלת לוחות המודעות ע"פ כתובות ועיר
  getpaneladbyaddressanddate(street: string[], city: string, date: Date): Observable<PanelAds[]> {
    street.forEach(element => {
    });
    return this.http.get<PanelAds[]>(environment.url + this.basicURL + "/getpaneladbyaddressanddate/" + street + "/" + city + "/" + date.toLocaleDateString().replace('.', '-').replace('.', '-'))
  }
}
