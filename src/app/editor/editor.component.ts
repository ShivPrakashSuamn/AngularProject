import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  toggleVal: boolean = false;
  id:number = 0;

   // -------------------------------------------      life cycle of angular

   constructor( private loaderService: NgxUiLoaderService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  // -----------------------------------------------    custome methods   
  sidebarToggle(eventData: { toggleVal: boolean }) {
    this.toggleVal = eventData.toggleVal;
    console.log('dashborad page inside sidebar Toggle', eventData.toggleVal);
  }
}
