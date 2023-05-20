import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from 'src/app/_services/alert.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  search:any='';
  limit:any = 10;
  page:any = 1;
  totalRows:any = 0;
  totalPage:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  toggleVal:boolean = false;
  data:any=[];

  fname:string = '';
  lname:string = '';
  email:string = '';
  dob:string = '';
  phone:string = '';
  address:string = '';
  city:string = '';
  pincode:string = '';
  image:String = '';
  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService){  } 

  ngOnInit() {
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/contact?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data:any) => {
        if(data && data.status){
          
          this.page = data.data.page;
          this.data = data.data.data; 
          //this.fetchImage(url, headers)
          this.totalRows = data.data.total;
          this.totalPage = data.data.totalPage;
        }else{
          this.alertService.error('Data Fatch Failed..');  // data.message -----
        }
      }
    );
  }

//    //const myImage = document.querySelector('img');

// // I make a wrapper snippet which will resolve to a objectURL
//  fetchImage(url:any, headers:any) {
//     return new Promise((resolve, reject) => {
//         fetch(url, headers)
//             .then(response => response.blob()) // sending the blob response to the next then
//             .then(blob => {
//                 const objectUrl = URL.createObjectURL(blob);
//                 console.log('imagr', objectUrl)
//                 resolve(objectUrl);
//               }) // resolved the promise with the objectUrl 
//             .catch(err => reject(err)); // if there are any errors reject them
//     });
// }

  pageChange(e:any){    //  Page Change funcation   -----------------------------
    this.page = e;
    this.getData();
  }

  getTOFROM(){          //  pagination List  offset  ----------------------------
    let offset = (this.page -1 )*this.limit; 
    let l = this.limit;
    let lastOffset = parseInt(l)+offset; 
    return `${offset+1} to ${lastOffset}`;
  } 

  sortBy(key:any){      //  Table - Order by asc/decs ---------------------------
    this.order_by = key; 
    if(this.order_type == 'asc'){
      this.order_type = 'desc'; 
    }else{
      this.order_type = 'asc';
    }
    this.getData(); 
  }

  exportList() {        //  Export All Data in list   --------------------------
    Swal.fire({
      title: 'Export List !',
      text: 'Save Thi Whole List in CSV File',
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go Ahead.',
      cancelButtonText: 'No, Let me Think',
    }).then((result) => {
      if (result.value) {
        console.log('CSV File Download');
        var options = { 
          title: 'Your Title',
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: false, 
          noDownload: false,
          showTitle: false,
          useBom: false,
          headers: ["Id","First Name","Last Name","Email","Date of Birth","Phone no","Image","Address","City","Pin code","Status","Created"]
        };
        new ngxCsv(this.data, "Contact List", options);  // download CSV ------
        Swal.fire('SuccessFully !', 'List Removed Successfully.', 'success');

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'List  Still in Our Database.', 'error');
      }
    });
  }

  showRow(id:any) {     //  Display one line of Data  --------------------------
    console.log('Show id =', id);
    let url:string = `/contact/show?id=${id}`;
    let headers = new HttpHeaders().set("authorization", `Bearer ${localStorage.getItem('token')}`);
    this.apiService.get(url , headers).subscribe((data:any) => {
      if(data && data.status){
        this.fname = data.data[0].fname;
        this.lname = data.data[0].lname;
        this.email = data.data[0].email;
        this.dob = data.data[0].dob;
        this.phone = data.data[0].phone;
        this.address = data.data[0].address;
        this.city = data.data[0].city;
        this.pincode = data.data[0].pin_code;
        this.image = data.data[0].image;
      }else{
        this.alertService.error('Data Fatch Failed..');  // data.message -----
      }
    });
  }

  deleteRow(id:any) {   //  Delete Row Function     ----------------------------
    Swal.fire({
      title: 'DELETE ROW ?',
      text: 'Do You Want to Delete This Row',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go Ahead.',
      cancelButtonText: 'No, Let me Think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('SuccessFully !', 'Row Deleted Successfully.', 'success');
        let url:string = `/contact/delete?id=${id}`;
        this.apiService.get(url , {}).subscribe((data:any) => {
          this.getData(); 
          console.log('deleteRow Status -',data.status) ;   
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Row Still in Our Database.', 'error');
      }
    });
  }

  sidebarToggle(eventData: { toggleVal: boolean }) { // Sidebar manage --------
    this.toggleVal = eventData.toggleVal;
    console.log('profile page inside sidebar toggle',eventData.toggleVal);
  }
}
