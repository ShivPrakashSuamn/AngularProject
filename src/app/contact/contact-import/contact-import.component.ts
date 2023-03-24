import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-contact-import',
  templateUrl: './contact-import.component.html',
  styleUrls: ['./contact-import.component.css']
})
export class ContactImportComponent {
  toggleVal:boolean = false;
  fileForm: FormGroup;
  submitted: any = false;
  ckeditorContent = 'Write something..';

  constructor(private fb: FormBuilder,private alertService : AlertService) {
    // it call first 
    this.fileForm = fb.group({
      csvFile: ['', Validators.required]
    })
  }
  get f() {
    return this.fileForm.controls;
  }
  createSubmit() {
    console.log('SubmitForm');
    this.submitted = true;
    if (this.fileForm.valid) {
      this.alertService.success('Save CSV_File SuccessFull');
      console.log('Create Form Data =', this.fileForm.value);
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
