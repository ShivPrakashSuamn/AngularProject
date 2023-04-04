import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  toggleVal:boolean = false;
  search:any = '';
  data:any = [];

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService ) { 
      // it call first 
  } 

  ngOnInit(): void { 
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData(){
    let url:string = `/template?search=${this.search}`;
    this.apiService.get(url).subscribe((data:any)=>{
      console.log('data->', data.data.data)
      if(data && data.status){
        this.data = data.data.data;
      } else{
        this.alertService.error('Data Fetch Failed..')
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }

  searchVal(){
    console.log('this any search values = ', this.search);
  }
}
