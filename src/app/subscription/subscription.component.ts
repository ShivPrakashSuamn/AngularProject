import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  ckeditorContent = 'Write something..';

  constructor(private fb: FormBuilder) {
    // it call first 
    this.createForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      Subscribe:['', Validators.required]
    })
  }
  get f() {
    return this.createForm.controls;
  }
  createSubmit() {
    console.log('SubmitForm');
    this.submitted = true;
    if (this.createForm.valid) {
      console.log('Create Form Data =', this.createForm.value);
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }
}
