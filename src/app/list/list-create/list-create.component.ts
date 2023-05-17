import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  limit: any = 100;
  page: any = 1;
  totalRows: any = 0;
  order_by: any = 'id';
  order_type: any = 'asc';
  data: any = [];
  contacts: any = [];
  allSelect: any = false;
  id: any = '';
  inputData: any;

  // ------------------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService) {
    this.createForm = fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {        //  ngOninit Function    ---------------------------
    this.getdata();
    this.id = this.route.snapshot.params['id'];
    if (this.id != undefined) {
      console.log('Update Id =', this.id)
      this.updateDataGet();
    }
  }

  get f() {
    return this.createForm.controls;
  }

  // -------------------------    custome methods   --------------------------  ||

  getdata() {     //  get contact data    ------------------------------
    let url = `/contact?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data: any) => {
      if (data && data.status) {
        this.data = data.data.data;
        this.data.map((item: any) => {
          item.checked = false;
        });
        // console.table('this.data',this.data)
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  onChangeCategory($event: any, id: any) {  // One By One Select ------- 
    let index = this.contacts.indexOf(id);
    if (index == -1) {
      this.contacts.push(id);
    } else {
      this.contacts.splice(index, 1);
    }
  }

  selectAll() {      //  Select All user   ------------------------------
    if (this.allSelect) {
      this.data.map((item: any) => {
        item.checked = false;
      });
      this.contacts = [];
      this.allSelect = false;
    } else {
      this.data.map((item: any) => {
        item.checked = true;
        this.contacts.push(item.id);
      });
      this.allSelect = true;
    }
  }

  updateDataGet() {  //  Update Data Get   ------------------------------ 
    let url: string = `/list/show?id=${this.id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data: any) => {
      if (data && data.status) {
        let userData = data.data;
        userData.checkbox.map((item1: any) => {
          this.data.map((item2: any) => {
            if (item1.contact_id == item2.id) {
              item2.checked = true;
              this.contacts.push(item2.id);
            }
          });
        });
        this.createForm = this.fb.group({
          title: [`${userData.data[0].title}`, Validators.required],
        });
      } else {
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  submit() {        //   Submit Form     ---------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      //console.log('Create Form Data =', this.createForm.value);
      const body = { ...this.createForm.value, contacts: this.contacts };
      let url: string = '/list/store';
      if(this.id){
        url = `/list/update?id=${this.id}`; 
      }
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = {headers:headers};
      this.apiService.post(url, body, options).subscribe((data: any) => {
        console.log('form result -', data);
        this.alertService.success(data.message); // Alert---
      })
    } else {
      this.alertService.error('This is input Empty');
    }
  } 

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {         // Form  reset      ---------------------------------
    this.createForm.reset();
  }

}
