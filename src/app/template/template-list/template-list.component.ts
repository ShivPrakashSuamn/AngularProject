import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
  toggleVal:boolean = false;
  search:any = '';
  limit:any = 10;
  page:any = 1;
  totalRows:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  data:any=[];

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService ) { 
      // it call first 
  } 

  ngOnInit(): void { 
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData(){
    let url:string = `/template?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data:any)=>{
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
