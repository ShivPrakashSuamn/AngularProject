import { Component } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  light(){
    document.body.style.background = "white";
  }
  dark(){
    document.body.style.background = "#060c21";
  }
}
