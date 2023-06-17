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
  resetForm:FormGroup;
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

  data:any = [];
  page:any = 1;
  totalRows:any = 0;
  totalPage:any = 0;
  search:any='';
  limit:any = 10;
  order_by:any = 'id'; 
  order_type:any = 'desc';

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {
    this.createForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
    this.resetForm = fb.group({
      oldpass: ['', Validators.required],
      newpass: ['', Validators.required],
      conpass: ['', Validators.required]
    });
  }
  get f() {
    return this.createForm.controls;
  }

  ngOnInit() {
    this.getLoginUser();
    this.getData();
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
          this.worklogUpdate('Update');
          if (this.countdown) {
            this.message = data.message;
            setInterval(() => {
              localStorage.clear();
              window.location.reload();
            }, 9000);
          }
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  passwordReset(){
     console.log('ckick',this.resetForm.value);
     if(this.resetForm.valid){
      let url = "/auth/reset";
      let body = this.resetForm.value;
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers }
      this.apiService.post(url, body, options).subscribe((data:any)=>{
        console.log('data',data);
      })
     }
  }

  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/auth/worklog/?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url, {}).subscribe((data:any) => {
      if(data && data.status){
        this.page = data.data.page;
        this.data = data.data.data; 
        this.totalRows = data.data.allUser;
        this.totalPage = data.data.totalPage;
        }else{
          this.alertService.error(data.message);  // data.message -----
        }
      }
    );
  }

  worklogUpdate(type: any) { //  Worklog   ----------------------------
    let url: string = `/auth/worklogStore`;
    const data = { 'title': 'Profile', 'description': `${type}` }
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    let options = { headers: headers };
    this.apiService.post(url, data, options).subscribe((data: any) => {
      if (data.status) {
        //console.log('worklogUpdate', data);
      }
    });
  }

  pageChange(e:any){
    this.page = e;
    this.getData();
  }
  getTOFROM(){          //  pagination List  offset  ----------------------------
    let offset = (this.page -1 )*this.limit; 
    let l = this.limit;
    let lastOffset = parseInt(l)+offset; 
    return `${offset+1} to ${lastOffset}`;
  } 

  sortBy(key:any){      //  Table - Order by asc/decs ---------------------------
    this.order_by = key; 
    if(this.order_type == 'asc'){
      this.order_type = 'desc'; 
    }else{
      this.order_type = 'asc';
    }
    this.getData(); 
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }
}
