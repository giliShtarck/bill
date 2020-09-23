import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { PaneladService } from 'src/app/services/panelad/panelad.service';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  name: string = "חיפוש לוח";
  checked: boolean = false;
  // @Output() outputName = new EventEmitter();
  //בחירת אפשרות של חיפוש לוח או חיפוש מודעה
  changeslidetoggle(): void {
    if (this.checked == false) {
      this.name = "חיפוש מודעה";   
    }
    else {
      this.name = "חיפוש לוח";
    }
    this.checked = !this.checked;
    this.advertismentService.SetFlag(false);
  }
  constructor(private advertismentService:AdvertismentService) { }
  ngOnInit(): void {
  }
  CheckSearch():boolean{
    return this.advertismentService.GetFlag();
  }
}
