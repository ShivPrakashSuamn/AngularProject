import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


    loginForm: FormGroup;
    submitted: any = false;

    head = 'Login';
    fontcolor = 'rgb(167 32 184)';

  // -------------------------------------------      life cycle of angular

    constructor(private fb: FormBuilder, private alertService: AlertService, private ngxUiLoaderService: NgxUiLoaderService) { 
      // it call first
      this.loginForm = fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

    ngOnInit(): void {

    }

  // -----------------------------------------------    custome methods   

    light() {
      document.body.style.background = "white";
    }
    dark() {
      document.body.style.background = "#060c21";
    }
    get f() {
      return this.loginForm.controls;
    }

    loginSubmit() {
      this.ngxUiLoaderService.startLoader('A1', 'A1');
      this.alertService.error('this is error msg');
      console.log('submitform ');
      this.submitted = true;
      if (this.loginForm.valid) {
        console.log('form valid', this.loginForm.value) //after proper submit you will get value in this 
      }
    }
}
