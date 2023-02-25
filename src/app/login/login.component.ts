import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  head='Login';
  fontcolor = 'rgb(167 32 184)';
  message = 'Login will not happen without Registration so click on SignUp?';
  sayMessage() {
    alert(this.message);
  } 

    light(){
      document.body.style.background = "white";
    }
    dark(){
      document.body.style.background = "#060c21";
    }

  // msg = "I'm read only!";
  // canEdit = false;
 
  // onEditClick() {
  //   this.canEdit = !this.canEdit;
  //   if (this.canEdit) {
  //     this.msg = 'You can edit me!';
  //   } else {
  //     this.msg = "I'm read only!";
  //   }
  // }
}
