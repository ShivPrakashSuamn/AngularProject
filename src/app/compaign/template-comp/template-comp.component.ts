import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-comp',
  templateUrl: './template-comp.component.html',
  styleUrls: ['./template-comp.component.css']
})
export class TemplateCompComponent {
  toggleVal: boolean = false;
  search: any = '';
  limit: any = 10;
  page: any = 1;
  totalRows: any = 0;
  order_by: any = 'id';
  order_type: any = 'asc';
  data: any = [];
  id: any = '';

  title: any;
  thumbnail: any;
  created: any;
  selectID: any;
  ToggleSelect: boolean = false;

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService: ApiService, private alertService: AlertService, private route: ActivatedRoute) {
    // it call first 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getData();
      this.titleGet();
    }
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {
    let url: string = `/template?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      if (data && data.status) {
        this.data = data.data.data;
      } else {
        this.alertService.error('Data Fetch Failed..')
      }
    });
  }

  titleGet() {
    let url: string = `/compaign/show?id=${this.id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      this.title = data.data.data[0].title;
    })
  }

  selectTemplate(id: any) {    // Submit Form    -----------------------------------
    console.log('Select Button Click', id);
    if (id) {
      this.selectID = id;
      this.ToggleSelect = id;
    } else {
      this.ToggleSelect = false;
    }
  }

  submit() {
    if (this.selectID) {
      let url: string = '/compaign/update?id='+this.id;
      let body = {
        insrtId: this.id,
        template_id: this.selectID
      }
      console.log('submit Button Click', body);
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data: any) => {
        if (data.status) {
          this.alertService.success('data.message'); // Alert---
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      });
    } else {
      this.alertService.error('Please Select Template ?')
    }
  }

  selectDemo(id: any) {    //  Demo  get data  -----------------------------------
    console.log('Demo Button Click', id);
    let url = '/template/show?id=' + id;
    this.apiService.get(url, {}).subscribe((data: any) => {
      if (data && data.status) {
        this.title = data.data.data[0].title;
        this.thumbnail = data.data.data[0].thumbnail;
        this.created = data.data.data[0].created;
      } else {
        this.alertService.error(data.message);
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }
}
