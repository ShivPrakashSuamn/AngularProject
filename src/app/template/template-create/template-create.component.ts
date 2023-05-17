import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})

export class TemplateCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  templateFile:any;
  uploadClock:any = false; 
  // ckeditorContent: string = '<p>Some html</p>';

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
   
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  handleFileUpload(target:any){  // iamge handle    ----------------
    this.templateFile = target.files[0];
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      console.log('Create Form Data =', this.createForm.value);

      const body = this.createForm.value;
      let url:string = '/template/store';
      let formData:FormData = new FormData();
      formData.append('category', body.category);
      formData.append('title', body.title);
      formData.append('description', body.description);
      formData.append('file', this.templateFile, this.templateFile.name);

      // let headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = {headers:headers};
      this.apiService.post(url, formData, options).subscribe((data:any)=>{
        console.log('form result -', data);
      })
      this.alertService.success('Data Save SuccessFull'); // Alert---
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  getZipName(){     // Selecte image name -----------------------------
    if(this.createForm.value.file){ 
      this.uploadClock = true;
      return this.createForm.value.file.slice(12); 
    } else {
      return 'Selete to File upload above ?';
    }
  }
}
