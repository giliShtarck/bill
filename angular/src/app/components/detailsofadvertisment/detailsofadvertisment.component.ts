import { Component, OnInit } from '@angular/core';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detailsofadvertisment',
  templateUrl: './detailsofadvertisment.component.html',
  styleUrls: ['./detailsofadvertisment.component.scss']
})
export class DetailsofadvertismentComponent implements OnInit {
  Arradvertisment: Advertisements[] = [];
  Categorylist: Category[] = [];
  c: Category;
  str:string;
  constructor(private advertismentService: AdvertismentService, private categoryService: CategoryService,private router: Router) { }
  ngOnInit(): void {
    this.advertismentService.getallfalseadvertisments().subscribe(res => {
      res.forEach(element => {
        //  this.Arradvertisment.push({AdId:element.AdId,AdCategory:element.AdCategory,AdDateBegin:element.AdDateBegin,AdDateEnd:element.AdDateEnd,
        // AdDateRequest:element.AdDateRequest,AdFiles:element.AdFiles,AdHeight:element.AdHeight,
        // AdStatus:element.AdStatus,AdViews:element.AdViews,AdWidth:element.AdWidth,AdUserId:element.AdUserId});
        this.Arradvertisment.push(element);
      })
    },
      (error) => { alert("error") }
    );
    //קבלת כל הקטגוריות
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
    },
      (error) => { alert("error") }

    );
  }
  //קבלת שם הקטגוריה לפי מס' הקטגוריה
  GetNameCategoty(ca: number): string {
    this.c = ( this.Categorylist as Category[]).find(x => x.CategoryId == ca) ;
    console.log(this.c);
    // console.log((this.c as Category) + " " + (this.c as Category).CategoryId + " " + (this.c as Category).CategoryName)
    console.log(this.c.CategoryName);
    this.str=this.c.CategoryName;
    return this.str;
    // return this.c;
  }
  //אישור מודעה  שינוי סטטוס
  Approval(c: Advertisements): void {
    // console.log(c);

    // this.advertismentService.Approval(c).subscribe(res => { console.log("sucses!") }, err => { console.log("err :(") });
  }
  //ביטול המודעה -אינה מאושרת
  Cancel(c: Advertisements): void {
    // console.log(c);

    
  }

}


