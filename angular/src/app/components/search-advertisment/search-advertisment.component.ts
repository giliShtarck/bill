import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { Tile } from '../search-panel-ad/search-panel-ad.component';
import { PopupadComponent } from '../popupad/popupad.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-advertisment',
  templateUrl: './search-advertisment.component.html',
  styleUrls: ['./search-advertisment.component.scss']
})
export class SearchAdvertismentComponent implements OnInit {
  myForm: FormGroup;
  Categorylist: Category[] = [];
  advertismentArr: Advertisements[] = [];
  streetarr: string[] = []
  billboardsCities: string[] = []
  Exists: boolean = true;
  constructor(private categoryService: CategoryService, private advertismentService: AdvertismentService,
     private billboardService: BillBoardService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      category: new FormControl('', Validators.required),
      AdCity: new FormControl('', Validators.required),
    });

    //שליפת ערים שיש בהם לוחות
    this.billboardService.getallbillboardcities().subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      }, (error) => { console.log(error) });
    })
    //קבלת כל הקטגוריות
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
    },
      (error) => { alert("error") }
    );
  }
  //החלפת שם הקטגוריה במס' הקטגוריה
  selectedCategory(c: Category) {
    this.myForm.value.category = c.CategoryId;
  }
  //עדכון מערך הרחובות בכל שינוי של עיר
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
  //חיפוש
  search(): void {
    debugger
    this.advertismentArr = []
    this.advertismentService.getadvertismentbycategoryandcity(this.myForm.controls.AdCity.value, this.myForm.controls.category.value).subscribe(res => {
      debugger
      if (res.length == 0) {
        this.Exists = false;
      }
      else {
        res.forEach(element => {
          this.advertismentArr.push(element);
        });
        this.advertismentService.SetFlag(true);
        this.Exists = true;
        console.log("success");
      }
    }, (error) => { console.log("error") }
    );
  }
  //לאפשר את כפתור החיפוש עם בחרו את כל הנתונים
  checkValid(): boolean {
    //this.advertismentService.SetFlag(true)
    if (this.myForm.controls.city.value != '' && this.myForm.valid)
      return false;
    return true;
  }
  //עדכון מספר הצפיות בעת לחיצה על מודעה
  updateviews(a: Advertisements) {
    const dialogRef = this.dialog.open(PopupadComponent, {
      width: '750px',
      height:'750px',    
      data: {AdId:a.AdId,AdCategory:a.AdCategory,AdDateRequest:a.AdDateRequest,AdDateBegin:a.AdDateBegin,
        AdDateEnd:a.AdDateEnd,AdHeight:a.AdHeight,AdWidth:a.AdWidth,AdUserId:a.AdUserId,AdFiles:a.AdFiles,
        AdViews:a.AdViews,AdStatus:a.AdStatus}
    });
    this.advertismentService.updateadviews(a).subscribe(res => {
      console.log("success")
    }, (error) => { console.log(error) });
  }
}
