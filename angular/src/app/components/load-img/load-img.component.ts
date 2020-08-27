import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.scss']
})
export class LoadImgComponent implements OnInit {
  myForm: FormGroup;
  fileToUpload: File = null;

  constructor() { }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
}
  ngOnInit(): void {
    this.myForm=new FormGroup({
      AdFiles: new FormControl('', [Validators.required]),
    })
  }
  AddImg():void{

  }
  // this.ad.AdFiles=this.myForm.controls.AdFiles.value;
  // console.log( this.ad.AdFiles)
}
