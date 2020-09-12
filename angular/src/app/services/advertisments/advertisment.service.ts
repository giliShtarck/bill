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
  advertismetToEdit: Advertisements;
  basicURL = "advertisment"
  constructor(private http: HttpClient) { }
  //הוספת מודעה לבסיס הנתונים
  addadvertisment(a: Advertisements): Observable<Advertisements> {
    return this.http.post<Advertisements>(environment.url + "advertisment/addadvertisment", a);
  }
  //מחיקת מודעה
  deleteadvertisment(adid: number) {
    return this.http.delete(environment.url + this.basicURL + "/deleteadvertisment/" + adid);
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
  //מחזיר את המודעה האחרונה לפי קוד לקוח
  getlastadvertismentsbyuser(userid: number): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getlastadvertismentsbyuser/" + userid);
  }
  //למנהל -כל המודעות שממתינות לאישור
  getallfalseadvertisments(): Observable<Advertisements[]> {
    return this.http.get<Advertisements[]>(environment.url + this.basicURL + "/getallfalseadvertisments");
  }
  // שליפת מודעות ע"פ קטגוריה ועיר - חיפוש
  getadvertismentbycategoryandcity(city: string, category: string): Observable<Advertisements[]> {
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
  //שליחת מייל עדכון לגבי פרסום המודעה
  sendemailmesg(mail: string, sub: string, msg: string) {
    return this.http.get(environment.url + this.basicURL + "/sendemailmesg/" + mail + "/" + sub + "/" + msg);
  }
  // שינוי סטטוס למודעה שאושרה
  ChangeStatus(a: Advertisements) {
    return this.http.put(environment.url + this.basicURL + "/changestatus/", a)
  }
  //שמירת המודעה הנוכחית לעריכה
  EditAd(ad: Advertisements) {
    this.advertismetToEdit = ad;
  }
  //שליפת המודעה להמשך עריכה
  GetEditAd():Advertisements{
    return this.advertismetToEdit;
  }
  //שליחת מודעה לבדיקה איזה תאריכים פנויים לה
  Approval(a:Advertisements,city:string,street:string):Observable<Date[]>{
    return this.http.get<Date[]>(environment.url+this.basicURL+"/approval/"+a+"/"+city+"/"+street)
  }
}
