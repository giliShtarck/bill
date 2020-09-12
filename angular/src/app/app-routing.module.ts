import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpComponent } from './components/sing-up/sing-up.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { AddAdvertismentComponent } from './components/add-advertisment/add-advertisment.component';
import { AddBillboardComponent } from './components/add-billboard/add-billboard.component';
import { DeleteBillboardComponent } from './components/delete-billboard/delete-billboard.component';
import { ManagerComponent } from './components/manager/manager.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsofadvertismentComponent } from './components/detailsofadvertisment/detailsofadvertisment.component';
import { DetailsofBillsComponent } from './components/detailsof-bills/detailsof-bills.component';
import { LoadImgComponent } from './components/load-img/load-img.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { SearchAdvertismentComponent } from './components/search-advertisment/search-advertisment.component';
import { SearchPanelAdComponent } from './components/search-panel-ad/search-panel-ad.component';
 import { CitiesComponent } from './components/cities/cities.component';
import { UseradComponent } from './components/userad/userad.component';
import { MasonryComponent } from './components/masonry/masonry.component';

const routes: Routes = [
  {
    path: 'customer', component: CustomerComponent,
    children: [{ path: "loadimg", component: LoadImgComponent },
    {path:"userad",component:UseradComponent},
    {path:"add-advertisment",component:AddAdvertismentComponent}
    ]
  },
  {
    path: 'manager', component: ManagerComponent,
    children: [
      { path: 'addBillboard', component: AddBillboardComponent },
      { path: 'deleteBillBoard', component: DeleteBillboardComponent },
      { path: 'DetailsOfBills', component: DetailsofBillsComponent },
      { path: 'DetailsOfadvertisment', component: DetailsofadvertismentComponent },
    ]
  },
  {
    path: 'homepage', component: HomepageComponent,
    children: [
      {
        path: 'sign-up', component: SingUpComponent, children: [{
          path: 'newpassword', component: NewPasswordComponent
        }]
      },
      { path: 'login', component: LoginComponent },
      {
        path: 'search', component: SearchComponent, children: [
          { path: 'searchPanelAd', component: SearchPanelAdComponent},
          ]
      }
    ] },
  { path: "", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
