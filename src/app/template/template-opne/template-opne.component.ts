import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-opne',
  templateUrl: './template-opne.component.html',
  styleUrls: ['./template-opne.component.css']
})
export class TemplateOpneComponent {
  toggleVal:boolean = false;
  search:any = '';
  data:any=[];

  id:any;
  thumbnail:any;
  title:any;
  description:any;
  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService, private route:ActivatedRoute ) { 
      // it call first 
  } 

  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id']
    this.getData(this.id);
  }

  // ---------------------      custome methods      -----------------------  ||

  getData(id:any){
    let url:string = `/template/show?id=${id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data:any)=>{
      if(data && data.status){
        this.title = data.data.data[0].title;
        this.thumbnail = data.data.data[0].thumbnail;
        this.description = data.data.data[0].description;
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
