import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }
  cities:string[]=[];
  SetCities(arrcities:string[]):void{
    this.cities=arrcities;
  }
  GetAllCities():string[]{
    return this.cities;
  }
}