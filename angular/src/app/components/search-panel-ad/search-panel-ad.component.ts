import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaneladService } from 'src/app/services/panelad/panelad.service';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { element, EventEmitter } from 'protractor';
import { PanelAds } from 'src/app/models/panelad/panel-ads';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-search-panel-ad',
  templateUrl: './search-panel-ad.component.html',
  styleUrls: ['./search-panel-ad.component.scss']
})
export class SearchPanelAdComponent implements OnInit {
  advertismentsArr: Advertisements[] = [];
  myForm: FormGroup;
  checkedStreets: string[] = [];
  streetarr: string[] = []
  panelad: PanelAds[] = [];
  divList: Tile[] = [];
  billboardsCities:string[]=[];
  Exists:boolean=true;
  constructor(private paneladservice: PaneladService, private billboardService: BillBoardService, private renderer: Renderer2,
    private advertismentService: AdvertismentService) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required)
    });
    //שליפת כל המודעות
    this.advertismentService.getalladvertisments().subscribe(res => {
      res.forEach(element => {
        this.advertismentsArr.push(element);
      });
    })
    //שליפת ערים שיש בהם לוחות
    this.billboardService.getallbillboardcities().subscribe(res=>{
      console.log(res);
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      },(error)=>{console.log(error)});      
    })
  }
  //חיפוש לוחות
  search(): void {
    this.paneladservice.getpaneladbyaddressanddate
      (this.checkedStreets, this.myForm.controls.city.value, this.myForm.controls.date.value).subscribe(res => {
        if (res != null) {
          this.Exists=true;
          res.forEach(element => {
            this.panelad.push(element);
          });
          console.log(this.panelad);
          this.drawBoard();
        }
        else{
          this.Exists=false;
        }
      })
  }
  drawBoard() {
    for (var i = 0; i < this.panelad.length; i++) {
      var cols = this.panelad[i].PanelColumnEnd - this.panelad[i].PanelColumnStart + 1;
      var rows = this.panelad[i].PanelLineEnd - this.panelad[i].PanelLineStart + 1;
      for (var j = 0; j < this.advertismentsArr.length; j++) {
        if (this.advertismentsArr[j].AdId == this.panelad[i].AdId) {
          var text = this.advertismentsArr[j].AdFiles;
        }
      }
      if (this.panelad[i].AdId == -1) {
        var text = "";
      }
      var color = "";
      this.divList.push({ color: color, cols: cols, rows: rows, text: text });
    }
  }
//שליפת הרחובות לעיר
  ChangeCity(): void {
    this.streetarr = [];
    this.billboardService.getallstreets(this.myForm.controls.city.value).subscribe(res => {     
      res.forEach(element => {
        this.streetarr.push(element)
        console.log("streetarr: "+this.streetarr)
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
  //בדיקת תקינות לתאריך
  checkDate(): boolean {
    if (this.myForm.controls.date.value > new Date()) {
      return true;
    }
    return false;
  }
  //בדיקת ולידציה לטופס
  checkFormValid(): boolean {
    if (this.myForm.invalid || this.checkDate())
      return true;
    return false
  }

}
