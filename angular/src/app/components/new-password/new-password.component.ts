import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SingUpComponent, private userService: UserService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      UserMail: new FormControl('', [Validators.required, Validators.email])
    });
  }
  mail: string
  //שליחת מייל ללקוח -איפוס סיסמא
  SendMail() {
    debugger
    console.log(typeof this.myForm.controls.UserMail.value)
    this.mail = this.myForm.controls.UserMail.value
    this.userService.sendemail(this.mail).subscribe(res => {
      debugger
      console.log("succsess")
     //  this.dialogRef.close();
    },
      (error) => {
        console.log(error);
      }  
    );
 
  }
  //   this.userService.usermail(a.AdUserId).subscribe(res => {
  //     //this.userService.username(a.AdUserId).subscribe(x=>{
  //     //  this.userName=x;
  //     //  console.log(this.userName)
  //   // }, (error) => { console.log(error) })
  //     this.userMail = res;
  //     console.log("res:  " + res);
  //     this.body = " שלום לך "+localStorage.getItem("currentUserName")+"  אושר לך פרסום המודעה שמספרה " + a.AdId + " יש להכנס לאזורך האישי שבאתר להמשך תהליך הפרסום   ";
  //     this.advertismentService.sendemailmesg(this.userMail, this.subject, this.body).subscribe(res => {
  //       console.log("success")
  //     }, (error) => { console.log(error) })
  //   }, (error) => { console.log(error) })
  // }, (error) => { console.log(error) });
  // console.log(this.Arradvertisment);

  // }
}
