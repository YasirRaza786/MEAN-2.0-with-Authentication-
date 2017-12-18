import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name:String;
username:String;
email:String;
password:String;
  constructor(private validateService:ValidateService,
              private flashMessages:FlashMessagesService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  OnRegister(){
    const user={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
//Check validations 
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show('Please Fill Out All Fields',{cssClass:'alert-danger',timeout:3000});
      console.log('please fill out all the fields');
      return false ;
    }
    
    //Check Email validation
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Use a valid Email ',{cssClass:'alert-danger',timeout:3000});
      console.log('use the Valid Email');
      return false ;
    }
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessages.show('User Registered Successfully',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }

      else{
        this.flashMessages.show('User Could not Be Registered',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
        console.log('errrrrrooorss');
      }
    });
  }
  

}
