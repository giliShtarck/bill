import { Component, OnInit } from '@angular/core';
import { AdvertismentService } from 'src/app/services/advertisments/advertisment.service';
import { Advertisements } from 'src/app/models/advertisment/advertisements';

@Component({
  selector: 'app-userad',
  templateUrl: './userad.component.html',
  styleUrls: ['./userad.component.scss']
})
export class UseradComponent implements OnInit {
  userAdArr: Advertisements[] = [];
  constructor(private advertismentService: AdvertismentService) { }

  ngOnInit(): void {
    this.advertismentService.getalladvertismentsforuser(Number(localStorage.getItem("currentUserId"))).subscribe(res => {
      res.forEach(element => {
        this.userAdArr.push(element);
      }
      );
      console.log("success")
    },
      (error) => {
        console.log( "error");
      }
    )


  }

}
