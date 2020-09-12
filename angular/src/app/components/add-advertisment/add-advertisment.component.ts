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
@Component({
  selector: 'app-add-advertisment',
  templateUrl: './add-advertisment.component.html',
  styleUrls: ['./add-advertisment.component.scss']
})
export class AddAdvertismentComponent implements OnInit {
  ArrBillboard: Billboard[] = [];
  streetarr: string[] = []
  myForm: FormGroup;
  City: string;
  ad: Advertisements = new Advertisements();
  advertisment:Advertisements;
  Categorylist: Category[] = [];
  billboardsCities:string[]=[];
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת]/g, "");
    }
  }
  constructor(private categoryService: CategoryService, private advertismentservice: AdvertismentService, private billboardService: BillBoardService) {
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
    //שליפת ערים שיש בהן לוחות
    this.billboardService.getallbillboardcities().subscribe(res=>{
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      },(error)=>{console.log(error)});      
    })
    //העברת מודעה מקומפוננטה
    this.ad = this.advertismentservice.GetEditAd();
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
        console.log("streetarr: "+this.streetarr)
      }),
        (error) => { console.log("error") }
    });
  }
  //המרת שם הקטגוריה  למס' הקטגוריה
  selectedCategory(category: Category) {
    // this.myForm.value.AdCategory = category.CategoryId;
    // this.ad.AdCategory = this.myForm.controls.AdCategory.value;
    // console.log(`category ${category} controll ${this.myForm.value.AdCategory}`);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////????????????????
  sendForm() {
    this.ad.AdCategory = this.myForm.controls.AdCategory.value;
    this.ad.AdDateBegin = this.myForm.controls.AdDateBegin.value;
    this.ad.AdDateEnd = this.myForm.controls.AdDateEnd.value;
    this.ad.AdHeight = this.myForm.controls.AdHeight.value;
    this.ad.AdWidth = this.myForm.controls.AdWidth.value;
    //this.ad.AdUserId = Number(localStorage.getItem("currentUserId"));
    //this.ad.AdViews = 0;
    //this.ad.AdStatus = false;
    //this.ad=this.myForm.value;
    this.advertisment=this.ad;
    console.log(this.myForm.value);
    console.log("this.ad: "+this.advertisment)
    console.log("city: "+this.City+" street: "+this.myForm.controls.AdAddress.value)
    this.advertismentservice.Approval(this.ad,this.City,this.myForm.controls.AdAddress.value).subscribe(res => {
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
}
