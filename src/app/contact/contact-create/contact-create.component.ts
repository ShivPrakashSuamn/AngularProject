import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent {
  toggleVal:boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  ckeditorContent = 'Write something..';

  constructor(private fb: FormBuilder,private alertService : AlertService) {
    // it call first 
    this.createForm = fb.group({
      image: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      address:['', Validators.required],
      city:['', Validators.required],
      pincord:['', Validators.required],
      phone:['', Validators.required]
    })
  }
  get f() {
    return this.createForm.controls;
  }
  createSubmit() {
    console.log('SubmitForm');
    this.submitted = true;
    if (this.createForm.valid) {
      this.alertService.success('Save Data SuccessFull');
      console.log('Create Form Data =', this.createForm.value);
      //pic = this.createForm.value.image;
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
  exit() {
    location.reload();
  }
}
