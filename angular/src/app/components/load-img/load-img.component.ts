import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { parse, basename } from 'path';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.scss']
})
export class LoadImgComponent implements OnInit {
  Falert:boolean=false;
  F2alert:boolean=false;
  myForm: FormGroup;
  fileToUpload: File = null;
  addpic: Advertisements = new Advertisements();
  constructor(private advertismentService: AdvertismentService) { }
  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   console.log(this.fileToUpload)
  // }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      Base64Pic: new FormControl('', [Validators.required]),
    })
  }
  //הטענת תמונה מהמחשב
  AddImg(): void {
    this.Falert=false;
    this.F2alert=false;
    this.addpic.AdUserId = Number(localStorage.getItem("currentUserId"));
    this.addpic.AdStatus = false;
    this.addpic.AdDateRequest = new Date();
    this.addpic.AdViews = 0;
    this.advertismentService.addadvertisment(this.addpic).subscribe(res => {
      console.log("success ")
      this.Falert=true;
      //alert("התמונה התוספה בהצלחה")
      this.myForm.controls.Base64Pic.setValue("");
    },
      (error) => {
        console.log("error");
        // alert("תמונה זו קיימת כבר במערכת")
        this.F2alert=true;
        this.myForm.controls.Base64Pic.setValue("");
      },
      

    );
  }
  //   getFiles(event) {
  //     var files = event.target.files;
  //     var reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     var x=reader.readAsBinaryString(files[0]);
  //     console.log(x);
  //    // xBYTES 64.
  // }
  getFiles(event) {
    debugger;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //this.myForm.controls.Base64Pic.setValue(reader.result);
      this.addpic.AdFiles = String(reader.result);
      debugger
      console.log(this.addpic.AdFiles);
    };
  }
 

}