import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }
  cities:string[]=[];
  //עריכת מערך הערים
  SetCities(arrcities:string[]):void{
    this.cities=arrcities;
  }
  //קבלת הערים
  GetAllCities():string[]{
    return this.cities;
  }
}