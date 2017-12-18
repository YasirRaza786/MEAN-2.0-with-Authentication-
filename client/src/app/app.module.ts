import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
//import {tokenNotExpired} from 'angular2-jwt'


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

 import {FlashMessagesModule}from 'angular2-flash-messages';
// import {FlashMessagesModule} from 'angular2-flash-messages/module';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';


const routes:Routes=[
  {path:'home',component:HomeComponent,},
   {path:'',redirectTo:'home',pathMatch:"full"},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},//
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}//

]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(routes)
   

  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
