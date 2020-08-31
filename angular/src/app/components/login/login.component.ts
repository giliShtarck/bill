import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/users/user.service';
import { Users } from 'src/app/models/user/users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: LoginComponent }
  ]
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  hide = true;
  user: Users = new Users();
  validateNumber(event) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת" "]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת" "]/g, "");
    }
  }
  constructor(private userService: UserService, private DomSanitizer: DomSanitizer, private router: Router) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      UserMail: new FormControl('', [Validators.required, Validators.email]),
      Userphone: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[0-9]{9}"))]),
      UserName: new FormControl('', Validators.required),
      Userpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  //התחברות
  Register() {
    this.user.IsManager = false;
    this.user=this.myForm.value;
    console.log(this.user);
    this.userService.Register(this.user).subscribe(res => {
      alert("success!");
      this.router.navigate(["customer"]);
    },
      (error) => { alert("error") }
    );
  }
}

