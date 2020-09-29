import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/user/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  basicURL = "users"
  constructor(private http: HttpClient) { }
  //כניסה למערכת
  SignIn(mail: string, password: string): Observable<Users> {
    return this.http.get<Users>(environment.url + this.basicURL + "/signin/" + mail + "/" + password);
  }
  //התחברות  ראשונית למערכת
  Register(user: Users) {
    return this.http.post(environment.url + this.basicURL + "/register", user);
  }
  //שליחת מייל לאיפוס סיסמא ללקוח
  sendemail(useremail: string) {
    return this.http.get(environment.url + "users/sendemail/" + useremail);
  }
  //קבלת מייל לקוח ע"פ הקוד
  usermail(userId: number): Observable<string> {
    return this.http.get<string>(environment.url + this.basicURL + "/usermail/" + userId);
  }
  // קבלת שם לקוח ע"פ קוד לקוח
  username(userId:number):Observable<string>{
    return this.http.get<string>(environment.url+this.basicURL+"/username/"+userId);
  }
}
