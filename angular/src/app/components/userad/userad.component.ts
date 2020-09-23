import { Component, OnInit } from '@angular/core';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userad',
  templateUrl: './userad.component.html',
  styleUrls: ['./userad.component.scss']
})
export class UseradComponent implements OnInit {
  userAdArr: Advertisements[] = [];
  Categorylist: Category[] = [];
  constructor(private advertismentService: AdvertismentService, private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    //קבלת כל הקטגוריות
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
    },
      (error) => { console.log("error") }
    );
    //קבלת כל מודעות הלקוח שהתפרסמו
    this.advertismentService.getalladvertismentsforuser(Number(localStorage.getItem("currentUserId"))).subscribe(res => {
      res.forEach(element => {
        console.log(element);
        this.userAdArr.push(element);
      }
      );
      console.log("success")
    },
      (error) => {
        console.log("error");
      }
    )
  }
  //קבלת שם קטגוריה לפי הקוד
  GetNameCategoty(c: number): string {
    console.log(c);
    return this.Categorylist.find(x => x.CategoryId == c).CategoryName;
  }
  //העברת מודעה לקומפוננטה אחרת ע"י שליחה לסרביס
  edit(ad: Advertisements) {
    this.advertismentService.EditAd(ad);
    this.router.navigate(["customer/add-advertisment"]);
  }
}
