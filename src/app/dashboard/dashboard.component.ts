import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggleVal:boolean = false;

  constructor() { 
    // it call first 
  } 
    sidebarToggle(eventData: { toggleVal: boolean }){
      this.toggleVal = eventData.toggleVal;
      console.log('dashborad page inside sidebar Toggle', eventData.toggleVal);
    }
}
