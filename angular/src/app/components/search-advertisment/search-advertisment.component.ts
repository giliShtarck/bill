import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';

@Component({
  selector: 'app-search-advertisment',
  templateUrl: './search-advertisment.component.html',
  styleUrls: ['./search-advertisment.component.scss']
})
export class SearchAdvertismentComponent implements OnInit {
  myForm: FormGroup;
  Categorylist: Category[] = [];
  advertismentArr: Advertisements[] = [];
  streetarr:string[]=[]
  billboardsCities:string[]=[]
  constructor(private categoryService: CategoryService, private advertismentService: AdvertismentService,private billboardService:BillBoardService) { }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      category: new FormControl('', Validators.required),
       AdCity: new FormControl('',Validators.required),
    });

    //שליפת ערים שיש בהם לוחות
    this.billboardService.getallbillboardcities().subscribe(res=>{
      console.log(res);
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      },(error)=>{console.log(error)});      
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
        console.log("streetarr: "+this.streetarr)
      }),
        (error) => { console.log("error") }
    });
  }
  //חיפוש
  search(): void {
    console.log(this.myForm.controls.AdCity.value, this.myForm.controls.category.value)
    this.advertismentService.getadvertismentbycategoryandcity(this.myForm.controls.AdCity.value, this.myForm.controls.category.value).subscribe(res => {
      res.forEach(element => {
        this.advertismentArr.push(element);
      });
      console.log(this.advertismentArr);
      console.log("success");
    }, (error) => { console.log("error") }
    );
  }
  //לאפשר את כפתור החיפוש עם בחרו את כל הנתונים
  checkValid(): boolean {
    if (this.myForm.controls.city.value != '' && this.myForm.valid)
      return false;
    return true;
  }
  //עדכון מספר הצפיות בעת לחיצה על מודעה
  updateviews(a:Advertisements){
    this.advertismentService.updateadviews(a.AdId).subscribe(res=>{
      console.log("success")
    },(error)=>{console.log(error)});
  }
}
