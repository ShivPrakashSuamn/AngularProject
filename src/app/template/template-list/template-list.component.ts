import { Component } from '@angular/core';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
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
