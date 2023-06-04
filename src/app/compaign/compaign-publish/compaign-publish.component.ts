import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-compaign-publish',
  templateUrl: './compaign-publish.component.html',
  styleUrls: ['./compaign-publish.component.css']
})
export class CompaignPublishComponent {
  toggleVal: boolean = false;
  createForm: FormGroup;
  submitted: any = false;
  id: any = '';
  data: any = '';
  hiddenInput:boolean = false;
  allSelect: any = false;
  listContacts: any = [];

  // ----------------    life cycle of angular    --------------------  ||

  constructor(private fb: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private apiService: ApiService,private nextLink:Router) {
    this.createForm = fb.group({
      publishData: [ ]
    });
  }

  ngOnInit() {        //  ngOninit Function -------------------------
    this.id = this.route.snapshot.params['id'];
    this.dataGet();
  }

  get f() {
    return this.createForm.controls;
  }

  // ----------------    custome methods   --------------------------  ||

  selectAll() {      //  Select All user   ------------------------------
    if (this.allSelect) {
      this.data.map((item: any) => {
        item.checked = false;
      });
      this.listContacts = [];
      this.allSelect = false;
    } else {
      this.data.map((item: any) => {
        item.checked = true;
        this.listContacts.push(item.id);
      });
      this.allSelect = true;
    }
  }

  onChangeCategory($event: any, id: any) {  // One By One Select ------- 
    let index = this.listContacts.indexOf(id);
    if (index == -1) {
      this.listContacts.push(id);
    } else {
      this.listContacts.splice(index, 1);
    }
  }

  submit() {    // Submit Form    -----------------------------------
    console.log('Submit Button Click');
    this.submitted = true;
    if (this.createForm.valid) {
      const body = { ...this.createForm.value, contacts: this.listContacts };
      let url: string = `/compaign/sendMail?id=${this.id}`;
      let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
      let options = { headers: headers };
      this.apiService.post(url, body, options).subscribe((data: any) => {
        if (data.status) {
          this.alertService.success('data.message'); // Alert---
          console.log('ruslte',data)
          // this.nextLink.navigate(['/compaign/template', data.data]);
        } else {
          this.alertService.warning(data.message); // Alert---
        }
      });
    } else {
      this.alertService.error('This is input Empty');
    }
  }

  dataGet() {  //  Update Data Get   ------------------------------
    let url: string = `/list`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url, headers).subscribe((data: any) => {
      console.log('click',data.data.data);
      this.data = data.data.data;
    })
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { //Sidebar manage 
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle', eventData.toggleVal);
  }

  reset() {           // Form  reset  --------------------------------
    this.createForm.reset();
  }

  publisSelectdate(){
      this.hiddenInput = true;
    }
}
