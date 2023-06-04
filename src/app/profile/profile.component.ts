import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { AlertService } from '../_services/alert.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  loginData: any;
  fname: String = '';
  lname: String = '';
  email: String = '';
  mobile: String = '';
  id: String = '';
  profileImage: any;
  image: string = '';
  countdown: boolean = false;
  message: string = '';
  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {
    this.createForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  get f() {
    return this.createForm.controls;
  }

  ngOnInit() {
    this.getLoginUser();
  }
// =--------------------
  logout()  {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 10000);
    });
  }
  getHeroes(){
    localStorage.clear();
    window.location.reload();
  }

  // ----------------    custome methods   --------------------------  ||

  getLoginUser() {     //  login dataGet  -----------------------------
    this.loginData = localStorage.getItem('loginUser');
    var data = JSON.parse(this.loginData);
    this.id = data.id;
    this.fname = data.fname;
    this.lname = data.lname;
    this.email = data.email;
    this.mobile = data.mobile;
    this.image = data.image;

    this.createForm = this.fb.group({
      fname: [`${this.fname}`, Validators.required],
      lname: [`${this.lname}`, Validators.required],
      email: [`${this.email}`, Validators.required],
      mobile: [`${this.mobile}`, Validators.required],
      image: [`${this.image}`, Validators.required]
    });
  }

  handleFileUpload(target: any) {  // iamge handle    ----------------
    this.profileImage = target.files[0];
  }

  submit() {           //  Update  data  -----------------------------
    console.log('Submit Click');
    this.submitted = true;
    //console.log('Create Form Data =', this.createForm.value);
    if (this.createForm.valid) {

      let url = `/user/update?id=${this.id}`;

      const body = this.createForm.value;
      let formData: FormData = new FormData();
      formData.append('fname', body.fname)
      formData.append('lname', body.lname)
      formData.append('email', body.email)
      formData.append('mobile', body.mobile)

      if (this.id == undefined) {
        if (this.profileImage) {
          formData.append('file', this.profileImage, this.profileImage.name);
        } else {
          formData.delete('file');
        }
      } else if (this.id != '') {
        if (this.profileImage) {
          formData.append('file', this.profileImage, this.profileImage.name);
        } else {
          formData.delete('file');
        }
      }
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, formData, options).subscribe((data: any) => {
        if (data.status) {
          this.countdown = true;
          if (this.countdown) {
            this.message = data.message;
            this.logout();
            // setInterval(() => {
            //   localStorage.clear();
            //   window.location.reload();
            // }, 9000);
          }
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }
}
