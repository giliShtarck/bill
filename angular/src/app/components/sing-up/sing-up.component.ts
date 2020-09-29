import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewPasswordComponent } from '../new-password/new-password.component';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  email: string; password: string;
  myForm: FormGroup;
  hide = true;
  constructor(private userService: UserService, private DomSanitizer: DomSanitizer, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      UserMail: new FormControl('', [Validators.required, Validators.email]),
      Userpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  //פתיחת דיאלוג לאיפוס סיסמא
  OpenDialog (): void {
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: '250px',
      data: {name:"aaa", animal: "animal"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
//כניסנה למערכת
  SignIn() {
    this.email = this.myForm.controls.UserMail.value;
    this.password = this.myForm.controls.Userpassword.value;
    this.userService.SignIn(this.email, this.password).subscribe(res => {
      console.log(res);
      localStorage.setItem("currentUserId", res.UserId.toString());
      localStorage.setItem("currentUserMail", res.UserMail);
      localStorage.setItem("currentUserName", res.UserName);
      if (res.UserMail == "manager@gmail.com") {
        console.log("true");
        this.router.navigate(["manager"]);
      }
      else {
        this.router.navigate(["customer"]);
      }
      console.log(localStorage.getItem("currentUserId"))
      console.log("success!");
    },
      (error) => {
        console.log(error, "user not found");
      }
    );
  }
}
