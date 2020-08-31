import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
     this.backtohome();
  }
  //חזרה לדף הבית
  backtohome():void{
    this.router.navigate(["homepage/search"])
  }
}
