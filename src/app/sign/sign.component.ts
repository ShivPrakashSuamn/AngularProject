import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  signForm:FormGroup;
  submitted:any = false;

  constructor(private fb: FormBuilder,private alertService : AlertService){
    this.signForm = fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    }) 
  }

  get f (){
    return this.signForm.controls;
  }

  signSubmit(){
    this.alertService.error('this is error msg');
    console.log('submitform');
    this.submitted = true;
    if(this.signForm.valid){
      console.log('Sign Up Form Value =', this.signForm.value);
    }
  }

  light(){
    document.body.style.background = "white";
  }
  dark(){
    document.body.style.background = "#060c21";
  }

}
