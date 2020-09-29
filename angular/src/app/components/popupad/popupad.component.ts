import { Component, OnInit, Inject } from '@angular/core';
import { Advertisements } from 'src/app/models/advertisment/advertisements';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popupad',
  templateUrl: './popupad.component.html',
  styleUrls: ['./popupad.component.scss']
})
export class PopupadComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Advertisements) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
