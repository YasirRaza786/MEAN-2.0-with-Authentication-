import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()


export class AuthService{

     authToken:string;
     user:string;

    constructor(private  http:Http){}
    registerUser(user){
        let headers= new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:8989/users/register',user,{headers:headers})
        .map(res=>res.json());
    }

    authenticateUser(user){
            let headers= new Headers();
            headers.append('Content-Type','application/json');
            return this.http.post('http://localhost:8989/users/authenticate',user,{headers:headers})
            .map(res=>res.json());
    }

    //Get Profile Data
    getUserProfile(){
        
        let headers= new Headers();
         this.loadToken();
        headers.append('Authorization',this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get('http://localhost:8989/users/profile',{headers:headers})
        .map(res=>res.json());

    }

    //loading token for inserting in the protected route 'profile'
    loadToken(){
        const token=localStorage.getItem('id_token');
        this.authToken=token;
    }

//saving User Data coming from server
    storeUserData(token,user){
       localStorage.setItem('id_token',token);
       localStorage.setItem('user',JSON.stringify(user));

       this.authToken=token;
       this.user= user;

    }



    logOut(){
        this.authToken=null;
        this.user= null;
        localStorage.clear();
    }


    loggedIn(){
        return tokenNotExpired('id_token');
    }
}