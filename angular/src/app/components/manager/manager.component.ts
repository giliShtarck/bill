import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(["manager/DetailsOfadvertisment"])
  }
  //חזרה לדף הבית
  backtohome(): void {
    this.router.navigate(["homepage"])
  }
}
