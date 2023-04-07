import { Component } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AlertService } from '../../_services/alert.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-list-index',
  templateUrl: './list-index.component.html',
  styleUrls: ['./list-index.component.css']
})
export class ListIndexComponent {
  search:any='';
  limit:any = 10;
  page:any = 1;
  totalRows:any = 0;
  order_by:any = 'id'; 
  order_type:any = 'desc';
  toggleVal:boolean = false;
  data:any=[];
  delete:any;
  title:string = '';
  Select_Contact:string = '';
  Create_Data:string = '';

  // ---------------------    life cycle of angular    --------------------  ||

  constructor(private apiService:ApiService,private alertService:AlertService){  } 

  ngOnInit() {
    this.getData();
  }

  // ---------------------      custome methods      -----------------------  ||

  getData() {           //  Data Get databes   ---------------------------------
    let url:string = `/list?limit=${this.limit}&page=${this.page}&order_by=${this.order_by}&order_type=${this.order_type}&search=${this.search}`;
    this.apiService.get(url).subscribe((data:any) => {
      console.log('data',data.data.data);
        if(data && data.status){
          this.page = data.data.page;
          this.data = data.data.data; 
          this.totalRows = data.data.total;
        }else{
          this.alertService.error('Data Fatch Failed..');  // data.message -----
        }
      }
    );
  }

  pageChange(e:any){    //  Page Change funcation   -----------------------------
    console.log('pageChange',e)
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
    console.log('id -->', id);
    let url:string = `/list/show?id=${id}`;
    this.apiService.get(url).subscribe((data:any) => {
      if(data && data.status){
        this.title = data.data[0].title;
        this.Select_Contact = data.data[0].contact_id;
        this.Create_Data = data.data[0].create;
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
        let url:string = `/list/delete?id=${id}`;
        this.apiService.get(url).subscribe((data:any) => {
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
