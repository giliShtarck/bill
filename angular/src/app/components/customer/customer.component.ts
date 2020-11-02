import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate(["customer/instructions"])
  }
  //חזרה לדף הבית
  backtohome(): void {
    this.router.navigate(["homepage"])
  }
}
