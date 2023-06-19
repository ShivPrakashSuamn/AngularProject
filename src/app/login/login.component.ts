import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ForgetDialogComponent} from '../forget-dialog/forget-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  forgetForm: FormGroup;
  submitted: any = false;
  submittedForget: any = false;
  head = 'Login';
  fontcolor = 'rgb(167 32 184)';
  // -------------------------------------------      life cycle of angular

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private alertService: AlertService, private loaderService: NgxUiLoaderService, private apiService: ApiService, private route: Router) {

    if (this.apiService.isLoggedIn()) {
      this.route.navigate(['/dashboard']);
    }
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.forgetForm = fb.group({
      oldEmail: ['', Validators.required]
    })
  }
  openDialog() {
    this.matDialog.open(ForgetDialogComponent, {
      width: '650px'
    })
  }
  ngOnInit(): void {

  }

  // -----------------------------------------------    custome methods   
  get f() {
    return this.loginForm.controls;
  }
  get fp() {
    return this.forgetForm.controls;
  }

  loginSubmit() {    //  Login Form  --------------
    this.loaderService.startLoader('A1', 'A1');
    console.log('submitform');
    this.submitted = true;
    if (this.loginForm.valid) {
      // console.log('form valid', this.loginForm.value) //after proper submit you will get value in this 
      let url = '/auth/login';
      let body = this.loginForm.value;

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      // Post data Node ----
      this.apiService.post(url, body, options).subscribe((data: any) => {
        if (data.status) {
          let user = data.data.user;
          this.alertService.success(data.message);
          localStorage.setItem('loginUser', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', "1");
          localStorage.setItem('token', data.data.token);  // Token store ---
          this.route.navigate(['/dashboard']);  // Location set -- 
        } else {
          this.alertService.warning(data.message);
        }
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  passwordForget() {
    this.submittedForget = true;
    console.log('clock', this.forgetForm.value);
    if (this.forgetForm.valid) {
      let url = '/auth/forgot';
      let body = this.forgetForm.value;
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data: any) => {
        if (data.status) {
          // localStorage.setItem('isLoggedIn', "1");
          // localStorage.setItem('token', data.data.token); 
          this.openDialog()
        } else {
          this.alertService.warning(data.message);
        }
      })
    } else {
      this.alertService.error('This in input Empty');
    }
  }

  light() {     //  Ligth  Mood -------------
    document.body.style.background = "white";
  }

  dark() {      //  Daek  Mood  --------------
    document.body.style.background = "#060c21";
  }

}