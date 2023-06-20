import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent {
  resetForm: FormGroup;
  submitted: any = false;
  passwordMech: any = false;
  token: any;
  // -------------------------------------------   life cycle of angular   --------------------------  //

  constructor(private fb: FormBuilder, private alertService: AlertService, private loaderService: NgxUiLoaderService, private apiService: ApiService, private route: Router) {
    if (this.apiService.isLoggedIn()) {
      this.route.navigate(['/dashboard']);
    }

    this.resetForm = fb.group({
      generateP: ['', Validators.required],
      confirmP: ['', Validators.required]
    })
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.token = (this.route.url).slice(13);
  }
  get fp() {
    return this.resetForm.controls;
  }

  passwordReset() {
    this.submitted = true;
    let value = this.resetForm.value;
    console.log('lcik', value)
    if (value.generateP == value.confirmP) {
      this.passwordMech = false;
      let url = '/auth/reset';
      let body = {
        'generateP': this.resetForm.value.generateP,
        'confirmP': this.resetForm.value.confirmP,
        'token': this.token
      };
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data: any) => {
        console.log('click', data)
        if (data.status) {
          this.alertService.success(data.message);
        } else {
          this.alertService.warning(data.message);
        }
      });
    } else {
      this.passwordMech = true;
    }
  }
}
