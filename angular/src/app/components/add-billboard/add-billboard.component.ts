import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Billboard } from 'src/app/models/billboard/billboard';
import { BillBoardService } from 'src/app/services/billboard/bill-board.service';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-billboard',
  templateUrl: './add-billboard.component.html',
  styleUrls: ['./add-billboard.component.scss']
})
export class AddBillboardComponent implements OnInit {
  streetarr: string[] = []
  b: Billboard = new Billboard();
  myForm: FormGroup;
  

  public inputValidator(event: any) {

    const pattern = /^[0-9א-ת" "]*$/;

    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9א-ת" "]/g, "");

    }
  }
  constructor(private billboardservice: BillBoardService ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      BoardCity: new FormControl('', Validators.required),
      BoardStreet: new FormControl('', Validators.required),
      PrecentPrice: new FormControl('', Validators.required)
    });
  }
  ChangeCity(city): void {
    console.log(city)
    this.b.BoardCity=city;
    this.streetarr = [];
    this.billboardservice.getallstreets(this.b.BoardCity).subscribe(res => {
      
      res.forEach(element => {
        this.streetarr.push(element)
      }),
        (error) => { console.log("error") }
    });
  }
  AddBillBoard() {

    // this.b = this.myForm.value;
    this.b.BoardId=0;
    this.b.BoardStreet=this.myForm.controls.BoardStreet.value;
    this.b.PrecentPrice=this.myForm.controls.PrecentPrice.value;
    console.log(this.b);
    this.billboardservice.AddBillBoard(this.b).subscribe(res => {
      alert("success!");
    },
      (error) => { alert("error") }
    );
  }
}
