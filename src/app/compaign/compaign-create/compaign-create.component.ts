import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-compaign-create',
  templateUrl: './compaign-create.component.html',
  styleUrls: ['./compaign-create.component.css']
})
export class CompaignCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  id:any = '';
  title:any = '';

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.updateDataGet();
    }
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

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

  updateDataGet() {  //  Update Data Get   ------------------------------
    let url:string = `/template/show?id=${this.id}`;
    this.apiService.get(url, {}).subscribe((data:any)=>{
      console.log("data->", data)
      this.title = data.data[0].title;
    })
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

}
