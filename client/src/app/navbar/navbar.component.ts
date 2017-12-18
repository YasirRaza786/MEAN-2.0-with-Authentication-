import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
//import {tokenNotExpired} from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private flashMessages:FlashMessagesService) { }

  onLogOut(){
this.authService.logOut();
this.flashMessages.show('You are Logged Out',{cssClass:'alert-danger',timeout:3000});
this.router.navigate(['/login']);
return false ;
  }

  ngOnInit() {
  }

}
