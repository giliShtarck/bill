import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category/category';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';

@Component({
  selector: 'app-search-advertisment',
  templateUrl: './search-advertisment.component.html',
  styleUrls: ['./search-advertisment.component.scss']
})
export class SearchAdvertismentComponent implements OnInit {
  myForm: FormGroup;
  Categorylist: Category[] = [];
  advertismentArr: Advertisements[] = [];
  constructor(private categoryService: CategoryService, private advertismentService: AdvertismentService) { }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      category: new FormControl('', Validators.required),
       city: new FormControl('',Validators.required),
    });
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
    },
      (error) => { alert("error") }
    );
  }
  selectedCategory(c: Category) {
    this.myForm.value.category = c.CategoryId;
  }
  ChangeCity(city): void {
  this.myForm.controls.city.setValue(city);
  }
  search(): void {
    console.log(this.myForm.controls.city.value, this.myForm.controls.category.value)
    this.advertismentService.getadvertismentbycategoryandcity(this.myForm.controls.city.value, this.myForm.controls.category.value).subscribe(res => {
      res.forEach(element => {
        this.advertismentArr.push(element);

      });
      console.log(this.advertismentArr);
      console.log("success");
    }, (error) => { console.log("error") }
    );
  }
  checkValid(): boolean {
    if (this.myForm.controls.city.value != '' && this.myForm.valid)
      return false;
    return true;
  }
}
