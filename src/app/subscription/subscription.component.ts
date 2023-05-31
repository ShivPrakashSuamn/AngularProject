import { Component, HostListener } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  toggleVal: boolean = false;
  message: String = 'Payment Not';
  data: any;
  features: any;
  loginData: any;
  id: any;
  planActive:any = [];
  priceMethod: boolean = true;
  // ------------------    life cycle of angular    ----------------------- ||

  constructor(private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getLoginUser();
    this.getData();
  }

  // -----------------     custome methods       ------------------------- ||

  getLoginUser() {     //  login dataGet  -----------------------------
    this.loginData = localStorage.getItem('loginUser');
    var data = JSON.parse(this.loginData);
    this.id = data.id;
    console.log('loginUser id-', this.id)
  }

  getData() {         //  Get      Data       ---------------------------
    let url = '/plans';
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      this.data = data.data.data;
      this.features = data.data.features;
      let planData = data.data.planActive;
      for(var i = 0; i <= planData.length ; i++){
        if(i < planData.length){
          this.planActive.push(planData[i].plan_id);
        }
        }
    });
  }

  payNow(id: any) {   //  Payment Function     --------------------------
    let url = `/plans/subscription?id=${id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      this.data = data.data;
      this.data['handler'] = async (response: any) => {
        await this.handle_response(response.razorpay_payment_id, id);  //this returns the expected value 
      };
      var rzp1 = new Razorpay(this.data);
      rzp1.open();
      rzp1.on('payment.failed', function (respons: any) {
        console.log('err', respons.error);
      });
    });
  };

  handle_response(id: any, plan_id: any) { // Payment save -----------------
    let peyData = { payment_id: id, plan_id: `${plan_id}` };
    let url = '/payment/confirmPayment';
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    let options = { headers: headers };
    this.apiService.post(url, peyData, options).subscribe(async (data: any) => {
      if (data.status) {
        Swal.fire(data.message, 'Paid To', 'success'); // Alert---
      } else {
        Swal.fire('Peyment Failed', ' No Paid', 'error'); // Alert---
      }
      await this.getData();  ///  --------------------------------------------------------------------------
    });
  }

  billToggle(eventData: any) {
    this.priceMethod = eventData.target.checked;
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle---');
    this.message = "Success Payment"
  }

  getPrice(price: any) {
    if (this.priceMethod)
      return price;
    else
      return (price / 12).toFixed(2);
  }
}
