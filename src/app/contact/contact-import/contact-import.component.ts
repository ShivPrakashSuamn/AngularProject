import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import Swal from 'sweetalert2';

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

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder,private alertService : AlertService,private apiService:ApiService) {
    this.fileForm = fb.group({
      csvFile: ['', Validators.required]
    })
  }

  // -----------------    custome methods   --------------------------  ||

  get f() {
    return this.fileForm.controls;
  }
  createSubmit() {
    console.log('SubmitForm');
    this.submitted = true;
    if(this.fileForm.valid){
      this.alertService.success('CSV_File Save SuccessFull');
      console.log('Create Form Data =', this.fileForm.value.csvFile);
      //pic = this.createForm.value.image;
      let url:string = `/contact/csv`;
      const body= this.fileForm.value;
      console.log('bbbb',body);
     // headers.append('Content-Type', 'multipart/form-data');
      this.apiService.post(url, body, Option).subscribe((data:any)=>{
        console.log('fda---',data)
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // gettting value from child component
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }

  reset() {           // Form  reset  -----------------------------------
    this.fileForm.reset();
  }

  getImageName(){     // Selecte image name -----------------------------
    if(this.fileForm.value.csvFile){ 
      return this.fileForm.value.csvFile.slice(12); 
    } else {
      return 'Selete to File upload above ?';
    }
  }

  sampleData() {      // Display Sample data  ---------------------------
    Swal.fire('Sample File',`sample data`,'success' );
  }
}
