import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private router:Router,public dialogRef: MatDialogRef<PaymentComponent>) { }

  ngOnInit(): void {

  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת" "]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת" "]/g, "");
    }
  }
  validateNumber(event) {
    // const keyCode = event.keyCode;
    // const excludedKeys = [8, 37, 39, 46];
    // if (!((keyCode >= 48 && keyCode <= 57) ||
    //   (keyCode >= 96 && keyCode <= 105) ||
    //   (excludedKeys.includes(keyCode)))) {
    //   event.preventDefault();
    // }
    const pattern = /^[0-9/]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[0-9/]/g, "");
    }
  }
  back():void{
   // this.router.navigate(["customer/add-advertisment"])
   this.dialogRef.close();
   alert("מודעתך התוספה בהצלחה")
  }

}
