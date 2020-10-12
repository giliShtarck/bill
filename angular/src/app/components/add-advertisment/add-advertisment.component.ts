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
import { HebrewCalendar } from '@hebcal/core';

@Component({
  selector: 'app-add-advertisment',
  templateUrl: './add-advertisment.component.html',
  styleUrls: ['./add-advertisment.component.scss']
})
export class AddAdvertismentComponent implements OnInit {
  DateBegin: Date;
  DateEnd: Date;
  CheckDate: Date;
  cnt: number = 0;
  secondDateList: Date[] = []
  ArrBillboard: Billboard[] = [];
  streetarr: string[] = []
  myForm: FormGroup;
  ad: Advertisements = new Advertisements();
  Categorylist: Category[] = [];
  billboardsCities: string[] = [];
  PriceArr: Prices[] = [];
  WidthArr: number[] = [1, 2, 3, 4];
  HeightArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
  DateList: Date[] = [];
  flag: boolean;
  width: number;
  numWeek: number;
  LastPaymant: number;

  dateFilter = (date: Date) =>
    date.getDay() == 0 && HebrewCalendar.getHolidaysOnDate(date) == undefined;
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת]/g, "");
    }
  }
  constructor(private priceService: PricesService, private categoryService: CategoryService,
    private advertismentservice: AdvertismentService, private billboardService: BillBoardService) {
  }
  ngOnInit(): void {
    console.log("datelist", this.DateList)
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
    this.ad.AdDateBegin = new Date(this.ad.AdDateBegin.getTime() + Math.abs(this.ad.AdDateBegin.getTimezoneOffset() * 60000));
    this.ad.AdDateEnd = this.myForm.controls.AdDateEnd.value;
    this.ad.AdDateEnd = new Date(this.ad.AdDateEnd.getTime() + Math.abs(this.ad.AdDateEnd.getTimezoneOffset() * 60000));
    this.ad.AdHeight = this.myForm.controls.AdHeight.value;
    this.ad.AdWidth = this.myForm.controls.AdWidth.value;
    console.log(this.myForm.value)
    this.advertismentservice.Approval(this.ad, this.myForm.controls.AdCity.value, this.myForm.controls.AdAddress.value, true).subscribe(res => {
      console.log("success!");
      this.DateList = [];
      this.secondDateList = [];
      res.forEach(element => {
        this.DateList.push(element);
        this.secondDateList.push(element);
      });
      console.log(this.DateList);

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
  //מספר יחידות רוחב אפשריות לאחר שבחר אורך
  selectedAdHeight(AdHeight: number) {
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
  //מספר היחידות האפשריות של אורך לאחר שבחר רוחב
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
  //איפוס אורך ורוחב מודעה
  Reset() {
    this.myForm.controls.AdWidth.setValue(" ");
    this.myForm.controls.AdHeight.setValue(" ");
    this.WidthArr = [1, 2, 3, 4];
    this.HeightArr = [1, 2, 3, 4, 5, 6, 7, 8];
  }
  cnt2: number = 0;
  //בדיקת התאריכים שהלקוח בחר, האם הם ברצף
  dates(date: Date) {

    // this.cnt = 0;
    // if (this.DateBegin == null) {
    //   this.DateBegin = date
    // }
    // else {
    //   this.DateList.forEach(element => {
    //     if (this.flag == true) {
    //       this.cnt++;
    //     }
    //     if (element == this.DateBegin) {
    //       this.flag = false
    //     }
    //   });    
    //   this.DateList.forEach(element => {
    //     this.cnt2++;
    //   });
    // }
    debugger
    this.secondDateList = [];
    if (this.DateBegin == null) {
      this.DateBegin = this.CheckDate = date;
      this.DateList.forEach(element => {
        this.CheckDate.setDate(this.CheckDate.getDay() + 7)
        if (this.CheckDate == element) {
          debugger
          this.secondDateList.push(this.CheckDate)
        }
      });
    }
    else {
      if (this.DateEnd == null) {
        this.DateEnd = date;
      }
    }
  }
  //חישוב תשלום
  paymant() {

    // this.numWeek=
    this.priceService.calcPrice(this.ad.AdHeight * this.ad.AdWidth, this.myForm.controls.AdCity.value,
      this.myForm.controls.AdAddress.value, 3).subscribe(res => {
        this.LastPaymant = res;
      });
  }
  //אישור מודעה והוספתה ללוח המתאים ולבסיס נתונים
  ok() {
    this.advertismentservice.Approval(this.ad, this.myForm.controls.AdCity.value, this.myForm.controls.AdAddress.value,
      false).subscribe(res => {
        console.log("succsess");
        alert("מודעתך התוספה בהצלחה")
      }), (error) => {
        console.log("error");
      }
  }
  //לא ניתן לשנות תאריך ידנית
  validateNumber(event) {
    event.preventDefault();
  }
}
