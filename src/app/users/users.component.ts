import { Component } from '@angular/core';
import { UserDataService } from '../_services/user-data.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  toggleVal:boolean = false;
  users:any;
  constructor( private userData:UserDataService) { 
      // it call first 
     
  } 

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
}
