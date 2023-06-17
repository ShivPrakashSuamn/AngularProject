import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggleVal: boolean = false;
  totalContact: Number = 0;
  totalList: Number = 0;
  totalCompaign: Number = 0;
  totalSendMail: Number = 0;
  totalErrorMail: Number = 0;
  
  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService: ApiService, private alertService:AlertService) { }

  ngOnInit() {
    this.getdata();
  }

  // ---------------------      custome methods      -----------------------  ||

  getdata() {
    let url: string = '/dashboard';
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      if (data.status) {
        this.totalContact = data.data.totalContact;
        this.totalList = data.data.totalList;
        this.totalCompaign = data.data.totalCompaign;
        this.totalSendMail = data.data.totalSendMail;
        this.totalErrorMail = data.data.totalErrorMail;
      } else {
        this.alertService.warning(data.message);
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) {
    this.toggleVal = eventData.toggleVal;
    console.log('dashborad page inside sidebar Toggle', eventData.toggleVal);
  }
}
