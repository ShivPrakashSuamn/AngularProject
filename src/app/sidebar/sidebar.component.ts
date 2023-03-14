import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  search:any;
  value:any;
  toggleVal:any=false;
  @Output() sidebarToggle = new EventEmitter<{ toggleVal: boolean }>(); // event emitter
    // ------------------------- life cycle of angular
    constructor() { 
        // it call first
    } 

    ngOnChanges(){
      console.log('ngOnChange');
    }
    ngOnInit() {   
      console.log('ngOnInit');
    } 
    ngDoCheck(){
      console.log('ngDoCheck');
      // when any input change then it call
    }
    ngAfterContentInit(){
      console.log('ngAfterContentInit')
    }
    ngAfterContentChecked(){
      // when any input change then it call
      console.log('ngAfterContentChecked')
    }
    ngAfterViewInit(){
      console.log('ngAfterViewInit');

    }

    ngAfterViewChecked(){
      // when any input change then it call

    }

    ngOnDestroy() {  
      console.log('ngOnDestroy')
        // component remove from dom then it method call
    }  


    // -----------------------------------------------    custome methods   
    toggleSidebar(){
      if(this.toggleVal){
        this.toggleVal = false;
      }else{
        this.toggleVal = true;
      }
      this.sidebarToggle.emit({ toggleVal: this.toggleVal }); // trow data to other component
    }
    light(){
      document.body.style.background = "white";
    }
    dark(){
      document.body.style.background = "#060c21";
    }
    searchVal(){
      console.log('this is search',this.search);
      this.value = this.search;
    }

}
