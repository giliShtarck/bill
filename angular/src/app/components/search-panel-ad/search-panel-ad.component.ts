import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaneladService } from 'src/app/services/panelad/panelad.service';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { element, EventEmitter } from 'protractor';
import { PanelAds } from 'src/app/models/panelad/panel-ads';

@Component({
  selector: 'app-search-panel-ad',
  templateUrl: './search-panel-ad.component.html',
  styleUrls: ['./search-panel-ad.component.scss']
})
export class SearchPanelAdComponent implements OnInit {

  myForm: FormGroup;
  checkedStreets: string[] = [];
  streetarr: string[] = []
  panelad: PanelAds[] = [];
  constructor(private paneadservice: PaneladService, private billboardService: BillBoardService) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    });
  
  }
  //חיפוש לוחות
  search(): void {
    this.paneadservice.getpaneladbyaddressanddate
      (this.checkedStreets, this.myForm.controls.city.value, this.myForm.controls.date.value).subscribe(res => {
        res.forEach(element => {
          this.panelad.push(element);
        });
      })
  }
  //העברת מידע מקופופונטה ערים (בן) לאב 
  ChangeCity(city): void {
    console.log(city)
    this.myForm.controls.city.setValue(city);
    this.streetarr = [];
    this.billboardService.getallstreets(this.myForm.controls.city.value).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.streetarr.push(element)

      }),
        (error) => { console.log("error") }
    });
  }
  //בחירה מרובה של  רחובות
  onChange(check: any, option: string): void {
    if (check == true) {
      this.checkedStreets.push(option);
      this.myForm.controls.street.valid;
    }
    else {
      this.checkedStreets = this.checkedStreets.filter(x => x != option);
      if (this.checkedStreets.length == 0) {
        this.myForm.controls.street.setValue('');
      }
      else {
        this.myForm.controls.street.setValue(this.checkedStreets[0]);
      }
    }
    console.log(this.checkedStreets);
  }


}
