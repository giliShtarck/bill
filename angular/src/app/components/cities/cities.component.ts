import { Component, EventEmitter, Output } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CityService } from 'src/app/services/cities/city.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  title = 'read-xml-angular8';
  public xmlItems: any;
  myForm: FormGroup;
  @Output() outputName = new EventEmitter();
  constructor(private _http: HttpClient, private citiesService: CityService) { this.loadXML(); }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      city: new FormControl('', Validators.required),
    });

  }
  loadXML() {
    this._http.get('/assets/schema.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });

  }
  parseXML(data) {
    return new Promise(resolve => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        var obj = result.Cities;
        for (k in obj.record) {
          var item = obj.record[k];
          arr.push({
            city: item.City[0],
            machoz: item.Machoz[0],
          });
        }

        resolve(arr);

      });
    });
  }
  changeCity() {
    console.log(this.myForm.controls.city.value)
    this.outputName.emit(this.myForm.controls.city.value);
    this.citiesService.SetCities(this.xmlItems);
  }
}

