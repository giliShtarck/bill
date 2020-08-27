import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

//////////primeng
 
//import {TableModule} from 'primeng/table';
//import { MatFileUploadModule } from '@angular/material/core';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { SearchBar } from "tns-core-modules/ui/search-bar";

@NgModule({
  declarations: [],
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatNativeDateModule ,
    MatToolbarModule,
    ///////////primeng
    // TableModule,
 

  ],
  providers:[MatDatepickerModule],
  exports:[
    MatFormFieldModule,MatInputModule,MatIconModule,MatSlideToggleModule,
    MatSelectModule,MatAutocompleteModule,MatButtonModule,MatDatepickerModule,MatButtonToggleModule,MatToolbarModule,
    // TableModule
  ]
})
export class MyMaterialModule { }
