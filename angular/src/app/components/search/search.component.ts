import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { PaneladService } from 'src/app/services/panelad/panelad.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  name: string = "חיפוש לוח";
  checked: boolean = false;
  changeslidetoggle(): void {
    if (this.checked == false) {
      this.name = "חיפוש מודעה";
      
    }
    else {
      this.name = "חיפוש לוח";
    }
    this.checked = !this.checked;
  }
  constructor() { }

  ngOnInit(): void {
  }


}
