import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { HttpClientModule } from '@angular/common/http';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { AddAdvertismentComponent } from './components/add-advertisment/add-advertisment.component';;
import { AddBillboardComponent } from './components/add-billboard/add-billboard.component';
import { DeleteBillboardComponent } from './components/delete-billboard/delete-billboard.component';
import { ManagerComponent } from './components/manager/manager.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsofBillsComponent } from './components/detailsof-bills/detailsof-bills.component';
import { DetailsofadvertismentComponent } from './components/detailsofadvertisment/detailsofadvertisment.component';
import { LoadImgComponent } from './components/load-img/load-img.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { SearchAdvertismentComponent } from './components/search-advertisment/search-advertisment.component';
import { SearchPanelAdComponent } from './components/search-panel-ad/search-panel-ad.component';
import { CitiesComponent } from './components/cities/cities.component';
import { UseradComponent } from './components/userad/userad.component';
import { MasonryComponent } from './components/masonry/masonry.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PendingPipeModule } from '@fivethree/async-pipes';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import { NgxPayPalModule } from 'ngx-paypal';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopupComponent } from './components/popup/popup.component';
import { PopupadComponent } from './components/popupad/popupad.component';
import { MyMaterialModule } from './components/my-material/my-material.module';
import { DatePipe } from '@angular/common';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AboutComponent } from './components/about/about.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PaymentComponent } from './components/payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    HomepageComponent,
    ResultSearchComponent,
    AddAdvertismentComponent,
    AddBillboardComponent,
    DeleteBillboardComponent,
    ManagerComponent,
    CustomerComponent,
    SearchComponent,
    DetailsofadvertismentComponent,
    DetailsofBillsComponent,
    LoadImgComponent,
    NewPasswordComponent,
    SearchAdvertismentComponent,
    SearchPanelAdComponent,
    CitiesComponent,
    UseradComponent,
    MasonryComponent,
    PaymentDetailsComponent,
    PopupComponent,
    PopupadComponent,
    InstructionsComponent,
    AboutComponent,
    PaymentComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    MyMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    PendingPipeModule,
    MatAutocompleteModule,
    MatCheckboxModule
    // NgxPayPalModule,
  ],
  providers: [ DatePipe,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }


