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
@Component({
  selector: 'app-add-advertisment',
  templateUrl: './add-advertisment.component.html',
  styleUrls: ['./add-advertisment.component.scss']
})
export class AddAdvertismentComponent implements OnInit {
ArrBillboard:Billboard[]=[];
streetarr: string[] = []
  myForm: FormGroup;
  City:string;
  ad: Advertisements = new Advertisements();
  Categorylist: Category[] = [];
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Zא-ת]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Zא-ת]/g, "");
    }
  }
  constructor(private categoryService: CategoryService, private advertismentservice: AdvertismentService,private billboardService :BillBoardService) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      AdDateBegin: new FormControl('', [Validators.required]),
      AdDateEnd: new FormControl('', [Validators.required]),
      AdHeight: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[1-8]"))]),
      AdWidth: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[1-8]"))]),
      AdCategory: new FormControl('', Validators.required),
      AdAddress:new FormControl('', Validators.required)
    });
    this.categoryService.GetAllCategories().subscribe(res => {
      res.forEach(element => {
        this.Categorylist.push({ CategoryId: element.CategoryId, CategoryName: element.CategoryName });
      });
      console.log(this.Categorylist)
    },
      (error) => { alert("error") }
    );
    this.billboardService.getbillboards().subscribe(res => {
      res.forEach(element => {
        this.ArrBillboard.push(element);
      });
    },
      (error) => { alert("error") }
    );
  }
  ChangeCity(city): void {
    console.log(city)
    this.streetarr = [];
    this.billboardService.getallstreets(city).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.streetarr.push(element)
      }),
        (error) => { console.log("error") }
    });
  }
  selectedCategory(category: Category) {
    this.myForm.value.AdCategory = category.CategoryId;
    this.ad.AdCategory = this.myForm.value.AdCategory;
    // console.log(`category ${category} controll ${this.myForm.value.AdCategory}`);
  }
  sendForm() {
    this.ad.AdCategory = this.myForm.controls.AdCategory.value;
    this.ad.AdDateBegin= this.myForm.controls.AdDateBegin.value;
    this.ad.AdDateEnd = this.myForm.controls.AdDateEnd.value;
    this.ad.AdHeight = this.myForm.controls.AdHeight.value;
    this.ad.AdWidth = this.myForm.controls.AdWidth.value;
    this.ad.AdDateRequest = new Date();
    this.ad.AdUserId = Number(localStorage.getItem("currentUserId"));
    this.ad.AdViews = 0;
    this.ad.AdStatus=false;
    // console.log(this.ad);
    // this.advertismentservice.addadvertisment(this.ad).subscribe(res => {
    //   alert("success!");
    // },
    //   (error) => { alert("error") }
    // );

  }
}
