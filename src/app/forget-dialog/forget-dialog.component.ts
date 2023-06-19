import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forget-dialog',
  templateUrl: './forget-dialog.component.html',
  styleUrls: ['./forget-dialog.component.css']
})
export class ForgetDialogComponent {
  forgetForm: FormGroup;
  submitted: any = false;
  passwordMech: any = false;

  // -------------------------------------------      life cycle of angular

  constructor(private fb: FormBuilder, private alertService: AlertService, private loaderService: NgxUiLoaderService, private apiService: ApiService, private route: Router) {

    if (this.apiService.isLoggedIn()) {
      this.route.navigate(['/dashboard']);
    }

    this.forgetForm = fb.group({
      generateP: ['', Validators.required],
      confirmP: ['', Validators.required]
    })
  }

  get fp() {
    return this.forgetForm.controls;
  }

  passwordForget() {
    this.submitted = true;
    let value = this.forgetForm.value;
    if (value.generateP == value.confirmP) {
      this.passwordMech = false;
      let url = '/auth/forgot';
      let body = this.forgetForm.value;
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data: any) => {
        if (data.status) {
          console.log('click', data)
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
