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
  //שליחת מייל ללקוח -איפוס סיסמא
  SendMail() {
    this.dialogRef.close();
    console.log(typeof this.myForm.controls.UserMail.value)
    this.userService.sendemail(this.myForm.controls.UserMail.value).subscribe(res => {
      console.log("succsess")
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
