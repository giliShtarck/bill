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
    console.log(mail);
    console.log(password);
    return this.http.get<Users>(environment.url + this.basicURL + "/signin/" + mail + "/" + password);
  }
  //התחברות  ראשונית למערכת
  Register(user: Users) {
    console.log(typeof user)
    return this.http.post(environment.url + this.basicURL + "/register", user);
  }
  //שליחת מייל לאיפוס סיסמא ללקוח
  sendemail(useremail: string) {
    console.log(useremail);
    debugger;
    return this.http.get(environment.url  + "users/sendemail/" +  useremail);
  }
}
