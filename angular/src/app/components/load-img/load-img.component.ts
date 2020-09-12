import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { parse } from 'path';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.scss']
})
export class LoadImgComponent implements OnInit {
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
    this.addpic.AdUserId = Number(localStorage.getItem("currentUserId"));
    this.addpic.AdStatus = false;
    this.addpic.AdDateRequest = new Date();
    this.addpic.AdViews = 0;
    this.advertismentService.addadvertisment(this.addpic).subscribe(res => {
      console.log("success ")
    },
      (error) => { console.log("error") }
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
      console.log(this.addpic.AdFiles);
    };
  }
  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   var filestring = btoa(binaryString);  // C   onverting binary string data.
  // }
  // this.ad.AdFiles=this.myForm.controls.AdFiles.value;
  // console.log( this.ad.AdFiles)









}