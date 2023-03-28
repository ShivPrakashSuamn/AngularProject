import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
//import { RequestOptions } from '@angular/http';
//import { RequestOptions } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent {
  toggleVal:boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  data:any=[];
  id:any = undefined ;
  img:any;
  
  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder,private alertService:AlertService,private route:ActivatedRoute,private apiService:ApiService) {
    // it call first 
    this.createForm = fb.group({
      file: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      address:['', Validators.required],
      city:['', Validators.required],
      pincode:['', Validators.required],
      phone:['', Validators.required]
    })
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    if(this.id != undefined){
      console.log('id-->', this.id)
      this.getData();
    } 
  }
  
  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  createSubmit() {    // Submit Form  --------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      this.alertService.success('Data Save SuccessFull'); // Alert---
      console.log('Create Form Data =', this.createForm.value);
      let url:string = `/contact/store`;
      const body= this.createForm.value;
        let formData:FormData = new FormData();
        formData.append('fname',body.fname)
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data:any)=>{
        console.log('fda---',data)
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  getData(){          // Upadte data get end input fill  ------------
    let url:string = `/contact/show?id=${this.id}`;
    this.apiService.get(url).subscribe((data:any) => {
      if(data && data.status){
        let userData = data.data[0];
          var dt = new Date(userData.dob);
          var day = ("0" + dt.getDate()).slice(-2);
          var month = ("0" + (dt.getMonth() + 1)).slice(-2);
          var dob = dt.getFullYear()+"-"+ month +"-" + day;
          this.img = userData.image;
        this.createForm = this.fb.group({
          fname: [`${userData.fname}`, Validators.required],
          lname: [`${userData.lname}`, Validators.required],
          email: [`${userData.email}`, Validators.required],
          dob: [`${dob}`, Validators.required],
          address:[`${userData.address}`, Validators.required],
          city:[`${userData.city}`, Validators.required],
          pincord:[`${userData.pin_code}`, Validators.required],
          phone:[`${userData.phone}`, Validators.required],
          image: [`${this.img}`, Validators.required]
        });
       // this.createSubmit()
      }else{
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    }); 
  }

  getImageName(){     // Selecte image name -------------------------
    if(this.createForm.value.file ){ 
      return this.createForm.value.file.slice(12); 
    } else if(this.img) {
      return this.img;
    } else {
      return 'Selete to Profile ?';
    }
  }
}
