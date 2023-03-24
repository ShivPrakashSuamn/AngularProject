import { Component } from '@angular/core';
import { UserDataService } from '../../_services/user-data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  search:any;
  value:any;
  toggleVal:boolean = false;
  users:any;
  constructor( private userData:UserDataService) { 
      // it call first 
     
  } 

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
  searchVal(){
    console.log('this is search',this.search);
    this.value = this.search;
  }
}
