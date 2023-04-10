import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  toggleVal:boolean = false;
  createForm: FormGroup;
  submitted: any = false;

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb:FormBuilder) { 
    this.createForm = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
    });
  } 
  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  submit(){
    console.log('Submit Click');
    this.submitted = true;
     console.log('Create Form Data =', this.createForm.value);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }
  
  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
}
