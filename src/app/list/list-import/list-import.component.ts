import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-list-import',
  templateUrl: './list-import.component.html',
  styleUrls: ['./list-import.component.css']
})
export class ListImportComponent {
  toggleVal: boolean = false;
  fileForm: FormGroup;
  submitted: any = false;
  profileImage: any;
  uploadClock: any = false;

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private apiService: ApiService) {
    this.fileForm = fb.group({
      title: ['', Validators.required],
      csvFile: ['', Validators.required]
    })
  }

  // -----------------    custome methods   --------------------------  ||

  get f() {           //  
    return this.fileForm.controls;
  }

  handleFileUpload(target: any) {  // file handle  ------------------------
    this.profileImage = target.files[0];
  }

  submit() {          //  CSV upload file   -----------------------------
    console.log('SubmitForm');
    this.submitted = true;
    if (this.fileForm.valid) {
      this.alertService.success('CSV_File Save SuccessFull');
      console.log('Create Form Data =', this.fileForm.value);
      let url: string = `/list/csv`;
      let formData: FormData = new FormData();
      formData.append('title', this.fileForm.value.title);
      formData.append('file', this.profileImage,this.profileImage.name);
      let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
      let options = { headers: headers };
      this.apiService.post(url, formData, options).subscribe((data:any)=>{
        console.log('fda---',data)
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  reset() {           // Form  reset  -----------------------------------
    this.fileForm.reset();
  }

  getImageName() {     // Selecte image name -----------------------------
    if (this.fileForm.value.csvFile) {
      this.uploadClock = true;
      return this.fileForm.value.csvFile.slice(12);
    } else {
      return 'Selete to File upload above ?';
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

}
