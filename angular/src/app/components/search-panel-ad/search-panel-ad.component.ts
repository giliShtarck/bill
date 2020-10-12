import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaneladService } from 'src/app/services/panelad/panelad.service';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { element, EventEmitter } from 'protractor';
import { PanelAds } from 'src/app/models/panelad/panel-ads';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  a:Advertisements
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
  billboardsCities: string[] = [];
  Exists: boolean = true;
  
  tile: Tile;

  constructor(private paneladservice: PaneladService, private billboardService: BillBoardService, private renderer: Renderer2,
    private advertismentService: AdvertismentService, public dialog: MatDialog) {
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
    this.billboardService.getallbillboardcities().subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      }, (error) => { console.log(error) });
    })
  }
  //חיפוש לוחות
  search(): void {
    debugger
    this.divList = []
    this.panelad=[]
    this.paneladservice.getpaneladbyaddressanddate
      (this.checkedStreets, this.myForm.controls.city.value, this.myForm.controls.date.value).subscribe(res => {
        if (res != null) {
          this.Exists = true;
          res.forEach(element => {
            this.panelad.push(element);
          });
          this.advertismentService.SetFlag(true)
          this.drawBoard();
        }
        else {
          this.Exists = false;
        }
      })
  }
  //יוצר את לוח המודעות
  drawBoard() {
  
    for (var i = 0; i < this.panelad.length; i++) {
      var cols = this.panelad[i].PanelColumnEnd - this.panelad[i].PanelColumnStart + 1;
      var rows = this.panelad[i].PanelLineEnd - this.panelad[i].PanelLineStart + 1;
      for (var j = 0; j < this.advertismentsArr.length; j++) {
        if (this.advertismentsArr[j].AdId == this.panelad[i].AdId) {
          var text = this.advertismentsArr[j].AdFiles;
          var a =this.advertismentsArr[j];
        }
      }
      if (this.panelad[i].AdId == -1) {
        var text = "";
      }
      var color = "";
      this.divList.push({ color: color, cols: cols, rows: rows, text: text,a:a });
    }
  }
  //שליפת הרחובות לעיר
  ChangeCity(): void {
    this.streetarr = [];
    this.billboardService.getallstreets(this.myForm.controls.city.value).subscribe(res => {
      res.forEach(element => {
        this.streetarr.push(element)
        console.log("streetarr: " + this.streetarr)
      },
        this.myForm.controls.street.setValue('')
      ),
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
  //pop-up
  //שנפתח עם המודעה מוגדלת
   //עדכון מספר הצפיות בעת לחיצה על מודעה
   updateviews(pic: Tile) {
    this.tile = pic;
    console.log(typeof pic)
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      height: '600px',
      data: { color: this.tile.color, cols: this.tile.cols, rows: this.tile.rows, text: this.tile.text,a:this.tile.a }
    });
    this.advertismentService.updateadviews(this.tile.a).subscribe(res => {
      console.log("success")
    }, (error) => { console.log(error) });
  }
   //הגבלה לשם-רק אותיות
   public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת" "0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת" "0-9]/g, "");
    }
  }
   //לא ניתן לשנות תאריך ידנית
  validateNumber(event) {
      event.preventDefault();     
  }
}
