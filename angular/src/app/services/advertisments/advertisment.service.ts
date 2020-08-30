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
  addadvertisment(a: Advertisements) {
    console.log(a)
    return this.http.post(environment.url + "advertisment/addadvertisment", a);
  }
  deleteadvertisment(a: Advertisements) {
    return this.http.delete(environment.url + "deleteadvertisment/" + a);
  }
  getadvertisementsbydate(date: Date): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertisementsbydate/" + date);
  }
  getadvertisementsbycategory(category: Category): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertisementsbycategory/" + category);
  }
  getalladvertisments(): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getalladvertisments");
  }
  getalladvertismentsforuser(userid: number): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getalladvertismentsforuser/" + userid);
  }
  getlastadvertismentsbyuser(userid: number): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getlastadvertismentsbyuser/" + userid);
  }
  getallfalseadvertisments(): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getallfalseadvertisments");
  }
  getadvertismentbycategoryandcity(city: string, category: string): Observable<Advertisements[]> {
    console.log(city, category);
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getadvertismentbycategoryandcity/" + city + "/" + category);
  }
  updateadviews(AdId: number) {
    return this.http.put(environment.url + this.basicURL + "/updateadviews", AdId);
  }
}
