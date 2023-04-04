import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  signForm:FormGroup;
  submitted:any = false;

  constructor(private fb: FormBuilder,private alertService : AlertService,private apiService:ApiService){
    this.signForm = fb.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    }) 
  }

  get f (){
    return this.signForm.controls;
  }

  submit(){
    console.log('Submit Bottun Ckick');
    this.submitted = true;
    if(this.signForm.valid){
      console.log('Sign Up Form Value =', this.signForm.value);
      let url = '/auth/register';
      let body = this.signForm.value;

      let formData = new FormData();
      formData.append('fname', body.fname);
      formData.append('lname', body.lname);
      formData.append('email', body.email);
      formData.append('password', body.password);

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };

      this.apiService.post(url, formData, options).subscribe((data:any)=>{
        console.log('Form Result -', data)
        this.alertService.success(data.message);
      })
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  light(){
    document.body.style.background = "white";
  }
  dark(){
    document.body.style.background = "#060c21";
  }

}
