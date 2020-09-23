import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { Billboard } from 'src/app/models/billboard/billboard';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-delete-billboard',
  templateUrl: './delete-billboard.component.html',
  styleUrls: ['./delete-billboard.component.scss']
})
export class DeleteBillboardComponent implements OnInit {
  streetarr: string[] = []
  myForm: FormGroup;
  billboardsCities:string[]=[]
  constructor(private billBoardService: BillBoardService, private categoryService: CategoryService,private billboardService:BillBoardService) { }
  boardS;
  boardC;
  //פונקציה המאפשרת כתיבת לינפוט בעיברית ואנגלית בלבד
  public inputValidator(event: any) {
    const pattern = /^[א-ת" "0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^א-ת" "0-9]/g, "");
    }
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      Boardstreet: new FormControl('', Validators.required),
      Boardcity: new FormControl('', Validators.required),
    });
    //שליפת ערים שיש בהם לוחות
    this.billboardService.getallbillboardcities().subscribe(res=>{
      console.log(res);
      res.forEach(element => {
        this.billboardsCities.push(element);
        console.log("success")
      },(error)=>{console.log(error)});      
    })
    // this.categoryService.GetAllCategories().subscribe(res => {
    //   this.Categorylist.push(res);
    //   console.log(this.Categorylist);
    // },
     //  (error) => { console.log("error") }
    // );
  }
  //שליפת רחובות לעיר
  ChangeCity(): void {
    this.streetarr = [];
    this.billboardService.getallstreets(this.myForm.controls.Boardcity.value).subscribe(res => {     
      res.forEach(element => {
        this.streetarr.push(element)
        console.log("streetarr: "+this.streetarr)
      }),
        (error) => { console.log("error") }
    });
  }
  // selectedCategory(category: Category) {
  //  //this.myForm.controls.Boardcity.valid=Validators.requiredTrue()
  //   this.myForm.value.Boardcity = category.CategoryId;
  //   this.boardC = this.myForm.value.Boardcity;
  //   console.log(`category ${category} controll ${this.myForm.value.Boardcity}`);
  // }
  //מחיקת לוח
  Delete() {
    this.boardC = this.myForm.controls.Boardcity.value;
    this.boardS = this.myForm.controls.Boardstreet.value;
    this.billBoardService.Delete(this.boardC, this.boardS).subscribe(res => {
       console.log("success!");
    },
      (error) => { console.log("error") }
    );
  }
}
