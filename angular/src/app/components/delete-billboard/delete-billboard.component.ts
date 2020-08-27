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
  // Categorylist: Category[] = [];
  Categorylist: object[]= [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3}
  ];
  myForm: FormGroup;
  constructor(private billBoardService: BillBoardService, private categoryService: CategoryService) { }
  boardS;
  boardC;
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
    // this.categoryService.GetAllCategories().subscribe(res => {
    //   this.Categorylist.push(res);
    //   console.log(this.Categorylist);
    // },
    //   (error) => { alert("error") }
    // );
  }
  // selectedCategory(category: Category) {
  //  //this.myForm.controls.Boardcity.valid=Validators.requiredTrue()
  //   this.myForm.value.Boardcity = category.CategoryId;
  //   this.boardC = this.myForm.value.Boardcity;
  //   console.log(`category ${category} controll ${this.myForm.value.Boardcity}`);
  // }
  Delete() {
    this.boardC = this.myForm.controls.Boardcity.value;
    this.boardS = this.myForm.controls.Boardstreet.value;
    console.log(this.boardC,this.boardS);
    this.billBoardService.Delete(this.boardC, this.boardS).subscribe(res => {
      alert("success!");
    },
      (error) => { alert("error") }
    );

  }
}
