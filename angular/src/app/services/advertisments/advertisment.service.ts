import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category/category';
@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {
  Approval(c: Advertisements) {
    return this.http.put(environment.url + this.basicURL + "/Approval", c);
  }
  basicURL = "advertisment"
  arrAdvertisments: Advertisements[] = [{
    AdId: 111, AdCategory: 1, AdDateBegin: new Date(), AdDateEnd: new Date(),
    AdDateRequest: new Date(), AdHeight: 2, AdUserId: 3, AdWidth: 3, AdViews: 0, AdFiles: "", AdStatus: false
  }];
  constructor(private http: HttpClient) { }
  // AddAdvertismentToArr(ad: Advertisements): void {
  //   this.arrAdvertisments.push(ad);
  // }
  // GetArrAdvertisments():Advertisements[]{
  //   console.log(typeof this.arrAdvertisments);
  //   return this.arrAdvertisments;
  // }
  //הוספת מודעה לבסיס הנתונים
  addadvertisment(a: Advertisements):Observable<Advertisements> {
    console.log(a)
    return this.http.post<Advertisements>(environment.url + "advertisment/addadvertisment", a);
  }
  //מחיקת מודעה
  deleteadvertisment(a: Advertisements) {
    return this.http.delete(environment.url + "deleteadvertisment/" + a);
  }
  //שליפת מודעות לפי תאריך 
  getadvertisementsbydate(date: Date): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertisementsbydate/" + date);
  }
  //שליפת מודעות לפי קטגוריה
  getadvertisementsbycategory(category: Category): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertisementsbycategory/" + category);
  }
  //שליפת כל המודעות
  getalladvertisments(): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getalladvertisments");
  }
  //שליפת כל מודעות הלקוח
  getalladvertismentsforuser(userid: number): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getalladvertismentsforuser/" + userid);
  }
  //
  getlastadvertismentsbyuser(userid: number): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getlastadvertismentsbyuser/" + userid);
  }
  //
  getallfalseadvertisments(): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getallfalseadvertisments");
  }
  // שליפת מודעות ע"פ קטגוריה ועיר - חיפוש
  getadvertismentbycategoryandcity(city: string, category: string): Observable<Advertisements[]> {
    console.log(city, category);
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertismentbycategoryandcity/" + city + "/" + category);
  }
  //עדכון מס הצפיות במודעה
  updateadviews(AdId: number) {
    return this.http.put(environment.url + this.basicURL + "/updateadviews", AdId);
  }
  //עדכון נתוני המודעה
  updatead(a: Advertisements): Observable<Advertisements> {
    return this.http.put<Advertisements>(environment.url + this.basicURL + "/updatead", a);
  }
}
