import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { map } from 'rxjs/operators';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { DatePipe } from '@angular/common';
import { Billboard } from 'src/app/models/billboard/billboard';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Prices } from 'src/app/models/prices/prices';
import { PricesService } from 'src/app/services/prices/prices.service';
@Component({
  selector: 'app-add-advertisment',
  templateUrl: './add-advertisment.component.html',
  styleUrls: ['./add-advertisment.component.scss']
})
export class AddAdvertismentComponent implements OnInit {
  ArrBillboard: Billboard[] = [];
  streetarr: string[] = []
  myForm: FormGroup;
  ad: Advertisements = new Advertisements();
  Categorylist: Category[] = [];
  billboardsCities: string[] = [];
  PriceArr: Prices[] = [];
  WidthArr: number[] = [1, 2, 3, 4];
  HeightArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
  flag: boolean;
  width: number
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת]/g, "");
    }
  }
  constructor(private priceService: PricesService, private categoryService: CategoryService, private advertismentservice: AdvertismentService, private billboardService: BillBoardService) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      AdDateBegin: new FormControl('', [Validators.required]),
      AdDateEnd: new FormControl('', [Validators.required]),
      AdHeight: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[1-8]"))]),
      AdWidth: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[1-8]"))]),
      AdCategory: new FormControl('', Validators.required),
      AdAddress: new FormControl('', Validators.required),
      AdCity: new FormControl('', Validators.required)
    });
    //שליפת כל המחירים
    this.priceService.getallprices().subscribe(res => {
      res.forEach(element => {
        this.PriceArr.push(element);
      });
      console.log(this.PriceArr)
    })
    //שליפת ערים שיש בהן לוחות
    this.billboardService.getallbillboardcities().subscribe(res => {
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      }, (error) => { console.log(error) });
    })
    //העברת מודעה מקומפוננטה
    this.ad = this.advertismentservice.GetEditAd();
    console.log(this.ad)
    //הכנסת נתוני הקטגוריות 
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
    },
      (error) => { console.log("error") }
    );
    //שליפת הלוחות
    this.billboardService.getbillboards().subscribe(res => {
      res.forEach(element => {
        this.ArrBillboard.push(element);
      });
    },
      (error) => { console.log("error") }
    );
  }
  //שליפת הרחובות לעיר בעת שינוי - בחירת עיר 
  ChangeCity(): void {
    this.streetarr = [];
    this.billboardService.getallstreets(this.myForm.controls.AdCity.value).subscribe(res => {
      res.forEach(element => {
        this.streetarr.push(element)
        console.log("streetarr: " + this.streetarr)
      }),
        (error) => { console.log("error") }
    });
  }
  sendForm() {
    this.ad.AdCategory = this.myForm.controls.AdCategory.value;
    this.ad.AdDateBegin = this.myForm.controls.AdDateBegin.value;
    this.ad.AdDateEnd = this.myForm.controls.AdDateEnd.value;
    this.ad.AdHeight = this.myForm.controls.AdHeight.value;
    this.ad.AdWidth = this.myForm.controls.AdWidth.value;
    console.log(this.myForm.value)
    this.advertismentservice.Approval(this.ad, this.myForm.controls.AdCity.value, this.myForm.controls.AdAddress.value).subscribe(res => {
      console.log("success!");
    },
      (error) => { console.log("error") }
    );
  }
  //בדיקת תקינות לתאריך התחלה
  checkDateBegin(): boolean {
    if (this.myForm.controls.AdDateBegin.value <= new Date()) {
      return true
    }
    return false;
  }
  //בדיקת תקינות לתאריך סיום
  checkDateEnd(): boolean {
    if (this.myForm.controls.AdDateEnd.value <= this.myForm.controls.AdDateBegin.value) {
      return true
    }
    return false;
  }
  //בדיקת ולידציה לכל הטופס
  checkFormValid() {
    if (this.myForm.invalid || this.checkDateBegin() || this.checkDateEnd())
      return true;
    return false;
  }
  selectedAdHeight(AdHeight: number) {
    debugger
    this.WidthArr = [];
    for (let i = 1; i < 5; i++) {
      this.flag = false;
      for (let j = 0; j < this.PriceArr.length; j++) {
        if (AdHeight * i == this.PriceArr[j].NumsUnit) {
          this.flag = true;
          this.width = this.PriceArr[j].NumsUnit
          break
        }
      }
      if (this.flag)
        this.WidthArr.push(i)
    }
  }
  selectedAdWidth(AdWidth: number) {
    this.HeightArr = []
    for (let i = 1; i < 9; i++) {
      this.flag = false;
      for (let j = 0; j < this.PriceArr.length; j++) {
        if (AdWidth * i == this.PriceArr[j].NumsUnit) {
          this.flag = true;
          break
        }
      }
      if (this.flag)
        this.HeightArr.push(i)
    }
  }
  Reset() {
    this.myForm.controls.AdWidth.setValue(" ");
    this.myForm.controls.AdHeight.setValue(" ");
    this.WidthArr = [1, 2, 3, 4];
    this.HeightArr = [1, 2, 3, 4, 5, 6, 7, 8];
  }
}
