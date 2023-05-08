import { Component } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.css']
})
export class NoPageComponent {
  toggleVal:boolean = false;
  search:any;
  constructor() { 
      // it call first 
  } 

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
  searchVal(){
    console.log('this any search values = ', this.search);
  }
}
