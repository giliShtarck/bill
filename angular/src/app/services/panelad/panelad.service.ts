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
  d2: Date = new Date();
  d: string[] = []
  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  //קבלת לוחות המודעות ע"פ כתובות ועיר
  getpaneladbyaddressanddate(street: string[], city: string, date: Date): Observable<PanelAds[]> {
    debugger
    // let date_ob = new Date();
    // let date2 = ("0" + date_ob.getDate()).slice(-2);
    // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // let year = date_ob.getFullYear();
    // console.log(year + "-" + month + "-" + date2);
    // console.log("date: " + date)
    // this.d = date.toString().split(' ');
    // console.log("d: ", this.d)
    // var newdate = new Date(this.d[2] + "." + this.d[1] + "." + this.d[3])
    // console.log("newdate: ", newdate)
    console.log(date)

    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    // this.d2 = new Date(Number(day), Number(month), Number(year))
    // this.d2.setFullYear(Number(year));
    // this.d2.setDate(Number(day))
    // this, this.d2.setMonth(Number(day))
    console.log(day + "-" + month + "-" + year);
    var dateFormat = date.getUTCFullYear() +
      '-' + (date.getUTCMonth() + 1) +
      '-' + (date.getUTCDate() + 1);
    // console.log(this.d2);
    //console.log(newdate.toLocaleDateString().replace('.', '-').replace('.', '-'))
    // date = new Date(this.datepipe.transform(date, 'dd-mm-yyyy'));
    var url = environment.url + "panelad/getpaneladbyaddressanddate/"
      + street + "/" + city + "/" + dateFormat;
    return this.http.get<PanelAds[]>(url);


  }


}
