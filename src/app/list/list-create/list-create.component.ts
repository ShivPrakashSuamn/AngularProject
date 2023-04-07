import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  limit:any = 100;
  page:any = 1;
  totalRows:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'asc';
  data:any = [];

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
   this.getdata();
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  getdata(){     //  get contact data  ------------------------------
    let url =  `/contact?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}`;
    this.apiService.get(url).subscribe((data:any)=>{
      console.log('data->', data.data.data);
      if(data && data.status){
        this.data = data.data.data; 
      }else{
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      console.log('Create Form Data =', this.createForm.value);

      // const body = this.createForm.value;
      // let url:string = '/list/store';
      // let options = {};

      // this.apiService.post(url, body, options).subscribe((data:any)=>{
      //   console.log('form result -', data);
      // })
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

}
