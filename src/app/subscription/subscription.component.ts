import { Component, HostListener } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { HttpHeaders } from '@angular/common/http';
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
  // ------------------    life cycle of angular    ----------------------- ||

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  // -----------------     custome methods       ------------------------- ||

  getData() {         //  Get      Data        ---------------------------
    let url = '/plans';
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      this.data = data.data.data;
      this.features = data.data.features;
    });
  }

  // options = {         //  Payment  Options     --------------------------
  //   "key": "rzp_test_eEhqxxfnggSTsN",
  //   "amount": "799",
  //   "currency": "INR",
  //   "name": "Besic Plan", //your business name
  //   "description": "plan description",
  //   //"image": "https://example.com/your_logo",
  //   //"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
  //   "prefill": {
  //     "name": " ", //your customer's name
  //     "email": " ",
  //     "contact": " "
  //   },
  //   "notes": {
  //     "address": "Razorpay Corporate Office"
  //   },
  //   "theme": {
  //     "color": "#b51fff"
  //   }
  // }

  payNow(id: any) {   //  Payment Function     --------------------------
    let url = `/plans/subscription?id=${id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
       console.log('plan data', data);

      // this.message = 'Payment Failed';
      // // this.options.name = `${this.data.title}`;
      // // this.options.amount = `${this.data.price}00`;
      // // this.options.prefill.name = "Shiv saini";
      // // this.options.prefill.email = "shiv742@gmail.com";
      // // this.options.prefill.contact = "9828192284";

      // var rzp1 = new Razorpay(this.data);
      // rzp1.open();
      // rzp1.on('payment.failed', function (respons: any) {
      //   // console.log('err', respons.error)
      // })
    });
  };

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle---');
    this.message = "Success Payment"
  }
}
