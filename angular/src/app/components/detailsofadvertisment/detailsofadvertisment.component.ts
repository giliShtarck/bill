import { Component, OnInit } from '@angular/core';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { findIndex } from 'rxjs/operators';
import { strict } from 'assert';
@Component({
  selector: 'app-detailsofadvertisment',
  templateUrl: './detailsofadvertisment.component.html',
  styleUrls: ['./detailsofadvertisment.component.scss']
})
export class DetailsofadvertismentComponent implements OnInit {
  Arradvertisment: Advertisements[] = [];
  str: string;
  index: number;
  userMail: string;
  id: NodeJS.Timeout;
  body: string;
  subject: string = "עדכון פרסום המודעה";
  constructor(private advertismentService: AdvertismentService, private categoryService: CategoryService, private router: Router,
    private userService: UserService) { }
  ngOnInit(): void {
    //הכנסת המודעות למערך
    this.advertismentService.getallfalseadvertisments().subscribe(res => {
      res.forEach(element => {
        this.Arradvertisment.push(element);
      })
    },
      (error) => { console.log("error") }
    );
    console.log(this.Arradvertisment)
  }
  //אישור מודעה  שינוי סטטוס
  ChangeStatus(a: Advertisements): void {
    console.log("ChangeStatus" + typeof a);
    this.advertismentService.ChangeStatus(a).subscribe(res => {
      console.log("success");
      for (let index = 0; index < this.Arradvertisment.length; index++) {
        if (this.Arradvertisment[index].AdId == a.AdId) {
          this.Arradvertisment.splice(index, 1);
          break;
        }
      }
      this.userService.usermail(a.AdUserId).subscribe(res => {
        this.userMail = res;
        console.log("res:  " + res);
        this.body = "שלום לקוח יקר אושר לך פרסום המודעה שמספרה " + a.AdId + " נא הכנס לאזורך האישי להמשך הפרסום   ";
        this.advertismentService.sendemailmesg(this.userMail, this.subject, this.body).subscribe(res => {
          console.log("success")
        }, (error) => { console.log(error) })
      }, (error) => { console.log(error) })
    }, (error) => { console.log(error) });
    console.log(this.Arradvertisment);

  }
  //ביטול המודעה -אינה מאושרת
  Cancel(a: Advertisements): void {
    console.log(a);
    this.advertismentService.deleteadvertisment(a.AdId).subscribe(res => {
      console.log("success")
      for (let index = 0; index < this.Arradvertisment.length; index++) {
        if (this.Arradvertisment[index].AdId == a.AdId) {
          this.Arradvertisment.splice(index, 1);
          break;
        }
      }
    }, (error) => { console.log(error) }
    );
  //   this.userService.usermail(a.AdUserId).subscribe(res => {
  //     this.userMail = res;
  //     this.body = "שלום לקוח יקר לצערנו לא אושר לך את פרסום המודעה שמספרה הוא" + a.AdId;
  //     this.advertismentService.sendemailmesg(this.userMail, this.subject, "לצערנו לא ניתן לפרסם את המודעה שלך בשל תוכן לא ראוי").subscribe(res => {
  //       console.log("success")
  //     }, (error) => { console.log(error) })
  //   }, (error) => { console.log(error) })
   }
}



