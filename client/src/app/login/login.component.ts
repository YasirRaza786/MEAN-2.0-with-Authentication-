import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:String;
password:String;
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessages:FlashMessagesService) { }

  ngOnInit() {
  }

  OnLogin(){
    const user={
      username:this.username,
      password:this.password
    }

  this.authService.authenticateUser(user).subscribe(data=>{
    
    if(!data.success){
      this.flashMessages.show(data.msg,{cssClass:'alert-danger',timeout:4000});
      this.router.navigate(['/login']);
    }
    else{
      console.log(data);
      this.authService.storeUserData(data.token,data.user);
      this.flashMessages.show('You are Logged In...',{cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/dashboard']);

    }



  })

  }
}
